const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).json({ok: 'init application'});
});


app.get('/api/formations', function (req, res) {
    db.formation.findAll().then(function (data) {
        res.status(200).json(data);
    });
});

app.get('/api/formations/:id', function (req, res) {
    const id = req.params.id;
    db.formation.findById(id).then(function (formation) {
        if (!formation) {
            return res.status(404).json({error: 'formation not found.'});
        }
        res.status(200).json(formation);
    });
});

app.post('/api/formations', function (req, res) {
    const data = {
        label: req.body.label || null,
        description: req.body.description || null,
        start_date: req.body.start_date || null,
        end_date: req.body.end_date || null,
        cost: req.body.cost || null
    };

    const formation = db.formation.build(data);
    formation.save().then(function (data) {
        res.status(200).json(data);
    });
});

app.post('/api/formations/:id', function(req, res){
    const id = req.params.id;
    db.formation.findById(id).then(function(formation){
        if(!formation){
            return res.status(404).json({error: 'formation not found.'});
        }
        formation.label = req.body.label;
        formation.description = req.body.description;
        formation.save().then(function(formation){
            return res.status(200).json(formation);
        })
    })
});


app.listen(4501, function () {
    console.log('application ready port : 4501');
});
