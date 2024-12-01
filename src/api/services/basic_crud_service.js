export default class BasicCRUDService {
  //private crudRepo: crudRepo;
  crudRepo;
  table;

  constructor(crudRepo) {
      this.crudRepo = crudRepo;
      this.table = crudRepo.table;
  }

//async getAll() : Promise<modelRef[]> {
  async getAll(allowedFields) {
    return await this.crudRepo.getAll(allowedFields);
  }
  
  async getById(id, allowedFields) {
    return await this.crudRepo.getById(id, allowedFields)
  }

  async create(data) {
    return await this.crudRepo.create(data)
  }

  async update(data_plus_session) {
    console.log('\n\n ------------------- UPDATE SERVICE')
    console.log(data_plus_session)

    const { session, ...data } = data_plus_session;

    //if(this.tableName === 'users') {
/*      const filteredData =  {id: data.id, accountRole: data.accountRole, accountState: data.accountState}
      console.log('\n\nfilteredData')
      console.log(filteredData)
      console.log(data)
      
      if(data.id !== session.id) {
        //^ accountState === 'active'
        return 'forbidden'
      }      
      */
      const { id, ...updateData } = data
      
      console.log(id, updateData)

      if(Object.keys(updateData).length === 0 ) {
        return 'Empty update data'
      }

      return await this.crudRepo.update(updateData)  
    //}
  }

  async delete(id) {
    return await this.crudRepo.delete(id)
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------


  async bulkGet(ids, allowed_fields) {
    return await this.crudRepo.bulkGet(ids, allowed_fields)
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


