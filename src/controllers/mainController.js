const path = require('path');

const controller = {
    index: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/index.html')); como ahora usamos EJS, esto deja de tener sentido, se usa lo que sigue
        return res.render('index');
    },
    registro: (req, res) => {
        return res.render('registro');
    },
    ingreso: (req, res) => {
        return res.send('Ingreso');
    },
};

module.exports = controller;