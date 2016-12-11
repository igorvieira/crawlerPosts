import config from "./config"
import app from "./express"
import http from "http"

require('./database')(config.mongodb.uri)

app.set('port', (process.env.PORT || config.server.port))
const port = app.get('port')

http.createServer(app).listen(port, () => {    
    if (!config.isTest) {
        console.log(`Address: ${config.server.host}:${config.server.port}`);
    }
})

