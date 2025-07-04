const express = require('express');
const app = express();
const hbs = require('hbs');
const user = require('./libs/user.js');

let origin = process.env.ORIGIN;

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.static('public'));
app.use('/user', user);

app.use((req, res, next) => {
  if (!origin) {
    origin = `${req.headers.protocol||'http'}://${req.headers.host}`;
    console.log(`Origin: "${origin}" was set because it was undefined.`);
  }
  if (req.get('x-forwarded-proto') &&
     (req.get('x-forwarded-proto')).split(',')[0] !== 'https') {
    return res.redirect(301, `${origin}`);
  }
  req.schema = 'https';
  next();
});

app.get('/', (req, res) => {
  res.append('Link', `<${origin}/payment-manifest.json>; rel="payment-method-manifest"`);
  res.render('index.html');
});

app.get('/pay', (req, res) => {
  res.render('pay.html');
});

app.get('/payment-manifest.json', (req, res) => {
  res.json({
    default_applications: [ `${origin}/manifest.json` ]
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
