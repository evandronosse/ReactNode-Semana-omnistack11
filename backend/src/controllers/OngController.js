const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const crypto = require('crypto');


module.exports = {
  //listagem
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },
  async create(request, response) {
    //quebrar array
    const { name, email, whatsapp, city, uf } = request.body;
    
    //gerar o id random com teste
    const id = generateUniqueId();
    
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    return response.json({ id });
  }
}