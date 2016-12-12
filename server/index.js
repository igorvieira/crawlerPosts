import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from './config.js';

const app = express();



require('./database')(config.mongodb.uri);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use(express.static('./client'));
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign({cwd:'server', verbose:true})
  .include('models')
    .then('controllers')
    .then('routes')
    .into(app)

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Express-Mongoose TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
