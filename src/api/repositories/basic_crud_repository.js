import knex from "../../config/knex_config.js";

export default class BasicCRUDRepo {
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
    const id = await knex(this.table).insert(data).onConflict().ignore() // .returning('id'); // mysql not implemented
    return await this.getById(id);
  }

  async update(dataObject) {
    const { id, ...updateData } = dataObject
    await knex(this.table).where({ id }).update(updateData);
    return await this.getById(id);
  }

  async delete(id) {
    return await knex(this.table).where({ id }).del();
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------
  /*
  ^ if atomicity is required: use transaction (create and update)
  ^ bulk delete only retrieve number of rows deleted
  */


  async bulkGet(ids) {
    return await knex(this.table).whereIn('id', ids);
  }

  async bulkCreate(data) {
    const results = [];
    for (const item of data) {
      try {
        const [id] = await knex(this.table).insert(item).onConflict().ignore();
        results.push({ ...item, id, status: id ? 'inserted' : 'ignored' });
      } catch (error) {
        results.push({ ...item, status: 'error', error: error.message });
      }
    }
    return results;
  }

  async bulkUpdate(items) {
    const results = [];
    for (const item of items) {
      try {
        const { id, ...updateDataItem } = item
        const idTry = await knex(this.table).where({ id }).update(updateDataItem); //.onConflict().ignore();
        results.push({ ...item, status: idTry ? 'modified' : 'id not found or ignored' });
      } catch (error) {
        results.push({ ...item, status: 'error', error: error.message });
      }
    }
    return results;
  }

  async bulkDelete(id) {
    const rowsDeleted = await knex(this.table).whereIn('id', id).del();
    return rowsDeleted
  }

}


