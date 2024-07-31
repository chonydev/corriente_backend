//import BasicCRUDService from '../../services/basic_crud_service.js';

export default class BasicCRUDController_wnext {
  BasicCRUDService;
  constructor(basic_crud_service) {
    this.BasicCRUDService = basic_crud_service;
  }

  getAll = async (req, res) => {
    logs_req(req)
    try {
      const items = await this.BasicCRUDService.getAll();

      if (!items[0]) {
        console.log('\nitem controller err');
        return res.status(404).json({ message: 'Item by id not found' });
      }
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
      //next(err)
    }
  }

  //async getById(req, res, next) {
   getById = async (req, res) => {
    try {
      const item = await this.BasicCRUDService.getById(req.params.id);

      if (!!item) {
        return res.status(404).json({ message: 'Item by id not found' });
      }
      res.json(item);
    } catch (err) {
  //      next(err);
      res.status(500).json({ message: err.message });
    }
  }
  create = async (req, res) => {
    if (!req.ppname) { return res.status(400).json({ message: 'Value not inserted' }) };

    try {
      const newItem = await this.BasicCRUDService.createPoliticalParty(req.body);

      if (!newItem) return res.status(409).json({ message: 'El registro ya existe' });

      res.status(201).json(newItem);
    } catch (err) {
  //    next(err);
      res.status(500).json({ message: err.message });
    }
  }


};