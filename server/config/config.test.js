export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/lettpost_test'
  }
};
