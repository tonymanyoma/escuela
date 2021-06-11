var mysql = require('mysql');

var connection_escuela = mysql.createConnection({
   
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'escuela',
   port: 3306
   
});

connection_escuela.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta a Escuela');
   }
});


module.exports = connection_escuela;