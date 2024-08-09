//const authMiddleware = require('../middlewares/auth');
import  BasicCRUDRepo  from '../repositories/basic_crud_repository.js';
import  BasicCRUDService  from '../../services/basic_crud_service.js';
import  BasicCRUDController from '../controllers/basic_crud_controller';
import { idsValidator, idValidator } from '../middlewares/validators/id_validator.js';
import ValidatorGenerator from '../middlewares/validators/basic_create_update_validator.js';
import { Router } from 'express';

const table = 'users';
// ------------------------ Validator
//const ppValidator = new ValidatorGenerator('ppname')
// ------------------------ Layers: Repo-Service-Controller
const PPRepository = new BasicCRUDRepo(table);
const PPService = new BasicCRUDService(PPRepository);
const PPController = new BasicCRUDController(PPService);
//console.log(PPController)
const router = Router();

router.route('')
.get(PPController.getAll)
//@ .post(ppValidator.createValidator, PPController.create)
  .post(ppValidator.createValidator, creationMw, PPController.create)
.put(ppValidator.updateValidator, PPController.update)
router.route('/byid/:id')
.get(idValidator, PPController.getById)
/*
.delete(idValidator, PPController.delete)
// ------------------------ Bulk queries
router.route('/bulk')
.get(idsValidator, PPController.bulkGet)
.post(ppValidator.bulkCreateValidator, PPController.bulkCreate)
.put(ppValidator.bulkUpdateValidator, PPController.bulkUpdate)
.delete(idsValidator, PPController.bulkDelete)
*/
export default router