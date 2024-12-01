import UserController from '../controllers/user_controller.js';
import UserRepo from '../repositories/user_repository.js';
import UserService from '../services/user_service.js';
import BasicRouter from './basic_crud_validator_router.js';
import { comparePassword, hashPassword } from '../../utils/auth.js';

//import BasicRouter from './BasicRouter';
//import { loginValidator } from '../middlewares/validators/userValidator';
//const v = await hashPassword('adpassword')
//console.log(v)
/*                                                   
const isMatch = await comparePassword('adpassword', '$2b$10$k055eFmx/II9MU76pSqR1OyMJwzG5VxsJNEyItSKStWYXIPJV9Uau');
console.log(isMatch)
*/

export default class UserRouter extends BasicRouter {
  constructor(tableName, mainProp) {
    super(tableName, mainProp);
  }
  setupRouter() {
    //console.log(this)
    super.setupRouter();
    /*
    console.log(this.service)
    //console.log(this.router.stack)
    //const userController = new UserController(this.service);
    console.log('\n\nthis.service')
    console.log(this.controller)
    console.log('\n\nthis.controller post')
        //console.log(this.controller)
*/
    this.repository = new UserRepo(this.tableName);
    this.service = new UserService(this.repository);
    this.controller = new UserController(this.service);

    this.router.post('/login', this.controller.login);
    this.router.post('/signup', this.controller.signup);
    
    this.router.get('/tokenVerification', this.controller.tokenVerification);//^ change to post
    
    this.router.post('/password_reset', this.controller.passwordReset);
    /*
    */
  }
}

