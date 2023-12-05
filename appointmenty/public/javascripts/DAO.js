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

    getFacultades(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_fac_facultades"
                connection.query(stringQuery, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({ id: ele.id, nombre: ele.nombre })))
                })
            }
        })
    }

    getGrados(idFacultad, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_gra_grados WHERE idFacultad = ?"
                connection.query(stringQuery, idFacultad, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({nombre: ele.nombre, dobleGrado: ele.dobleGrado})))
                })
            }
        })
    }

    checkEmail(correo, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_usu_usuarios WHERE correo = ?"
                connection.query(stringQuery, correo, (err, resultado) => {
                    if (err) callback(err)
                    else if (resultado.length === 0) callback("El correo no esta asociado a ninguna cuenta")
                    else {
                        let user = { 
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            apellido1:resultado[0].apellido1,
                            apellido2:resultado[0].apellido2,
                            correo:resultado[0].correo
                        }
                        callback(null, user)
                    } 
                })
            }
        })
    }

    getRequests(callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_usu_usuarios WHERE verificado = 0"
                connection.query(stringQuery, (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback()
                    else {
                        callback(null, resultado.map(ele => ({  
                            id:ele.id,
                            nombre:ele.nombre,
                            apellido1:ele.apellido1,
                            apellido2:ele.apellido2,
                            correo:ele.correo,
                            verificado:ele.verificado,
                            admin:ele.admin
                        })))
                    }
                })
            }
        })
    }
            
    checkUser(correo, contrasena, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_usu_usuarios WHERE correo = ? AND contrasena = ?"
                connection.query(stringQuery, [correo, contrasena], (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback()
                    else {
                        let user = { 
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            apellido1:resultado[0].apellido1,
                            apellido2:resultado[0].apellido2,
                            correo:resultado[0].correo,
                            verificado:resultado[0].verificado,
                            admin:resultado[0].admin
                        }
                        callback(null, user)
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
                        if (resultado.length === 0) callback(null, null)
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
                    }
                })
            }
        })
    }

    createUser(user,callback) {
            this.pool.getConnection((err, connection) => {
                if (err) callback(err, null)
                else {
                    let stringQuery = "INSERT INTO ucm_aw_riu_usu_usuarios (nombre,apellido1,apellido2,correo,contrasena) VALUES (?,?,?,?,?)"
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
    }
module.exports = DAO