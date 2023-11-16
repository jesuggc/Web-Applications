const sql = require("mysql")

class DAO {
    constructor(host, user, password, database,port) {
        this.pool = sql.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port
        })
    }

    findQueco(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_usu_usuarios"
                connection.query(stringQuery, function (err, resultado) {
                    if (err) callback(err, null)
                    else {
                        callback(null, resultado)
                    }
                })
            }
        })
    }

    findByMail(mail,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_usu_usuarios WHERE correo = ?"
                connection.query(stringQuery, mail, (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        let res = {
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            apellido1:resultado[0].apellido1,
                            apellido2:resultado[0].apellido2,
                            correo:resultado[0].correo,
                            contrasena:resultado[0].contrasena,
                        }
                        callback(null, res)
                    }
                })
            }
        })
    }

    
}
module.exports = DAO