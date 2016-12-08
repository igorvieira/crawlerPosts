import path from 'path'

let rootPath = path.normalize(__dirname + '/../')


module.exports = {

  rootPath:rootPath,
  db:'mongodb://localhost/lettpost'

}
