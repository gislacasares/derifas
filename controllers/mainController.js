const path = require('path');

const controller = {
    index: (req, res) => {
        //return res.send('Home'); //Acá simplemente envio un texto
        res.sendFile(path.join(__dirname, '../views/index.html'));
    },
    registro: (req, res) => {
        return res.send('Registro');
    },
    ingreso: (req, res) => {
        return res.send('Ingreso');
    },
};

module.exports = controller;