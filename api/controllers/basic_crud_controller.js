//import BasicCRUDService from '../../services/basic_crud_service.js';

export default class BasicCRUDController {
  BasicCRUDService;
  constructor(basic_crud_service) {
    this.BasicCRUDService = basic_crud_service;
  }

  getAll = async (req, res) => {
    //^ logs_req(req)
    try {
      const items = await this.BasicCRUDService.getAll();
      if (!items.length) {
        console.log('\nitem controller err');
        return res.status(404).json({ message: 'Items not found' });
      }
      res.json(items);
    } catch (err) {
      //res.status(500).json({ message: err.message });
      next(err)
    }
  }

  //async getById(req, res, next) {
   getById = async (req, res, next) => {
    try {
      const item = await this.BasicCRUDService.getById(req.params.id);

      if (!item.length) {
        return res.status(404).json({ message: 'Item by id not found' });
      }
      res.json(item);
    } catch (err) {
      next(err);
      //res.status(500).json({ message: err.message });
    }
  }

  create = async (req, res, next) => {
    if (!req.body) { return res.status(400).json({ message: 'Value not inserted' }) };
    try {      
      const newItem = await this.BasicCRUDService.create(req.body);
      //^ one
      if (!newItem.length) return res.status(409).json({ message: 'Item not added' });
      res.status(201).json(newItem);
    } catch (err) {
      console.log('\nitem controller err');
      next(err);
  //    res.status(500).json({ message: err.message });
    }
  }

  update = async (req, res, next) => {
    try {      
      const editedItem = await this.BasicCRUDService.update(req.body.id, req.body);
      if (!editedItem.length) return res.status(409).json({ message: 'Item not edited.' });
      res.status(201).json(editedItem);
    } catch (err) {
      console.log('\nitem controller err');
      next(err);
  //    res.status(500).json({ message: err.message });
    }
  }

  delete = async (req, res, next) => {
    //if (!req.body.id) { return res.status(400).json({ message: 'Id not inserted' }) };
    try {
      const deletedItem = await this.BasicCRUDService.delete(req.body.id, req.body);
      if (!deletedItem.length) return res.status(409).json({ message: 'Item not deleted. ' });
      res.status(201).json(deletedItem);
    } catch (err) {
      console.log('\nitem controller err');
      next(err);
  //    res.status(500).json({ message: err.message });
    }
  }

  // ------------------------------------------------
  // ------------------------ Bulk queries
  // ------------------------------------------------


  bulkGet = async (req, res, next) => {
    try {
      const item = await this.BasicCRUDService.getById(req.params.id);

      if (!item.length) {
        return res.status(404).json({ message: 'Item by id not found' });
      }
      res.json(item);
    } catch (err) {
      next(err);
      //res.status(500).json({ message: err.message });
    }
  }

  bulkCreate = async (req, res, next) => {}

    bulkUpdate = async (req, res, next) => {}

    bulkDelete = async (req, res, next) => {}
};

