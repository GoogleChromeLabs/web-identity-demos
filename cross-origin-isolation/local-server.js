const demo = require('./server.js')['cross-origin-isolation'];

const PORT = process.env.PORT || 8080;
demo.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


