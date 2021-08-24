const express = require('express');
const path = require('path');
const app = express();

//Levanto la app localmente en el port 3000 o con el port que me asigne Heroku
app.listen(process.env.PORT || 3000, () => {
    console.log('Webserver levantado, corriendo y escuchando en el port 3000');
});

//Va a servir los archivos publicos desde /img (esta es su raíz)
app.use(express.static(path.join(__dirname, 'public')));

//Seteos de endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});