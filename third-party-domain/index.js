const express = require("express");
const hbs = require('hbs');
const app = express();
const crossOriginIsolation = require('./middlewares/cross-origin-isolation.js');
const { reportingEndpoint, socket } = require('./middlewares/reporting-endpoint.js');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.static("public"));

app.use('/cross-origin-isolation', crossOriginIsolation);
app.use('/reporting-endpoint', reportingEndpoint);

app.get('/', (req, res) => {
  res.send('<a href="/cross-origin-isolation?coep=require-corp&coop=same-origin&corp=same-origin">Cross-Origin Isolation</a><br>' +
           '<a href="/reporting-endpoint">Reporting Endpoint</a><br>'
           );
});

// listen for requests :)
const server = app.listen(8080, function() {
  console.log("Your app is listening on port " + server.address().port);
});
socket(server);
// io.on('connection', (socket) => {
//   const room = socket.handshake && socket.handshake.query && socket.handshake.query.room || '/';
//   socket.join(room);
//   console.log('joining room:', room);
//   socket.on('disconnect', () => {
//     socket.leave(room);
//   });
// });
