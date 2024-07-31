import express from 'express'
//const express = require('express');

const PORT = process.env.PORT || 3001;
//const cors = require('cors')

const app = express();

app.use(express.json()); // For parsing application/json

//require('./config/routes-config')(app)


import routes from './config/routes_config.js';
try {
    routes(app);
}
catch(err) {
    console.log(err)
}



//import {DEVENV} from './constants/knex_const.cjs';
//console.log(DEVENV)
  
if (process.platform == "win32") {
    app.listen(PORT, () => {
        console.log(`Detectado Sistema Operativo: win32`);
        console.log(`Iniciando el servidor api ${PORT}`);
    });
} else {
    /*
    const options = {
        key: fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`), //! esta ruta hay que cambiar
        cert: fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`),
        ca: fs.readFileSync(`/etc/letsencrypt/live/${domain}/chain.pem`),
    };
    https.createServer( app).listen(PORT, function() {
        console.log("Iniciado el server en " + PORT);
        });
        */
   console.log(`No detectado Sistema Operativo: win32.\n Posiblemente Linux.`);
}