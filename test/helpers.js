import supertest from 'supertest';
import chai from 'chai';
import app from '../server/index.js';
import config from '../server/config.js';

global.app = app;
global.config = config;
global.expect = chai.expect;
global.request = supertest(app);