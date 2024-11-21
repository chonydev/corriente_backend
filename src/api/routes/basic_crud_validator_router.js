import { Router } from 'express';
import BasicCRUDRepo from '../repositories/basic_crud_repository.js';
import BasicCRUDService from '../services/basic_crud_service.js';
import BasicCRUDController from '../controllers/basic_crud_controller';
import { idsValidator, idValidator } from '../middlewares/validators/id_validator.js';
import ValidatorGenerator from '../middlewares/validators/basic_create_update_validator.js';

import authTokenMw from '../middlewares/authentication_middleware.js';
//import { authoMw } from '../middlewares/authorization_middleware.js';
import Authorizator from '../middlewares/authorizator_class.js';
import authorizator_schemas from '../middlewares/authorizator_schemas.js';

export default class BasicRouter {
  tableName;
  mainProp;
  router;

  validator;
  repository;
  service;
  controller;

  constructor(tableName, mainProp) {
    this.tableName = tableName;
    this.mainProp = mainProp;
    this.router = Router();
    this.setupRouter();
  }
     
  setupRouter() {
    const validator = new ValidatorGenerator(this.mainProp);
    const repository = new BasicCRUDRepo(this.tableName);
    const service = new BasicCRUDService(repository);
    const controller = new BasicCRUDController(service);
    
    this.validator =  validator;
    this.repository =   repository;
    this.service =   service;
    this.controller =   controller;

    const authoMw = new Authorizator(this.tableName, authorizator_schemas).authoMw
    
    this.router.route('')
      .get(authTokenMw, authoMw, controller.getAll)
      .post(authTokenMw, authoMw, validator.createValidator, controller.create)
      .put(authTokenMw, authoMw, controller.update);

    this.router.route('/byid/:id') //^ name instead of id (security and readability)
      .get(authTokenMw, authoMw, idValidator, controller.getById)
      .delete(authTokenMw, authoMw, idValidator, controller.delete);

    this.router.route('/bulk')
      .get(authTokenMw, authoMw, idsValidator, controller.bulkGet)
      .post(authTokenMw, authoMw, validator.bulkCreateValidator, controller.bulkCreate)
      .put(authTokenMw, authoMw, validator.bulkUpdateValidator, controller.bulkUpdate)
      .delete(authTokenMw, authoMw, idsValidator, controller.bulkDelete);
  }

  /*
  this.router.route('')
      .get(authTokenMw, authoMw, controller.getAll)
      .post(authTokenMw, authoMw, validator.createValidator, controller.create)
      .put(authTokenMw, authoMw, validator.updateValidator, controller.update);

    this.router.route('/byid/:id')
      .get(authTokenMw, authoMw, idValidator, controller.getById)
      .delete(authTokenMw, authoMw, idValidator, controller.delete);

    this.router.route('/bulk')
      .get(authTokenMw, authoMw, idsValidator, controller.bulkGet)
      .post(authTokenMw, authoMw, validator.bulkCreateValidator, controller.bulkCreate)
      .put(authTokenMw, authoMw, validator.bulkUpdateValidator, controller.bulkUpdate)
      .delete(authTokenMw, authoMw, idsValidator, controller.bulkDelete);*/

  getRouter() {
    return this.router;
  }
}