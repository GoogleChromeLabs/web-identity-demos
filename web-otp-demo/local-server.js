const demo = require('./index.js')['web-otp-demo'];

const PORT = process.env.PORT || 8080;
demo.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


