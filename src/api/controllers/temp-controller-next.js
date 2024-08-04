//import BasicCRUDService from '../../services/basic_crud_service.js';

export default class BasicCRUDController {
  BasicCRUDService;
  constructor(basic_crud_service) {
    this.BasicCRUDService = basic_crud_service;
}

  async getAll(req, res, next) {
    logs_req(req)
    try {
      const items = await this.BasicCRUDService.getAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await this.BasicCRUDService.getById(req.params.id);
      if (!item) {
        console.log('\nitem controller err');
        return res.status(404).json({ message: 'Item by id not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    if (!req.ppname) { return res.status(400).json({ message: 'Value not inserted' }) };

    try {
      const newItem = await this.BasicCRUDService.createPoliticalParty(req.body);

      if (!newItem) return res.status(409).json({ message: 'El registro ya existe' });

      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }


};