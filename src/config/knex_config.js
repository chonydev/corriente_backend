const environment = process.env.ENVIRONMENT || 'development'
import {DEVENV} from '../constants/knex_const.cjs';
import knex from 'knex';

const db = knex(DEVENV[environment]);

export default db;

/*
> Commonjs
const config = require('../constants/knex-const.js')[environment];
module.exports = require('knex')(config);
*/