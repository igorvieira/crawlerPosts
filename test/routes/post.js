describe('Route: Posts', () => {
  
  describe('GET /api/posts', () => {
      it('should be get all posts', done => {
      request
        .get('/api/posts')
        .end((err , res) => {
          expect(res.body).to.be.instanceof(Array);
          done();
        })
    });
  })

    describe('status 404', () => {
      it('throws error when posts not exist', done => {
        request.get('/api/posts/id-not-exist')
          .expect(404)
          .end(err => done(err));
      });
    });


  });

  
