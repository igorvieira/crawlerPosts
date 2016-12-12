import sanitize from 'mongo-sanitize'
import request from 'request'
import cheerio from 'cheerio'

module.exports =  (app) =>{
  
let Post = app.models.post

 const controller = {}


 controller.savePosts = (req,res) =>{
    const manchetes = []
      request(req.body.fonte, function (error, response, body) {
        const $ = cheerio.load(body)
         $(req.body.formato).children().each(function(){
                let data = {
                  "titulo":$(this).text(),
                  "formato":req.body.formato,
                  "data":new Date(),
                  "fonte":req.body.fonte
                }
                manchetes.push(data)
              })
              Post.create(manchetes)
              .then(post=>res.json(post))
              .catch(err => {
                console.log(`Error in save datas - ${err}`)
                res.end() 
              })
    })
 }


  controller.listPosts = (req, res) =>{
    Post.find().sort({"titulo":-1})
    .then(post => res.json(post))
    .catch(err => console.log(`Error in list datas - ${err}`))
  }

  controller.deletePostForId = (req, res) =>{
       const _id = sanitize(req.params.id)
        Post.remove({"_id": _id}).exec()
        .then(() =>    res.end())
        .catch(err => console.log(`Error in delete object - ${err}`))
  }


  return controller
}
