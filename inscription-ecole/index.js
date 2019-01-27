const express = require('express');
const db = require('./models/index');

const app = express();

app.get('/', function (req, res) {
    res.status(200).json({ok: 'init application'});
});


/*
app.get('/formations', async function (req, res) {
    try{
        const formations = await db.formation.findAll();
        res.status(200).json(formations);
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'ddd'});
    }
});
*/


app.get('/formations', function (req, res) {
  db.formation.findAll().then(function(data){
     res.status(200).json(data);
  });
});

app.get('/formations/:id', function(req, res){
    const id = req.params.id;
    db.formation.findById(id).then(function(formation){
        if(!formation){
            return res.status(404).json({error: 'formation not found.'});
        }
        res.status(200).json(formation);
    });
});



app.listen(4501, function () {
    console.log('application ready port : 4501');
});
