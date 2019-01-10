const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

// partage des ressources entre origines multiples
//https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//le tableau des utilisateurs
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

/**
 * Route retournant la liste des utilisateurs
 */
app.get('/users', function (req, res) {
    res.status(200).json(users);
});

/**
 * Route permettant de récuperer les informations d'un utilisateur
 */
app.get('/users/:id', function (req, res) {
    //on récupère le paramètre :id
    const id = req.params.id;


    //On recherche un utilisateur dans le tableau avec son id
    const user = users.find(function (u) {
        return u.id == id;
    });
    //const user = users.find(u => u.id == id); => VERSION AVEC UNE FONCTION FLECHEE


    //Si aucun résultat on renvoie un JSON avec un code d'erreur 404: utilisateur non trouvé
    if(!user) {
        return res.status(404).json({error: "user not found."});
    }
    //Si pas d'erreur on renvoie le resultat
    res.status(200).json(user);
});


/**
 * Route permettant de supprimer un utilisateur
 */
app.delete('/users/:id', function (req, res) {
    //on récupère le paramètre :id
    const id = req.params.id;

    //Le findIndex va nous permettre de recherche la position de l'utilisateur dans le tableau
    const index = users.findIndex(function (u) {
        return u.id == id;
    });
    //const index = users.findIndex(u => u.id == id); => VERSION AVEC UNE FONCTION FLECHEE

    //Si aucun résultat on renvoie un JSON avec un code d'erreur 404: utilisateur non trouvé
    if(-1 === index) {
        return res.status(404).json({error: "user not found."});
    }

    //On supprime l'utilisateur du tableau
    users.splice(index, 1);

    //on renvoie un code http 204 pour indiquer que tout s'est bien passé mais qu'il n'y a aucun resultat
    res.status(204).json();
});


/**
 * Route permettant de mettre à jour les informations d'un utilisateur
 */
app.post('/users/:id', function (req, res) {
    //on récupère le paramètre :id
    const id = req.params.id;

    //On recherche un utilisateur dans le tableau avec son id
    const user = users.find(function (u) {
        return u.id == id;
    });
    //  const user = users.find(u => u.id == id); => VERSION AVEC UNE FONCTION FLECHEE

    //Si aucun résultat on renvoie un JSON avec un code d'erreur 404: utilisateur non trouvé
    if(!user) {
        return res.status(404).json({error: "user not found."});
    }

    //on met à jour les informations de l'utilisateur
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.weight = parseFloat(req.body.weight || user.weight);

    //on renvoie un code http 200 pour dire que tout s'est bien passé + l'objet utilisateur mis à jour
    res.status(200).json(user);
});

/**
 * Route permettant d'ajouter un nouvel utilisateur
 */
app.post('/users', function (req, res) {
    const user = {};
    //on met à jour les informations de l'utilisateur
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.weight = parseFloat(req.body.weight || user.weight);

    //on ajoute l'utilisateur au tableau
    users.push(user);

    //on renvoie un code http 200 pour dire que tout s'est bien passé + l'objet utilisateur mis à jour
    res.status(200).json(user);
});


app.get('/test', function (req, res) {
    const voiture = req.query.voiture || 'N/A';
    const couleur = req.query.couleur || 'N/A';

    res.status(200).json({message: {voiture: voiture, couleur: couleur}});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
