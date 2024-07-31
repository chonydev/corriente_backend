//const knex = require('../config/database');

//const knex = require('../config/knex-config')

//import knex from 'knex';  // without access to a ddb
import knex from "../config/knex_config.js";    // using db

const politicalPartyService = {
  async getAllPoliticalParties() {
    return await knex('political_parties').select('*');
  },
  
  async getPoliticalPartyById(id) {
    return await knex('political_parties').where({ id })
  },

  async createPoliticalParty(politicalPartyData) {
    const [id] = await knex('political_parties').insert(politicalPartyData).onConflict().doNothing().returning('id');
    return await this.getPoliticalPartyById(id);
  },

  async updatePoliticalParty(id, politicalPartyData) {
    await knex('political_parties').where({ id }).update(politicalPartyData);
    return await this.getPoliticalPartyById(id);
  },

  async deletePoliticalParty(id) {
    return await knex('political_parties').where({ id }).del();
  }
};

//module.exports = politicalPartyService;

export default politicalPartyService

