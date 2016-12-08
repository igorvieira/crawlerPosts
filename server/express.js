import express from 'express'
import consign from 'consign'
import bodyParser from 'body-parser'



const app = express()


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000))

consign({cwd:'server', verbose:false})
    .include('models')
    .then('controllers')
    .then('routes')
    .then('test')
    .into(app)



export default app;

