import express from 'express'
import BasicRouter from './basic_crud_validator_router.js';

const versionMainRoute = express.Router();

const ppRouter = new BasicRouter('political_parties', 'ppname').getRouter()
const sectionalsRouter = new BasicRouter('sectionals', 'sectionalname').getRouter()
const jobsRouter = new BasicRouter('jobs', 'jobname').getRouter()
const studiesRouter = new BasicRouter('studies', 'studyname').getRouter()
const militancyGroupsRouter = new BasicRouter('militancy_groups', 'militancy_groups').getRouter()
//console.log(jobsRouter.stack[0].route.stack[0])

versionMainRoute.use('/political_parties', ppRouter);
versionMainRoute.use('/sectionals', sectionalsRouter);
versionMainRoute.use('/jobs', jobsRouter);
versionMainRoute.use('/studies', studiesRouter);
versionMainRoute.use('/militancy_groups', militancyGroupsRouter);

export default versionMainRoute;