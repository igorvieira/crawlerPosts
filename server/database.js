import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

module.exports = uri =>{



   mongoose.connect(uri)
      mongoose.connection.on('connected', function(){
        console.log('Mongoose! Connected in:'+ uri);
      });


      mongoose.connection.on('disconnect', function(){
        console.log('Mongoose! Desconnected:'+ uri);
      });

      mongoose.connection.on('error', function(erro){
        console.log('Mongoose!Erro connection'+ erro);
      });

      process.on('SIGINT', function(){
        mongoose.connection.close(function(){
          console.log('Good bye =]');
          process.exit(0);
        });	
      });

      
  
 
}
