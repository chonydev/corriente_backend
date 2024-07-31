import knex from "../../config/knex_config.js";

export default  class BasicCRUDRepo {
  table;

  constructor(table) {
      this.table = table
  }

  async getAll() {
    return await knex(this.table).select('*');
  }
  
  async getById(id) {
    return await knex(this.table).where({ id });
  }

  async create(data) {
    const [id] = await knex(this.table).insert(data).onConflict().ignore() // .returning('id'); // mysql not implemented
    return await this.getById(id);
  }

  async update(id, dataObject) {
    await knex(this.table).where({ id:id }).update(dataObject);
    return await this.getById(id);
  }

  async delete(id) {
    return await knex(this.table).where({ id }).del();
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------

  async bulkGet(id) {
    return await knex(this.table).whereIn('id', id);
  }

  async bulkCreate(data) {
    const ids = await knex(this.table).insert(data).onConflict().ignore();
    return await this.getById(ids);
  }

  async bulkUpdate(id, dataObject) {
    await knex(this.table).whereIn('id', id).update(dataObject);
    return await this.getById(id);
  }

  async bulkDelete(id) {
    return await knex(this.table).whereIn('id', id).del();
  }
};

