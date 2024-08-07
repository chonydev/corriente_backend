import { Router } from 'express';
import BasicCRUDRepo from '../repositories/basic_crud_repository.js';
import BasicCRUDService from '../../services/basic_crud_service.js';
import BasicCRUDController from '../controllers/basic_crud_controller';
import { idsValidator, idValidator } from '../middlewares/validators/id_validator.js';
import ValidatorGenerator from '../middlewares/validators/basic_create_update_validator.js';

export default class BasicRouter {
  tableName;
  mainProp;
  router;

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

    this.router.route('')
      .get(controller.getAll)
      .post(validator.createValidator, controller.create)
      .put(validator.updateValidator, controller.update);

    this.router.route('/byid/:id')
      .get(idValidator, controller.getById)
      .delete(idValidator, controller.delete);

    this.router.route('/bulk')
      .get(idsValidator, controller.bulkGet)
      .post(validator.bulkCreateValidator, controller.bulkCreate)
      .put(validator.bulkUpdateValidator, controller.bulkUpdate)
      .delete(idsValidator, controller.bulkDelete);
  }

  getRouter() {
    return this.router;
  }
}