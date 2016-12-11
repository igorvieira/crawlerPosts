import superagent from 'superagent'
import chai from 'chai'
import ch from 'charlatan'
import url from 'url'
const ABS_URL = 'http://localhost:3000/api/posts';

global.url = url
global.ABS_URL = ABS_URL
global.ch = ch
global.should = chai.should()
global.request = superagent
