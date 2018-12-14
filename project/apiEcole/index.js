const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/test', function (req, res) {
    const voiture = req.query.voiture || 'N/A';
    const couleur = req.query.couleur || 'N/A';

    res.status(200).json({message: {voiture: voiture, couleur: couleur}});
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
