// El error (a parte de algunos errores sintacticos en esta clase) 
// era que el constructor del DAO se declara con "constructor" 
// y no con la sintaxis de java :)
const mysql= require("mysql")
const DAO = require("./DAO.js")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"ej2"
})

const midao = new DAO(pool)

midao.getNames()