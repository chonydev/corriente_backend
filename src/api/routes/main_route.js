import express from 'express'
import ppr from './political_parties_routes.js';

const versionMainRoute = express.Router();

versionMainRoute.use('/political_parties', ppr);

export default versionMainRoute;