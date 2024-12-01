import RBAC from 'easy-rbac';

export default class Authorizator {
  tableName;
  rbac;
  schemas;

  constructor(tableName, schemas) {
    this.tableName = tableName;
    this.schemas = schemas;
    const authorizationSchema = this.selector(tableName);
    this.rbac = new RBAC(authorizationSchema);
  }

  selector(tableName) {
    return this.schemas[tableName] || {};
  }

  authoMw = async (req, res, next) => {
    const accountRole = req.user.accountRole;
    let operation = req.method.toLowerCase();
    let path = req.route.path;
    //> possible values:
    /*
    get
      get
      get byid
      get bulk
    put...?
    post...?
    delete...?
    */

    if (path.includes('byid')) { operation += ':byid' }
    if (path.includes('bulk')) { operation += ':bulk' }
    if (req.url === '/') { operation += ':' }
    console.log('\n\n\n --------------  authorizator authoMw -----------------------');

    const is_used_req_body = ['create', 'update', 'bulk'].some(value => operation.includes(value))

    const id_requester = Number(req.user.userId)
    let id_requested;

    //^ only one requested id? split into single vs several id requested or is not neccessary??
    if (is_used_req_body) {
      id_requested = Number(req.body.id)
    } else {
      id_requested = Number(req.params.id)
    }
    /*
    console.log(req.params.id)
    console.log(req.user.userId == req.params.id)
    
    console.log(req.body, req.params) // body empty   req.params {id:4   
    console.log(id_requester, id_requested) //4 nan
    console.log(req.user.userId) //4

    */

    console.log('is_used_req_body')
    console.log(is_used_req_body)
    console.log('req.user')
    console.log(req.user)
    console.log('accountRole, operation')
    console.log(accountRole, operation)

    try {

      const permission = await this.rbac.can(accountRole, operation, {
        //> context needed for the `when` function
        id_requested: id_requested,//req.params.id,
        id_requester: id_requester//^  req.user,
      });
      console.log(' -------------------------------- permission result CHECKING')
      console.log(permission)
      if (!permission) {
        res.sendStatus(403);
      }


      req.user['allowedFields'] = permission.fields
      console.log('-------------- from authorizator req.user and body');
      console.log(req.user)
      console.log(req.body)
      next();

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getFieldsFromSchema(role, operation) {
    const rolePermissions = this.schemas[this.tableName][role];
    /*
    console.log('rolePermissions getfieldsfromschema')
    console.log(!rolePermissions)
    console.log(rolePermissions)
    const rolePermissions2 = this.schemas[this.tableName]['user'];
    console.log(rolePermissions2)
    console.log(rolePermissions2.can[3].fields)
    */
    if (!rolePermissions) return null;

    const permission = rolePermissions.can.find(p =>
      (typeof p === 'string' && p === 'get') ||
      (typeof p === 'object' && p.name === 'get')
    );
    /*
    
    console.log('permission afeter null')
    console.log('permission')
    console.log(permission)
    console.log(typeof permission)
    console.log(permission.prototype)
    
    */
    /*
     console.log(rolePermissions.can.find(p => console.log(p)))
 */
    return permission && typeof permission === 'object' ? permission.fields : null;
  }


  filterObject(obj, allowedFields) {
    return Object.keys(obj)
      .filter(key => allowedFields.includes(key))
      .reduce((filteredObj, key) => {
        filteredObj[key] = obj[key];
        return filteredObj;
      }, {});
  }
}




/*

   // Filter response data for GET requests
    const originalJson = res.json;
    res.json = function (data) {
      if (Array.isArray(data)) {
        data = data.map(item => this.filterObject(item, allowedFields));
      } else {
        data = this.filterObject(data, allowedFields);
      }
      originalJson.call(this, data);
    };
  }
*/