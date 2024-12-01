import express from 'express'
const PORT = process.env.PORT || 3001;
import cors from 'cors';
import wrapperRouter from "./src/api/routes/main_route.js"
import API_CONFIG from './src/constants/api_const.js';

const app = express();

const CORS_CONFIG = {
    origin: 'http://localhost:4200'
}

app.use(cors(CORS_CONFIG));


app.use(express.json());
app.use(`${API_CONFIG.urlapi}`, wrapperRouter)
 
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