import express from 'express'
const PORT = process.env.PORT || 3001;
//const cors = require('cors')
import wrapperRouter from "./src/api/routes/main_route.js"
import apiConfig from './src/constants/api_const.js';

const app = express();
app.use(express.json());
app.use(`${apiConfig.urlapi}`, wrapperRouter)
 
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