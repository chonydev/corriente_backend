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

  async update(data) {
    return await this.crudRepo.update(data)
  }

  async delete(id) {
    return await this.crudRepo.delete(id)
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------


  async bulkGet(ids) {
    return await this.crudRepo.bulkGet(ids)
  }

  async bulkCreate(items) {
    return await this.crudRepo.bulkCreate(items)
  }

  async bulkUpdate(items) {
    return await this.crudRepo.bulkUpdate(items)
  }

  async bulkDelete(ids) {
    return await this.crudRepo.bulkDelete(ids)
  }

};


