const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express.Router();

app.use(cookieParser());

// const reporting_endpoint = 'https://742ee3e6f7d80ca065e6cc05f16b6947.report-uri.com/a/d/g';
// const reporting_endpoint = `https://${process.env.PROJECT_DOMAIN}.glitch.me/report`;
const reporting_endpoint = `https://third-party-domain.appspot.com/reporting-endpoint/post`;

const corsOptions = (req, callback) => {
  let origin = false,
      credentials = false;
  if (req.query.cors == 'anonymous') {
    origin = true;
  } else if (req.query.cors == 'use-credentials') {
    origin = true;
    credentials = true;    
  }
  callback(null, { origin, credentials });
};

const setCookie = (key, value) => (req, res, next) => {
  res.cookie(`__Host-${key}`, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  next();
};

app.use((req, res, next) => {
  if (req.query.coep  && [
      'require-corp',
      'credentialless'
    ].includes(req.query.coep)) {
    const reportTo = {
      group: 'coep',
      max_age: 60*60*24,
      endpoints: [{
        url: reporting_endpoint
      }],
      "include_subdomains":true
    };
    const previousReportTo = res.get('Report-To');
    const parsedReporTo = JSON.stringify(reportTo);
    const newReportTo = previousReportTo ? `${previousReportTo},${parsedReporTo}` : parsedReporTo;
    res.set('Report-To', newReportTo);
    if ('report-only' in req.query) {
      res.set('Cross-Origin-Embedder-Policy-Report-Only', `${req.query.coep};report-to="coep"`);
    } else {
      res.set('Cross-Origin-Embedder-Policy', `${req.query.coep};report-to="coep"`);
    }
  }
  if (!req.headers['if-none-match'] && req.query.corp && [
      'same-origin',
      'same-site',
      'cross-origin'
    ].includes(req.query.corp)) {
    res.set('Cross-Origin-Resource-Policy', req.query.corp);
  }
  if (req.query.coop && [
      'same-origin',
      'same-origin-allow-popups',
      'same-origin-allow-popups-plus-coep',
      'unsafe-none'
    ].includes(req.query.coop)) {
    const reportTo = {
      group: 'coop',
      max_age: 60*60*24,
      endpoints: [{
        url: reporting_endpoint
      }]
    };
    const previousReportTo = res.get('Report-To');
    const parsedReporTo = JSON.stringify(reportTo);
    const newReportTo = previousReportTo ? `${previousReportTo},${parsedReporTo}` : parsedReporTo;
    res.set('Report-To', newReportTo);
    if ('report-only' in req.query) {
      res.set('Cross-Origin-Opener-Policy-Report-Only', `${req.query.coop};report-to="coop"`);
    } else {
      res.set('Cross-Origin-Opener-Policy', `${req.query.coop};report-to="coop"`);      
    }
  }
  if (req.query.xfo &&
      ['deny', 'sameorigin'].includes(req.query.xfo)) {
    res.set('X-Frame-Options', req.query.xfo);
  }
  if ('cors' in req.query) {
    cors();
  }
  next();  
});

app.get("/check.svg", cors(corsOptions), (req, res) => {
  if (req.headers['if-none-match']) {
    res.sendStatus(304);
    return;
  }
  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', `max-age=60`);
  res.send('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>');
});

app.get("/", cors(corsOptions), setCookie('root', 'root'), (req, res) => {
  res.render("cross-origin-isolation/index.html", {
    origin_trial: process.env.OT_TOKEN
  });
});

app.get("/iframe", cors(corsOptions), setCookie('iframe', 'iframe'), (req, res) => {
  res.render("cross-origin-isolation/iframe.html", {
    origin_trial: process.env.OT_TOKEN,
    cookie: req.cookies['__Host-iframe']
  });
});

app.get("/popup", cors(corsOptions), setCookie('popup', 'popup'), (req, res) => {
  res.render("cross-origin-isolation/popup.html", {
    origin_trial: process.env.OT_TOKEN
  });
});

app.get('/worker.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.render('worker.html');
});

app.post('/post', cors(corsOptions), setCookie('post', 'post'), (req, res) => {
  res.send('Success');
});

app.get('/fetch', cors({origin: '*'}), setCookie('fetch', 'fetch'), (req, res) => {
  const result = {
    cookieSet: true,
    corsMode: true,
    error: ''
  }
  res.json(result);
});

module.exports = app;
