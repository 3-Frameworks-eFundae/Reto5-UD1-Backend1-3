const express = require('express');
const json = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const app = express();
const port = 3000;

app.use(json());

let usuarios = [
    { id: 1, nombre: 'Juan', email: 'juan@gmail.com' }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/index.html'));
})

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let usuario = usuarios.filter(usuario => usuario.id === id)

    if (usuario.length == 1)
        res.status(200).json(usuario)
    else
        res.status(404).json({ "Mensaje": `No se ha encontrado el usuario con id ${id}` });
});


app.post('/usuarios', jsonParser, (req, res) => {
    const { id, nombre, email } = req.body
    let nuevoUsuario = { id: id, nombre: nombre, email: email }
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', jsonParser, (req, res) => {
    let idURL = parseInt(req.params.id)
    const { nombre, email } = req.body
    let usuario = usuarios.filter(usuario => usuario.id === idURL)

    if (usuario.length == 1) {
        usuario[0].nombre = nombre;
        usuario[0].email = email;
        res.json(usuario[0])
    } else
        res.status(404).json({ "Mensaje": `No se ha encontrado el usuario con id ${idURL}` });

});

app.delete('/usuarios/:id', (req, res) => {
    let idURL = parseInt(req.params.id)
    let usuario = usuarios.filter(usuario => usuario.id === idURL)
    if (usuario.length == 1) {
        let nuevaListaUsuarios = usuarios.filter(usuario => usuario.id !== idURL)
        usuarios = nuevaListaUsuarios;
        res.json({ "Mensaje": `Se ha eliminado el usuario con id ${idURL}` });
    } else
        res.status(404).json({ "Mensaje": `No se ha encontrado el usuario con id ${idURL}` });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});