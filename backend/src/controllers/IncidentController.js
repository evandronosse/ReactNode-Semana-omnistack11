
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    //paginação
    const { page = 1 } = request.query;

    //contagem total de casos
    const [count] = await connection('incidents').count();

    //trazer todos os dados dos incidents'
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)    //paginação limitado a 5
      .offset((page - 1) * 5) //paginação lógica
      .select([
        'incidents.*',
        'ongs.id',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    response.header('X-total-count', count['count(*)']);

    return response.json(incidents)
  },

  async create(request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id })
  },
  //logica do metodo
  async delete(request, response) {
    //poegar id de dentro do request.paramns
    const { id } = request.params;
    //id da ong criada, buscamos isso porque rpecisamos verificar se o nosso incidente realmente foi criado por quem quer deletar
    const ong_id = request.headers.authorization;

    //verificar e impedir que uma ong possa apagar outra ong
    const incident = await connection('incidents')
      //buscar o ID    
      .where('id', id)
      //selecionar apenas a coluna ID
      .select('ong_id')
      //como sabemos que é somente uma info, usamos o first
      .first();

    //veriricação
    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }
    //se deu tudo certo, deletaremos do banco
    await connection('incidents').where('id', id).delete();

    //somente para alertar uma resposta que não tem conteudo
    return response.status(204).send();
  }
};

//headers guardam informações do contexto desssa nossa requisição, como dados de autentificação, localização, dados de idioma etc.