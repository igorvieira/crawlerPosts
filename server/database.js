import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')



module.exports = uri =>{



   mongoose.connect(uri)
      .then(() =>{
         mongoose.connection.on('error', err =>{
            console.log(`mongoose connection ${err}`)
          })

        console.log(`Mongodb connected: ${uri}`)
        

      })
      .catch(err => {
          console.log(`rejected promise ${err}`)
          mongoose.disconnect()      
        
      })

      process.on('SIGINT', function() {
        mongoose.connection.close(function() {
          console.log('Good bye =]');
          process.exit(0);
        });
      });
    
  
 
}
