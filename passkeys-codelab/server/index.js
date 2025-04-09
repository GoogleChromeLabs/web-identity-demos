/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// init project
import express from 'express';
import session from 'express-session';
import hbs from 'hbs';
import { auth } from './auth.js';
const app = express();
import useragent from 'express-useragent';

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './dist/');
app.use(express.json());
app.use(useragent.express());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(session({
  secret: 'secret', // You should specify a real secret here
  resave: true,
  saveUninitialized: false,
  proxy: true,
  cookie:{
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

const RP_NAME = 'Passkeys Codelab';

app.use((req, res, next) => {
  // TODO(bckenny): seems completely wrong to set this on every request? either
  // set on the request, or switch to npm script-level env variables?
  if (process.env.PROJECT_DOMAIN) {
    process.env.HOSTNAME = `${process.env.PROJECT_DOMAIN}.glitch.me`;
  } else if (req.headers.host.match(/^localhost:\d+$/)) {
    // TODO(bckenny): document HOSTNAME needing no port number
    process.env.HOSTNAME = 'localhost'
  } else {
    process.env.HOSTNAME = req.headers.host;
  }
  const protocol = /^localhost/.test(process.env.HOSTNAME) ? 'http' : 'https';
  process.env.ORIGIN = `${protocol}://${process.env.HOSTNAME}`;

  // TODO(bckenny): document that ORIGIN _does_ need the port number
  if (req.headers.host.match(/^localhost:\d+$/)) {
    process.env.ORIGIN = `${protocol}://${req.headers.host}`;
  }

  process.env.RP_NAME = RP_NAME;
  if (
    req.get('x-forwarded-proto') &&
    req.get('x-forwarded-proto').split(',')[0] !== 'https'
  ) {
    return res.redirect(301, process.env.ORIGIN);
  }
  req.schema = 'https';
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  // Check session
  if (req.session.username) {
    // If username is known, redirect to `/reauth`.
    res.redirect(307, '/reauth');
    return;
  }
  // If the user is not signed in, show `index.html` with id/password form.
  res.render('index.html', {
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/reauth', (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.redirect(302, '/');
    return;
  }
  // Show `reauth.html`.
  // User is supposed to enter a password (which will be ignored)
  // Make XHR POST to `/signin`
  res.render('reauth.html', {
    username: username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/profile', (req, res) => {
  if (!req.session.username || req.session['signed-in'] != 'yes') {
    // If user is not signed in, redirect to `/`.
    res.redirect(307, '/');
    return;
  }
  // `profile.html` shows sign-out link
  res.render('profile.html', {
    displayName: req.session.username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/.well-known/assetlinks.json', (req, res) => {
  const assetlinks = [];
  const relation = [
    'delegate_permission/common.handle_all_urls',
    'delegate_permission/common.get_login_creds',
  ];
  assetlinks.push({
    relation: relation,
    target: {
      namespace: 'web',
      site: process.env.ORIGIN,
    },
  });
  if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
    const package_names = process.env.ANDROID_PACKAGENAME.split(",").map(name => name.trim());
    const hashes = process.env.ANDROID_SHA256HASH.split(",").map(hash => hash.trim());
    for (let i = 0; i < package_names.length; i++) {
      assetlinks.push({
        relation: relation,
        target: {
          namespace: 'android_app',
          package_name: package_names[i],
          sha256_cert_fingerprints: [hashes[i]],
        },
      });
    }
  }
  res.json(assetlinks);
});

app.get('/test', (req, res) => {
  res.render('test.html');
})

app.use('/auth', auth);

// listen for req :)
const port = process.env.GLITCH_DEBUGGER ? null : 8080;
const listener = app.listen(port || process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
