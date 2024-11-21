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
    if (path.includes('byid')) { operation += ':byid' }
    if (path.includes('bulk')) { operation += ':bulk' }

    console.log('\n\n\n --------------  authorizator authoMw -----------------------');

    const is_used_req_body = ['create', 'update', 'bulk'].some(value => operation.includes(value))
    
    const id_requester = Number(req.user.userId)
    let id_requested;
    if(is_used_req_body) {
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
    console.log(is_used_req_body)
    
   console.log(req.user)
   console.log(accountRole, operation)

    try {
      const permission = await this.rbac.can(accountRole, operation, {
        //> context needed for the `when` function
        id_requested: id_requested,//req.params.id,
        id_requester: id_requester//^  req.user,
      });

      console.log(permission)
      if (!permission) {
        res.sendStatus(403);
      }

      let allowedFields;
      if (typeof permission === 'object' && permission.fields) {
        allowedFields = permission.fields;
      } else if (typeof permission === 'boolean' && permission) {
        //> If permission is just true, fetch the fields from the schema
        allowedFields = this.getFieldsFromSchema(accountRole, operation);
      }
      console.log(' -------------- from authorizator allowedfields');
      console.log(allowedFields)
      /*
      ^ im using the req.user to pass in allowed fields 
      ^ instead of constrain frontend it could be possible to let pass and filter in backend
      if (allowedFields) {
        //> Filter request body (or response data based on allowed fields) 
        //> OR send fields and use them in repo select query
        const is_used_req_body = !['create', 'update', 'bulk'].some(value => operation.includes(value))
        //> doesn't modify req.body in cerain cases
        if(is_used_req_body) {
          console.log(this.filterObject(req.body, allowedFields))
          //console.log(Object.keys(this.authoMw.prototype))
          req.body = this.filterObject(req.body, allowedFields)
          console.log(' -------------- from authorizator req.body');
          console.log(req.body)
        }
      }
      //^ get case: it could be changed the res object (i don't see the benefit)
      */
      req.user['allowedFields'] = allowedFields
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
    if (!rolePermissions) return null;

    const permission = rolePermissions.can.find(p => 
      (typeof p === 'string' && p === operation) || 
      (typeof p === 'object' && p.name === operation)
    );

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