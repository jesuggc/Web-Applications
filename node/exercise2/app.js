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
    nombre: "Marcos",
    correo: "marcugo11@ucm.es",
    telefono: "659095541"
}

midao.insertarUsuario(usuario)
pool.end();
