module.exports = (app) =>{

    let controller = app.controllers.postController
   

   app.route('/api/manchetes')
        .get(controller.listPosts)
        .post(controller.savePosts)

 

    app.route('/api/manchetes/:id')
        .delete(controller.deletePostForId) 

   


      
}




