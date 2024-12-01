

const user_fields_over_oneself = [
  'id', //^ enhance security: mask the value ( i left for frontend management ease)
  'username', //< visible
  //'password',
    'createdFrom',  //< visible
    'accountState', //< visible
    'accountRole',  //< visible
  'firstName',  //< visible
  //^ ------------------------------ visibility
  'lastName',
    'dni',  //^ check availability
    'email',  //^ check availability
  'birthDate',  
  'phoneLandline',  
  'phoneMobile',
  'adressStreet',
  'adressHouseNumber',
  'adressFloor',
  'adressApartment',
  'localidadId',
  'affiliated',  
  //^ ------------------------------ visibility
  'militancyGroup', //< visible
  'politicalParty', //< visible
  'sectionalId',
  'job',
  'studies'
  ]
  
  const user_fields_over_other_user = [
    'id',
    'username',
    'accountState',
    'accountRole',
    'firstName',
    'createdFrom',
    'militancyGroup',
    'politicalParty'
  ]
  


  const baseSchema = {
    user: { 
      can: ['get', 'get:byid']
    },
    mod: {
      can: [],
      inherits: ['user']
    },
    admin: {
      can: ['*'],
      inherits: ['mod']
    }
  };
    

const authorizator_schemas = {
  users: {
    user: {
      can: [//['get:byid', 'put', 'get:bulk'] //^ put almost all props ; get fields constraint over others
        'post:login'
        ,
        {
          name: 'get:byid',
          when: async (params) => {
            if (params.id_requested === params.id_requester) { //^.userId) {
              console.log('\n ------------------------ params.id === params.session.userId)')
              return { fields: user_fields_over_oneself }
            } else {
              return { fields: user_fields_over_other_user };
            }
          }
        },
        {
          name: 'put',
          when: async (params) => {
            if(params.id_requested === params.id_requester) {
              return user_fields_over_oneself.filter(e => !['accountState', 'accountRole', 'createdFrom'].includes(e))
            }  // user over itself
          }
          /*
          user_fields_over_oneself.map(field5 =>
            !['accountState', 'accountRole', 'createdFrom'].includes(field) ? field : null
          )
            */
        },
        {
          name: 'get:',
          when: async () => ({ fields: user_fields_over_other_user})
          //fields: user_fields_over_other_user
          },

          //^ when it could be used this get:bulk by a user?
        /*
        {
          name: 'get:bulk',
          when: () => true,
          fields: user_fields_over_other_user
        }
          */

      ]
    },
      mod: {
        can:[

  
        ],
        inherits: ['user']
      },
      admin: {
        can: [
          {
            name:'get:byid',
            when: () => ({ fields:  user_fields_over_oneself}),
            //fields: user_fields_over_oneself//user_fields_over_oneself.filter(e => !['password'].includes(e))
          },
          {
            name:'put', // accountState and role
            when: () => true,
            fields: user_fields_over_oneself.filter(prop => ['accountState', 'accountRole'].includes(prop))
          },
           'delete:byid', 
           'get:bulk',  // ; get fields constraint over others (user get + st else)     ; //^ password !!!
           'put:bulk', 'delete:bulk'],
        inherits: ['mod']
    }
  },
  political_parties: baseSchema,
  sectionals: baseSchema,
  jobs: baseSchema,
  studies: baseSchema,
  militancy_groups: baseSchema,
};

/*
 'get', 'post', 'put', 'get:byid', 'delete:byid', 
 'get:bulk', 'post:bulk', 'put:bulk', 'delete:bulk'
  get:*  delete:*

    user: {
      can: []
    },
    mod: {
      can:[],
      inherits: ['user']
    },
    admin: {
      can: [],
      inherits: ['mod']
    }

    users
      political_parties
  sectionals
  jobs
  studies
  militancy_groups

*/

export default authorizator_schemas;