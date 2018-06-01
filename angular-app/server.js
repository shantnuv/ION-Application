const express = require('express');
const app = express();
const path = require('path');
const loginUser = require('./server-routes/login');
const bodyParser = require('body-parser')

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/login', (req, res) => {
  const interval = Math.random * 3000;
  const loginPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, interval);
  });

  loginPromise.then(() => {
      return res.send(loginUser(req.body.username, req.body.password));
  });
});

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))

app.use('/app', express.static(path.join(__dirname, '/dist')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
