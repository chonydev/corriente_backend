export default  class BasicCRUDService {
  //private crudRepo: crudRepo;
  crudRepo;

  constructor(crudRepo) {
      this.crudRepo = crudRepo;
  }

//async getAll() : Promise<modelRef[]> {
  async getAll() {
    return await this.crudRepo.getAll();
  }
  
  async getById(id) {
    return await this.crudRepo.getById(id)
  }

  async create(data) {
    return await this.crudRepo.create(data)
  }

  async update(id, data) {
    return await this.crudRepo.update(id, data)
  }

  async delete(id) {
    return await this.crudRepo.delete(id)
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------


  async bulkGet(id) {
    return await this.crudRepo.bulkGet(id)
  }

  async bulkCreate(data) {
    return await this.crudRepo.bulkCreate(data)
  }

  async bulkUpdate(id, data) {
    return await this.crudRepo.bulkUpdate(id, data)
  }

  async bulkDelete(id) {
    return await this.crudRepo.bulkDelete(id)
  }

};


