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
                    else {
                        let res = resultado.map(ele => ({ 
                            id:ele.id,
                            nombre:ele.nombre,
                            description:ele.description,
                            imagen:ele.imagen,
                            precio:ele.precio
                        }))
                        callback(null, res)
                    }
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
                    else if (!resultado.length) callback(null,resultado)
                    else {
                        let res = {
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            description:resultado[0].description,
                            imagen:resultado[0].imagen,
                            precio:resultado[0].precio,
                        }
                        callback(null, res)
                    }
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
                    else if (resultado.length===0) callback(new Error("Unexistent destiny","The destiny you are trying to select isnt available or doesn't exist"),null)
                    else callback(null, resultado[0].id)
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

    findCarouselById(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT imagen FROM carousel WHERE destino_id = ?"
                connection.query(stringQuery, id, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,  resultado.map(ele => ele.imagen))
                })
            }
        })
    }
    createUser(user,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO usuarios (nombre,apellidos,correo,contrasena) VALUES (?,?,?,?)"
                connection.query(stringQuery, Object.values(user), (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        let id = resultado.insertId
                        callback(null, id)
                    }
                })
            }
        })
    }

    findByMail(mail,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM usuarios WHERE correo = ?"
                connection.query(stringQuery, mail, (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback(null, null)
                        else {
                            let res = {
                                id:resultado[0].id,
                                nombre:resultado[0].nombre,
                                apellido1:resultado[0].apellido,
                                correo:resultado[0].correo,
                                contrasena:resultado[0].contrasena,
                            }
                            callback(null, res)
                        }
                    }
                })
            }
        })
    }
}
module.exports = DAO