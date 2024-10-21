import knex from "../../config/knex_config.js";

export default class BasicCRUDRepo {
  table;

  constructor(table) {
    this.table = table
  }

  async getAll() {
    return await knex(this.table).select('*');
  }

  async getById(id, allowedFields) {
    console.log('\n\n --------------------- REPO id, allowed_fields')
    console.log(id, allowedFields)
    //return await knex(this.table).where({ id }).first();
    return await knex(this.table).select(allowedFields).where({ id }).first();
  }

  async create(data) {
    console.log(data)
    const [id] = await knex(this.table).insert(data).onConflict().ignore() // .returning('id'); // mysql not implemented
    console.log()
    return await this.getById(id);
  }

  async update(dataObject) {
    console.log('\n\n ------------------- update repo')
    console.log(dataObject)
    const { id, ...updateData } = dataObject
    console.log(id, updateData )
    await knex(this.table)
    .update(updateData)
    .where({ id });
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


  async bulkGet(ids, allowed_fields) {
    console.log('\n\n --------------------- REPO ids, allowed_fields')
    console.log(ids, allowed_fields)
    return await knex(this.table).select(allowed_fields).whereIn('id', ids);
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


