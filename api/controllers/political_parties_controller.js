//const politicalPartyService = require('../../services/political_parties_service');
import politicalPartyService from '../../services/political_parties_service.js';

//? OLDER

const politicalPartyController = {
  async getAllPoliticalParties(req, res, next) {
    logs_req(req)
    try {
      const politicalParties = await politicalPartyService.getAllPoliticalParties();
      res.json(politicalParties);
    } catch (error) {
      next(error);
    }
  },

  async getPoliticalPartyById(req, res, next) {
    try {
      const politicalParty = await politicalPartyService.getPoliticalPartyById(req.params.id);
      console.log('\npoliticalParty object retrieved by service (knex)');
      console.log(!politicalParty);
      if (!politicalParty.length) {
        console.log('\npoliticalParty controller err');
        return res.status(404).json({ message: 'Political Party not found' });
      }
      res.json(politicalParty);
    } catch (error) {
    }
    next( error);
  },

  async createPoliticalParty(req, res, next) {
    if (!req.ppname) { return res.status(400).json({ message: 'Se requiere campo Name'}) };
  
      try {
      const newPoliticalParty = await politicalPartyService.createPoliticalParty(req.body);
      
      if(!newPoliticalParty)  return res.status(409).json({ message: 'El registro ya existe' });

      res.status(201).json(newPoliticalParty);
    } catch (error) {
      next(error);
    }
  }


};

//module.exports = politicalPartyController;
export default politicalPartyController