//import api from '../constants/api-const';

import f3 from '../api/routes/political_parties_routes.js';
import apiConfig from "../constants/api_const.js";

console.log(apiConfig.urlapi)


export default (app) => {
    f3(app);
  };





