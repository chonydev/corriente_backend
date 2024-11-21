import jwt from "jsonwebtoken";
import { comparePassword, generateToken, hashPassword, verifyToken } from "../../utils/auth.js";
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
      //> -----------
      const item = await this.BasicCRUDService.getByUsername(username);
      if (!item) { //^ prior !item.id ; it must be id in item?
        return res.status(404).json({ message: 'Item by username not found' });
      }
      //     const item = this.getById(id)
      //> -----------
      const isMatch = await comparePassword(password, item.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      //> ----------- 
      //^ which code inside switch and which outside of it ?
      //^let token;
      // 'active', 'deleted', 'banned', 'pending'
      switch (item.accountState) {
        case 'pending':
          res.status(500).json({ message: 'User pending - PENDING implementation' });
          break
        case 'active':
          //> -----------
          //^ payload token associated
          //^ TS type LoginPayload = Pick<User, 'id' | 'email' | 'accountRole' | 'accountState'| 'email'>
          const payload = {
            userId: item.id, userEmail: item.email,
            accountRole: item.accountRole, accountState: item.accountState
          }; //{userId: item.id}
          const token = await generateToken(payload) // jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
          const tokenDecrypted = await verifyToken(token)
          console.log(tokenDecrypted)
          const deltaExpMs = (tokenDecrypted.exp - tokenDecrypted.iat) * 1000 //^ miliseconds used in settimeout
          //?res.json({ token: token, deltaExpMs: deltaExpMs, id: item.id }); 
          res.json({...payload, token: token, deltaExpMs: deltaExpMs, id: item.id }); 
          //^ date: Date.now() / 1000; new Date(); token.iat;
          //^ in order to cumply with frontend and run a test //^ why full item was before fe requirements??
          //> -----------
          break
        case 'deleted':
          res.status(500).json({ message: 'User deleted - PENDING implementation' });
          break
        case 'banned':
          res.status(500).json({ message: 'User banned - PENDING implementation' });
          break
        default:
          res.status(500).json({ message: 'User state case error' });
          break
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  signup = async (req, res, next) => {

    const { username, password } = req.body;

    try {
      //> -----------
      console.log(username, password);
      const item = await this.BasicCRUDService.getByUsername(username);
      console.log(item);
      if (!!item && item.constructor.name === 'Object') {
        //if ('id' in item && !!item[id]) {
        return res.status(409).json({ message: 'User name already in use' });
      }
      //> -----------

      const hashedPassword = await hashPassword(password)

      //> ----------- same as create but without middlewares
      //^ plain object only pass changed (JSON method change certain data type like date)
      //let bodyDeepCopy = JSON.parse(JSON.stringify(req.body));
      const input = req.body;
      input['password'] = hashedPassword;
      console.log('\n\n---------input from user controller signup');
      console.log(input);

      try {
        const newItem = await this.BasicCRUDService.create(input);
        //^ one
        console.log('newItem');
        console.log(newItem);
        if (!newItem.length) return res.status(409).json({ message: 'User not created' });
        res.status(201).json(newItem);
      } catch (err) {
        res.status(500).json({ message: err.message });
        //next(err);
      }
      //> -----------

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  tokenVerification = async (req, res, next) => {
    //const result = verifyToken(req.user.token);

    const token = req.headers.authorization.slice(7)
    if (token == null) return res.sendStatus(401); //^ add to catch 401 ??
    try {
      const result = verifyToken(token);
      if (Object.keys(result).length > 0) {
        res.status(200).json(true);
      }
      next(); 
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) { //|| token == null) {
        return res.status(401).json({ message: 'Token expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }



  //^ delete token from frontend
  logout = async (req, res, next) => {
    /*
      console.log('\n---------------')
      console.log()
      const {id} = req.user.userId
      try {
        try {
          
        res.status(201).json(newItem);
      } catch (err) {
            res.status(500).json({ message: err.message });
            //next(err);
          }
      //> -----------

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      */
  }




}

