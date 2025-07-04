const express = require('express');
const hbs = require('hbs');
const cookie = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const contentSecurityPolicy = require('helmet-csp');
const crypto = require('crypto');
const uid = require('uid-safe');

const coep_opts = ['require-corp', 'credentialless', 'unsafe-none'];
const coop_opts = ['same-origin', 'same-origin-allow-popups', 'same-origin-allow-popups-plus-coep', 'restrict-properties', 'unsafe-none'];
const corp_opts = ['same-origin', 'same-site', 'cross-origin'];
const xfo_opts  = ['deny', 'sameorigin']; 

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(cookie());

const client = new OAuth2Client(process.env.CLIENT_ID);

const reporting_service = 'https://chrome.dev/reporting-endpoint';
// const reporting_endpoint = 'https://742ee3e6f7d80ca065e6cc05f16b6947.report-uri.com/a/d/g';
const reporting_endpoint = 'https://chrome.dev/reporting-endpoint/post';
// const reporting_endpoint = 'https://2j1hmdh4.uriports.com/reports';

app.use(async (req, res, next) => {
  console.log(req.cookies.room);
  let room;
  if (!req.cookies.room) {
    room = await uid(6);
  } else {
    room = req.cookies.room;
  }
  res.cookie('room', room, {
    httpOnly: true,
    secure: true
  });
  res.locals.reporting_service = `${reporting_service}/${encodeURIComponent(room)}`;
  res.locals.reporting_endpoint = `${reporting_endpoint}/${encodeURIComponent(room)}`;
  res.locals.uriport_endpoint = `https://2j1hmdh4.uriports.com/reports`;
  next();
});

const sendReportingHeader = (response, group, reporting_endpoint) => {
  const reportTo = JSON.stringify({
    group: group,
    max_age: 60*60*24,
    endpoints: [{
      url: reporting_endpoint
    }]
  });
  const newEndpoint = `${group}="${reporting_endpoint}"`;
  const previousReportTo = response.get('Report-To');
  const previousReportEndpoint = response.get('Reporting-Endpoints');
  const newReportTo = previousReportTo ? `${previousReportTo},${reportTo}` : reportTo;
  const newReportEndpoint = previousReportEndpoint ? `${previousReportEndpoint},${newEndpoint}` : newEndpoint;
  response.set('Report-To', newReportTo);
  response.set('Reporting-Endpoints', newReportEndpoint);
}

const ot = (req, res, next) => {
  if (process.env.OT_TOKENS) {
    const tokens = process.env.OT_TOKENS.split(',');
    for (const token of tokens) {
      res.set('Origin-Trial', token);      
    }
  }
  next();
}

const rt = (req, res, next) => {
  sendReportingHeader(res, 'default', res.locals.reporting_endpoint);
  sendReportingHeader(res, 'uriports', res.locals.uriport_endpoint);
  next();
}

const oac = (req, res, next) => {
  if ('oac' in req.query) {
    res.set('Origin-Agent-Cluster', '?1');
  }
  next();  
}

const coep = (req, res, next) => {
  if (req.query.coep && coep_opts.includes(req.query.coep)) {
    if ('report-only' in req.query) {
      res.set('Cross-Origin-Embedder-Policy-Report-Only', `${req.query.coep};report-to="default"`);
    } else {
      res.set('Cross-Origin-Embedder-Policy', `${req.query.coep};report-to="default"`);
    }
  }
  next();
};

const coop = (req, res, next) => {
  if (req.query.coop && coop_opts.includes(req.query.coop)) {
    if ('report-only' in req.query) {
      res.set('Cross-Origin-Opener-Policy-Report-Only', `${req.query.coop};report-to="default"`);
    } else {
      res.set('Cross-Origin-Opener-Policy', `${req.query.coop};report-to="default"`);
    }
  }
  next();
}

const corp = (req, res, next) => {
  if (req.query.corp && corp_opts.includes(req.query.corp)) {
    res.set('Cross-Origin-Resource-Policy', `${req.query.corp}`);
  }
  next();
}

const xcto = (req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();  
}

const csp = (req, res, next) => {
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: [ "'strict-dynamic'", `'nonce-${res.locals.nonce}'`, "https:", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com"],
      objectSrc: [ "'none'" ],
      baseUri: [ "'none'" ],
      imgSrc: [ "*" ],
      frameSrc: [ 'https://pay.google.com', 'https://accounts.google.com', 'https://third-party-test.glitch.me', '*' ],
      connectSrc: [ 'https://accounts.google.com', 'https://oauth.google.com' ],
      reportTo: [ 'uriports' ],
      // requireTrustedTypesFor: [ "'script'" ]
    }
  })(req, res, next);
}

app.use((req, res, next) => {
  if (req.get('x-forwarded-proto') &&
     (req.get('x-forwarded-proto')).split(',')[0] === 'http') {
    return res.redirect(301, `https://${process.env.PROJECT_DOMAIN}.glitch.me/${req.originalUrl}`);
  }
  req.protocol = 'https';
  res.locals.nonce = crypto.randomBytes(16).toString('hex');
  next();
});

app.get("/check.svg", (req, res) => {
  res.set('Content-Type', 'image/svg+xml');
  res.send('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>');
});

app.get('/', ot, rt, oac, coep, coop, corp, xcto, csp, (req, res) => {
  const gis = typeof req.query.gis !== "undefined";
  res.render("index.html", {
    nonce: res.locals.nonce,
    reporting_service: res.locals.reporting_service,
    reporting_endpoint: res.locals.reporting_endpoint,
    client_id: process.env.CLIENT_ID
  });
});

app.get('/test', (req, res) => {
  res.render('test.html', {
    
  });
})

app.get('/coep', ot, rt, coep, coop, corp, (req, res) => {
  res.render("coep.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/coop', ot, rt, coep, coop, corp, (req, res) => {
  res.render("coop.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/corp', ot, rt, coep, coop, corp, (req, res) => {
  res.render("corp.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/popup', ot, rt, coep, coop, corp, (req, res) => {
  res.render("popup.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/iframe', ot, rt, coep, coop, corp, (req, res) => {
  res.render("iframe.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/ls', ot, rt, coep, coop, corp, (req, res) => {
  res.render("ls.html", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});

app.get('/1p_worker.js', rt, coep, coop, corp, (req, res) => {
  res.set('Cotent-Type', 'application/javascript');
  res.render("1p_worker.html");
});

app.post('/callback', async (req, res) => {
  const { credential, g_csrf_token } = req.body;
  const g_csrf_cookie = req.cookies.g_csrf_token;
  if (!g_csrf_token || !g_csrf_cookie || g_csrf_token !== g_csrf_cookie) {
    res.status(400).send('Error due to missing cookie.');
  } else {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user_id = payload['sub'];
    res.render('callback.html', {
      user_id: user_id
    });
  }
});

exports['cross-origin-isolation'] = app;
