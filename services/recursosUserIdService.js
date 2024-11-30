const db = require('../backend/db');

const obterRecursosPorUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM recursos WHERE userId = ?';
    db.all(query, [userId], (err, rows) => {
      if (err) {
        console.error('Erro na consulta:', err);
        return reject(err);
      }

      console.log('Dados retornados:', rows); // Adicione este console.log
      resolve(rows);
    });
  });
};

module.exports = {
  obterRecursosPorUserId,
};

