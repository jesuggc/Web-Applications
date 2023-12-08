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
//FACULTADES
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
//USUARIOS
    getStudentsByFacId(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.correo, u.verificado, u.admin, u.curso, f.nombre as nombreFacultad, g.nombre as nombreGrado FROM ucm_aw_riu_usu_usuarios as u JOIN ucm_aw_riu_fac_facultades as f ON u.facultad = f.id JOIN ucm_aw_riu_gra_grados AS g ON u.grado = g.id WHERE u.facultad = 20 AND u.verificado=1"
                connection.query(stringQuery, id,(err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback(null,null)
                    else {
                        callback(null, resultado.map(ele => ({  
                            id:ele.id,
                            nombre:ele.nombre,
                            apellido1:ele.apellido1,
                            apellido2:ele.apellido2,
                            correo:ele.correo,
                            verificado:ele.verificado,
                            admin:ele.admin,
                            facultad:ele.nombreFacultad,
                            grado:ele.nombreGrado, 
                            curso:ele.curso
                        })))
                        
                    }
                })
            }
        })
    }
    
    checkEmail(correo, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT id FROM ucm_aw_riu_usu_usuarios WHERE correo = ?"
                connection.query(stringQuery, correo, (err, resultado) => {
                    if (err) callback(err)
                    else if (resultado.length === 0) callback("El correo no esta asociado a ninguna cuenta")
                    else callback(null, {user:resultado[0].id})
                })
            }
        })
    }

    getVerifiedUsers(callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.correo, u.admin, u.curso, f.nombre as nombreFacultad, g.nombre as nombreGrado FROM ucm_aw_riu_usu_usuarios as u JOIN ucm_aw_riu_fac_facultades as f ON u.facultad = f.id JOIN ucm_aw_riu_gra_grados AS g ON u.grado = g.id WHERE verificado = 1 AND admin=0"
                connection.query(stringQuery, (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback(null,null)
                    else {
                        callback(null, resultado.map(ele => ({  
                            id:ele.id,
                            nombre:ele.nombre,
                            apellido1:ele.apellido1,
                            apellido2:ele.apellido2,
                            correo:ele.correo,
                            admin:ele.admin,
                            facultad:ele.nombreFacultad,
                            grado:ele.nombreGrado, 
                            curso:ele.curso
                        })))
                        
                    }
                })
            }
        })
    }
    createUser(user,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO ucm_aw_riu_usu_usuarios (nombre,apellido1,apellido2,correo,contrasena,facultad,grado,curso) VALUES (?,?,?,?,?,?,?,?)"
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
    getRequests(callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.correo, u.admin, u.curso, f.nombre as nombreFacultad, g.nombre as nombreGrado FROM ucm_aw_riu_usu_usuarios as u JOIN ucm_aw_riu_fac_facultades as f ON u.facultad = f.id JOIN ucm_aw_riu_gra_grados AS g ON u.grado = g.id WHERE verificado = 0"
                connection.query(stringQuery, (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback(null,null)
                    else {
                        callback(null, resultado.map(ele => ({  
                            id:ele.id,
                            nombre:ele.nombre,
                            apellido1:ele.apellido1,
                            apellido2:ele.apellido2,
                            correo:ele.correo,
                            admin:ele.admin,
                            facultad:ele.nombreFacultad,
                            grado:ele.nombreGrado, 
                            curso:ele.curso
                        })))
                    }
                })
            }
        })
    }
    updateAdmin(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE ucm_aw_riu_usu_usuarios SET admin = 1 WHERE id = ?"
                connection.query(stringQuery, id,(err, resultado) => {
                    if (err) callback(err)
                    else callback(null, true)
                })
            }
        })
    }

    acceptRequest(id,callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE ucm_aw_riu_usu_usuarios SET verificado = 1 WHERE id = ?"
                connection.query(stringQuery, id,(err, resultado) => {
                    if (err) callback(err)
                    else callback(null, true)
                })
            }
        })
    }

    dropRequest(id,callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "DELETE FROM ucm_aw_riu_usu_usuarios WHERE id = ?"
                connection.query(stringQuery, id,(err, resultado) => {
                    if (err) callback(err)
                    else callback(null, true)
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
                            facultad:resultado[0].facultad,
                            grado:resultado[0].grado,
                            curso:resultado[0].curso,
                            verificado:resultado[0].verificado,
                            admin:resultado[0].admin
                        }
                        callback(null, user)
                    } 
                })
            }
        })
    }

//GRADOS
    getGrados(idFacultad, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT id,nombre,dobleGrado FROM ucm_aw_riu_gra_grados WHERE idFacultad = ?"
                connection.query(stringQuery, idFacultad, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({id:ele.id,nombre: ele.nombre, dobleGrado: ele.dobleGrado})))
                })
            }
        })
    }
    
 //CORREO       
    getEmails(id,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT c.id, c.idOrigen, c.asunto, c.cuerpo, c.fecha, c.leido, c.archivado, c.favorito, u.nombre, u.apellido1, u.apellido2, u.correo FROM ucm_aw_riu_cor_correo AS c JOIN ucm_aw_riu_usu_usuarios AS u ON c.idOrigen = u.id WHERE idDestino = ?"
                connection.query(stringQuery, id, (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback(null, null)
                        else {
                            callback(null, resultado.map(ele => ({  
                                id:ele.id,
                                idOrigen:ele.idOrigen,
                                asunto:ele.asunto,
                                cuerpo:ele.cuerpo,
                                fecha:ele.fecha,
                                leido:ele.leido,
                                archivado:ele.archivado,
                                favorito:ele.favorito,
                                nombreOrigen:ele.nombre,
                                apellido1Origen:ele.apellido1,
                                apellido2Origen:ele.apellido2,
                                correoOrigen:ele.correo
                            })))
                        }
                    }
                })
            }
        })
    }

    createMessage(idOrigen,idDestino, asunto, cuerpo, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO ucm_aw_riu_cor_correo (idOrigen,idDestino,asunto,cuerpo) values (?,?,?,?)"
                connection.query(stringQuery, [idOrigen,idDestino,asunto,cuerpo], function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,{idCorreo:resultado.insertId})
                })
            }
        })
    }

    getOptions(callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_tip_tipoinstalacion"
                connection.query(stringQuery, function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({
                        nombre: ele.nombre,
                        tipo: ele.tipo, 
                        id: ele.id,
                        ini: ele.disponibilidadIni,
                        fin: ele.disponibilidadFin
                    })))
                })
            }
        })
    }
    getInstallationsByOption(idTipo,idFacultad,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT id, nombre,aforo FROM ucm_aw_riu_ins_instalaciones WHERE idTipo=? AND idFacultad=?"
                connection.query(stringQuery,[idTipo, idFacultad], function (err, resultado) {
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({
                        nombre: ele.nombre,
                        aforo: ele.aforo, 
                        id: ele.id 
                    })))
                })
            }
        })
    }
}

getReservationsByDayAndInstallation(day,idInstallation,callback){
    "SELECT * FROM `ucm_aw_riu_res_reservas` WHERE `idInstalacion` = 5 AND `fechaReserva` BETWEEN '2023-12-14 00:00:00.000000' AND '2023-12-14 23:59:59.999999' AND cancelado = 0"
    this.pool.getConnection((err, connection) => {
        if (err) callback(err, null)
        else {
            let stringQuery = "SELECT * FROM ucm_aw_riu_res_reservas WHERE idInstalacion = ? AND fechaReserva BETWEEN '? 00:00:00' AND '? 23:59:59'"
            connection.query(stringQuery,[idInstallation, day,day], function (err, resultado) {
                if (err) callback(err, null)
                else callback(null,resultado.map(ele => ({
                    nombre: ele.nombre,
                    aforo: ele.aforo, 
                    id: ele.id 
                })))
            })
        }
    })
}

module.exports = DAO