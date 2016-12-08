module.exports = (app) =>{

    let controller = app.controllers.postController
   

   app.route('/api/manchetes')
        .get(controller.getAllPostsForUrl)

    app.route('/api/posts')
        .get(controller.listPosts)
        .post(controller.savePosts)   

    app.route('/api/posts/:id')
        .get(controller.getPostForId)
        .put(controller.savePosts) 
        .delete(controller.deletePostForId) 

   


      
}




