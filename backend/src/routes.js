const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//rota para cadastro e listagem de ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Profile para pesquisar filtro especifico
routes.get('/profile', ProfileController.index);

//rota para cadastro e listagem de Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//login
routes.post('/sessions', SessionController.create);

//exportando uma variavel
module.exports = routes;