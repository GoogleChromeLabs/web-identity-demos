const express = require('express');
const app = express();
const hbs = require('hbs');
const linepay = require('./libs/linepay');
const paypal = require('./libs/paypal');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let origin = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;

app.use((req, res, next) => {
  if (!origin) {
    origin = `${req.headers.protocol||'http'}://${req.headers.host}`;
    console.log(`Origin: "${origin}" was set because it was undefined.`);
  }
  if (!/^http:\/\/localhost/.test(origin) &&
      req.get('x-forwarded-proto') &&
     (req.get('x-forwarded-proto')).split(',')[0] !== 'https') {
    return res.redirect(301, `${origin}`);
  }
  req.schema = 'https';
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('index.html', {
    paypalClientId: process.env.PAYPAL_CLIENT_ID
  });
});

app.use('/linepay', linepay);
app.use('/paypal', paypal);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
