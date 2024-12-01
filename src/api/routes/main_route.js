import express from 'express'
import BasicRouter from './basic_crud_validator_router.js';
import UserRouter from './user_router.js';
import { hashPassword, verifyToken } from '../../utils/auth.js';

const versionMainRoute = express.Router();
//^ basic router table , main prop
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


const userRouterI = new UserRouter('users', 'username').getRouter()
versionMainRoute.use('/users', userRouterI);
//console.log(userRouterI)

versionMainRoute.use('/signup', militancyGroupsRouter);

/*
const res = await hashPassword('password111')
const res2 = await hashPassword('password222')
console.log(res, res2)
const res= verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6ImFkZW1haWxAZW1haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzE4NjI4OSwiZXhwIjoxNzIzMjI5NDg5fQ.k0r0BtBLlPa0UEv5O6TqQB-AFy9s9IOdJHslavMy9R0')
console.log(res)
versionMainRoute.use('/admin/political_parties', ppRouter);
*/


export default versionMainRoute;