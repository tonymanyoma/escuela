const connection_escuela = require('../DB');


var controller = {

	getDocumentos: (req, res) => {

		const sql = 'SELECT * FROM tipo_documentos';

		connection_escuela.query(sql, (error, result) => {

			if (error) {
				throw error;
			}

			if (result.length > 0) {
				res.json(result);
			} else {
				res.send('No hay resultados');
			}
		});


	},



}



module.exports = controller;