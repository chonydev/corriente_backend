//const authMiddleware = require('../middlewares/auth');
//const { PPValidator  } = require('../validators/political_parties_validator');
import  BasicCRUDRepo  from '../repositories/basic_crud_repository.js';
import  BasicCRUDService  from '../../services/basic_crud_service.js';
import  BasicCRUDController  from '../controllers/basic_crud_controller.js';
import apiConfig from '../../constants/api_const.js';

import PPControllerold from '../controllers/political_parties_controller.js'
import { validateId } from '../middlewares/validators/id_validator.js';

const PPRepository = new BasicCRUDRepo('political_parties');
const PPService = new BasicCRUDService(PPRepository);
const PPController = new BasicCRUDController(PPService);

const table = 'political_parties';

export default (app) => {
  //app.get(`${urlapi}/political_parties/:id`, PPControllerold.getPoliticalPartyById);
  app.get(`${apiConfig.urlapi}/${table}/:id`, validateId, PPController.getById);
  app.get(`${apiConfig.urlapi}/${table}`,  PPController.getAll);
  app.post(`${apiConfig.urlapi}/${table}`, PPController.create);
  app.put(`${apiConfig.urlapi}/${table}`, PPController.update);
  app.delete(`${apiConfig.urlapi}/${table}`, validateId, PPController.delete);

  app.get(`${apiConfig.urlapi}/${table}/bulk-get`, PPController.bulkGet);
  
  //app.get(`${apiConfig.urlapi}/${table}/bulk-get`, validateId, PPController.bulkGet);
  

}

/*
module.exports = (app, urlapi) => {
    app.delete(`${urlapi}/political_parties/:ppname`, controller.delete);
    app.delete(`${urlapi}/bulk_political_parties`, controller.bulkDelete);   
}

*/