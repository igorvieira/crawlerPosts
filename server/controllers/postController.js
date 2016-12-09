import sanitize from 'mongo-sanitize'
import request from 'request'
import cheerio from 'cheerio'




module.exports =  (app) =>{
  
let Post = app.models.post


 const controller = {}


 controller.savePosts = (req,res) =>{

         

  

          
       var manchetes = []
          
              request(req.body.fonte, function (error, response, body) {
      
              var $ = cheerio.load(body)

            
              
            //#content h1
            
            
                $(req.body.formato).children().each(function(){
                
                
                
                let data = {
                  "titulo":$(this).text(),
                  "formato":req.body.formato,
                  "data":new Date(),
                  "fonte":req.body.fonte
                  
                
                }
                
             
                manchetes.push(data)

               
              })

            
          setTimeout(()=>{
               Post.create(manchetes)
                  .then(post=>res.json(post))
                  .catch(error => {
                    console.log(error)
                    res.end() 
                  })
              
            },1000)

    })
      

     
 }


  controller.listPosts = (req, res) =>{
    Post.find().exec()
    .then(post => res.json(post))
    .catch(err => console.log(err))
  }

  

  
 

  controller.deletePostForId = (req, res) =>{
       let _id = sanitize(req.params.id)
        Post.remove({_id: _id}, function(err, doc) {
          res.send({_id: req.params.id});
        });
  }


  return controller
}