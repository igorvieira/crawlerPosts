
describe('Route: Posts', () => {
  

  describe('GET /api/posts', () => {
      it('should be get all posts', done => {
      request
        .get(url.resolve(ABS_URL,'posts'))
        .end((err , res) => {
          res.should.be.exist;
          res.status.should.be.eql(200);
          done();
        })
    });
  })

 describe('Not Found 404 ', () => {
    it('throws error when post not exist', done => {
    request
    .get(url.resolve(ABS_URL+'/asdasdasd', 'posts'))
      .end(res => {
         res.should.be.exist;
        res.status.should.be.eql(404)
      done()
    });
  });
 })
   
  
});

