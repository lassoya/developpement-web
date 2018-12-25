const express = require('express');

const app = express();
const users = [
    {id: 1, firstname: 'Roger', lastname: 'Véro', weight: 70.5},
    {id: 2, firstname: 'David', lastname: 'andrew', weight: 70.5},
    {id: 3, firstname: 'Bernard', lastname: 'David', weight: 70.5},
    {id: 4, firstname: 'Hélène', lastname: 'Samuel', weight: 70.5},
    {id: 5, firstname: 'Mirabelle', lastname: 'andrew', weight: 70.5},
    {id: 6, firstname: 'Nicole', lastname: 'Nicole', weight: 70.5},
    {id: 7, firstname: 'Lola', lastname: 'andrew', weight: 70.5},
    {id: 8, firstname: 'Mélanie', lastname: 'Mélanie', weight: 70.5},
    {id: 9, firstname: 'Samuel', lastname: 'David', weight: 70.5},
    {id: 10, firstname: 'Véro', lastname: 'Bernard', weight: 70.5},
];

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/users', function (req, res) {
    res.status(200).json(users);
});

app.get('/test', function (req, res) {
    const voiture = req.query.voiture || 'N/A';
    const couleur = req.query.couleur || 'N/A';

    res.status(200).json({message: {voiture: voiture, couleur: couleur}});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
