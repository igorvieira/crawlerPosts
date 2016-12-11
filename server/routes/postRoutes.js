module.exports = (app) =>{
   let controller = app.controllers.postController

   app.route('/api/posts')
        .get(controller.listPosts)
        .post(controller.savePosts)

    app.route('/api/posts/:id')
        .delete(controller.deletePostForId) 
      
}




