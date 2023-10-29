const mysql= require("mysql")
const DAO = require("./DAO.js")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"ej2"
})


const midao = new DAO(pool)

// midao.getNames()

let usuario = {
    id:3,
    nombre: "Joaquin",
    correo: "marcugo11@ucm.es",
    telefono: "659095541"
}

// midao.insertarUsuario(usuario)
// midao.enviarMensaje(3,1,"hola Joaquin, soy yo otra vez")
// midao.bandejaEntrada(usuario)

function fc_buscarUsuario(err,usuarios) {
    if (err) console.log('Error en la búsqueda:', err);
    else console.log('Usuarios encontrados:', usuarios);    
}
midao.buscarUsuario("a", fc_buscarUsuario);
