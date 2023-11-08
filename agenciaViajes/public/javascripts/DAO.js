const sql = require("mysql")

class DAO {
    constructor(host, user, password, database) {
        this.pool = sql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }


    listAll(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM destinos"
                connection.query(stringQuery, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null, resultado)
                })
            }
        })
    }

    findDestinoByNombre(nombre, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM destinos WHERE nombre = ?"
                connection.query(stringQuery, nombre, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null, resultado)
                })
            }
        })
    }

    readIdByName(nombre, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT id FROM destinos WHERE nombre = ?"
                connection.query(stringQuery, nombre, function (err, resultado) {
                    if (err) callback(err, null)
                    else {
                        let id = resultado[0].id

                        callback(null, id)
                    }
                })
            }
        })
    }

    createReserva(destino, reserva, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO reservas (destino_id, nombre_cliente, correo_cliente, fecha_reserva) VALUES (?, ?, ?, ?)";
                connection.query(stringQuery, [destino, reserva.nombre, reserva.correo, reserva.fecha], function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null, resultado.insertId)
                })
            }
            connection.release();
        })
    }
    
    prueba(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT codigo FROM informacion where id = 1";
                connection.query(stringQuery, function (err, resultado) {
                    let resultadoDeEjemplo1 = "<h1> Hola </h1> <p> Tengo una estructura </p>"
                    let resultadoDeEjemplo2 = "<h2> Yo </h2> <h2> Tengo una estructura completamente distinta y dificilmente generalizable </h2>"
                    if (err) callback(err, null)
                    else callback(null, {resultado:resultadoDeEjemplo1})
                })
            }
            connection.release();
        })
    }
}
module.exports = DAO