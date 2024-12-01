require('dotenv').config();

/*
import dotenv from 'dotenv';
dotenv.config();

export default EMAIL_CONSTANTS;
*/

const EMAIL_CONSTANTS = {

    API_KEY: process.env.EMAIL_API_KEY,
    SENDER: process.env.EMAIL_SENDER,

    /*
    > Azure
            EMAIL: process.env.EMAIL,
            PASSWORD: process.env.EMAIL_PASSWORD,

            CLIENT_ID: process.env.EMAIL_CLIENT_ID,
            TENANT_ID: process.env.EMAIL_TENANT_ID,
            SECRET_KEY: process.env.EMAIL_SECRET_KEY
    */
        };

module.exports = EMAIL_CONSTANTS