const express = require("express");
const app = express();
const cors = require('cors');
const hbs = require('hbs');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
const server = app.listen(process.env.PORT);
const io = require('socket.io').listen(server);

app.use(express.static("public"));
app.use(express.json({type: 'application/reports+json'})); 
app.use(cors());

app.post('/post', (req, res) => {
  console.log(req.body);
  if (req.get('Content-Type') === 'application/reports+json') {
    // io.emit('update', JSON.stringify(req.body));      
  }
  res.sendStatus(404);
});

app.post('/post/:room', (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  const room = req.params.room;
  if (req.get('Content-Type') === 'application/reports+json') {
    console.log('A post came in to:', room);
    io.to(room).emit('update', JSON.stringify(req.body));
  }
  res.send('OK');
});

app.get('/', (req, res) => {
  res.render('index.html', {
    reporting_endpoint: `https://${req.hostname}/post/`
  });
});

app.get('/:room', (req, res) => {
  const paths = req.url.split('/');
  // TODO: Need escape
  res.render('index.html', {
    reporting_endpoint: `https://${req.hostname}/post/${paths[1]}`
  });
});

io.on('connection', (socket) => {
  const room = socket.handshake && socket.handshake.query && socket.handshake.query.room || '/';
  socket.join(room);
  console.log('joining room:', room);
  socket.on('disconnect', () => {
    socket.leave(room);
  });
});

