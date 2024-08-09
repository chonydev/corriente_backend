import knex from "../../config/knex_config.js";
import BasicCRUDRepo from "./basic_crud_repository.js";

export default class UserRepo extends BasicCRUDRepo {
  async getByUsername(value) {
    console.log(value)
    console.log(this.table)
    return await knex(this.table).where({ username: value }).first(); //  .orWhere({ email: });

  }

}