import sanitize from 'mongo-sanitize'
import request from 'request'
import cheerio from 'cheerio'




module.exports =  (app) =>{
  
let Post = app.models.post


 const controller = {}


 controller.getAllPostsForUrl = (req,res) =>{


 let urlRequest = 'http://www.brasil.gov.br/'

      // const receive = (items) =>{
      //   return res.json(items)
        
        
      //   // let manchetes = []
      //   // items.map(function(item){
            
        
      //   //     res.body.titulo = item
      //   //     res.body.data = new Date()
      //   //     res.body.font = 'Portal Brasil'
      //   //    return  manchetes.push(manchete)
            
      //   // })

      // }

          
       var manchetes = []
          
              request(urlRequest, function (error, response, body) {
      
              var $ = cheerio.load(body)
              
            
            
              $('#content h1').children().each(function(next){
                
                let data = {
                  "titulo":$(this).text(),
                  "data":new Date(),
                  "fonte":'Brasil post'
                  
                }
                
                manchetes.push(data)

               
              })


               Post.create(manchetes)
                  .then(post=>res.json(post))
                  .catch(error => {
                    console.log(error)
                    res.end() 
                  })
              
    

    })
      

     
 }


  controller.listPosts = (req, res) =>{
    Post.find().exec()
    .then(post => res.json(post))
    .catch(err => console.log(err))
  }

  

  controller.savePosts = (req, res) =>{

      let _id = req.body._id


      let data = {
        "titulo":req.body.titulo,
        "data":req.body.data,
        "fonte":req.body.fonte
      }

      if(_id){
        
        Post.findByIdAndUpdate(_id, data).exec()
        .then((post=>res.json(post)))
            .catch((err => {
                res.status(500).json(err)
                console.log(err)
            }))


      }else{

        Post.create(data)
        .then((post=>res.json(post)))
        .catch((err => {
              res.status(500).json(err)
              console.log(err)
          }))
 
      }





  }
  
  controller.getPostForId = (req,res) =>{
    let _id = req.params.id
    Post.findById(_id).exec()
      .then(post =>{
        if(!post) throw new Error("Book is not found")
        res.json(post)
      })

  }

  controller.deletePostForId = (req, res) =>{
       let _id = sanitize(req.params.id)
        Post.remove({"_id":_id}).exec()
        .then(()=> res.end())
        .catch(err => console.error(err))
  }


  return controller
}