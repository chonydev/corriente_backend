require('dotenv').config();
//import dotenv from 'dotenv';
//dotenv.config(); 
    

const DEVENV = {
    development: {
        client: 'mysql2',
        connection: {
             // -------------------------------------- DEV CONFIG
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
             host: 'localhost',  // default
             port: 3306, // default
             //debug:true,
            /// -------------------------------------- 

            /* -------------------------------------- PROD CONFIG
            */// -------------------------------------- 
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
        },
        seeds: {
            directory: __dirname + '/knex/seeds'
        }
        // S3_URL: 'https://bebe-bucket.s3.us-east-2.amazonaws.com'
    }
}

//export default DEVENV;
module.exports = {DEVENV}