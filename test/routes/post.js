describe('Route: Posts', () => {

  const Posts = app.models.post

  let id = null


  beforeEach(done => {
    Posts.remove({}, () => {
      done()
    })
  });

describe('POST /api/posts', () => {
  describe('status 200', () => {
      it('creates a new post', done => {
        request.post('/api/posts')
        .send({ 
            formato: '#content h1',
            fonte:'http://www.brasil.gov.br/'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body[0].formato).to.eql('#content h1');
            expect(res.body[0].fonte).to.eql('http://www.brasil.gov.br/');
            id = res.body[0]._id
            done(err);
          });
      });
    });
});
  
  describe('GET /api/posts', () => {
      describe('status 200', () => {
      it('should be get all posts', done => {
        request
          .get('/api/posts')
          .end((err , res) => {
            expect(res.body).to.be.instanceof(Array);
            done();
          })
      });
    });
  })

 describe('DELETE /api/posts/:id', () => {
    describe('status 200', () => {
      it('removes a posts', done => {
        request.delete(`/api/posts/${id}`)
          .expect(200)
          .end(err => done(err));
      });
    });
  });


   

    describe('Not found  /api/posts/id-not-exist', () =>{
      describe('status 404', () => {
        it('throws error when posts not exist', done => {
          request.get('/api/posts/id-not-exist')
            .expect(404)
            .end(err => done(err));
        });
      });
    })


  });

  
