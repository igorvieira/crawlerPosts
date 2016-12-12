import mongoose from 'mongoose'


module.exports = app =>{

let post = mongoose.Schema({
  titulo:{
    type:String,
    required:false,   

  },
  formato:{
    type:String,
  },
  data:{
   data:Date
  },
  fonte:{
    type:String,
    required:true
  }
  

})


return mongoose.model('Post', post)


}
