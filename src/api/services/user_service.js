import BasicCRUDService from "./basic_crud_service.js";

export default class UserService extends BasicCRUDService {
  
  async getByUsername(prop) {
    return await this.crudRepo.getByUsername(prop)
  }

}