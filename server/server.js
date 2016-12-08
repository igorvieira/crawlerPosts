import config from "./config"
import app from "./express"
import http from "http"

require('./database')(config.db)


const port = app.get('port')

http.createServer(app).listen(port, () => console.log('server is running: %d', port))

