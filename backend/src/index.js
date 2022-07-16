const routes = require('./routes')
const express = require('express');
const cors = require('cors');

const app = express();

//para ele reconhecer o json
app.use(cors());
app.use(express.json());
app.use(routes);

//rotas:

//Métodos HTTP
//GET: Buscar/listar uma informação do back-end
//POST: Criar uma iinformação no back-end
//PUT: Alterar uma informação no back-end
//DELETE: Deletar uma informação no back-end


//Tipos de parametros:
//Query: são parametros nomeados enviados na rota após o simbolo "?" e servem para filtros, paginação, etc
//Route Params: Parametros utilizados para identificar recursos
//Request Body: Corpo da requisição utilizado para criar ou alterar recursos (nome, senha, etc)


app.listen(3333);