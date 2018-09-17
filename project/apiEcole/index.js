const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/users', function (req, res) {
  res.status(200).json({
    message: 'Lise des utilisateurs',
    test: 'HELLO' });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
