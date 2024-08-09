import { comparePassword, generateToken } from "../../utils/auth.js";
import BasicCRUDController from "./basic_crud_controller";
//import {JWT_SECRET}

export default class UserController extends BasicCRUDController {
  /*
  constructor(inherited_service) {
    super(inherited_service);
  }*/
  login = async (req, res, next) => {

    //> -----------
    const { username, password } = req.body;
    //> -----------
    //const item = this.getById()
    try {
      //console.log(this)
      //console.log(this.BasicCRUDService.getById)
      /*
      console.log(service)
      console.log(username)
      */
      console.log(req.body)

      const item = await this.BasicCRUDService.getByUsername(username);
      if (!item.id) {
        return res.status(404).json({ message: 'Item by id not found' });
      }
      //     const item = this.getById(id)
      //> -----------
      const isMatch = await comparePassword(password, item.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      const payload = { userId: item.id, userEmail: item.email, userRole: item.accountRole }; //{userId: item.id}
      const token = await generateToken(payload) // jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      //> -----------
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


}



