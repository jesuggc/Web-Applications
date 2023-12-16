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
                    connection.release();
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
                    connection.release();
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
                    connection.release();
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
                let stringQuery = "SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.correo, u.admin, u.curso, u.foto, f.nombre as nombreFacultad, g.nombre as nombreGrado FROM ucm_aw_riu_usu_usuarios as u JOIN ucm_aw_riu_fac_facultades as f ON u.facultad = f.id JOIN ucm_aw_riu_gra_grados AS g ON u.grado = g.id WHERE verificado = 1 AND admin=0"
                connection.query(stringQuery, (err, resultado) => {
                    connection.release();
                    if (err) callback(err, null)
                    // else if (resultado.length === 0) callback(null,null)
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
                            curso:ele.curso,
                            foto: ele.foto
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
                let stringQuery = "INSERT INTO ucm_aw_riu_usu_usuarios (nombre,apellido1,apellido2,correo,contrasena,facultad,grado,curso,foto) VALUES (?,?,?,?,?,?,?,?,?)"
                connection.query(stringQuery, Object.values(user), (err, resultado) => {
                    connection.release();
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
                let stringQuery = "SELECT u.id, u.nombre, u.apellido1, u.apellido2, u.correo, u.admin, u.curso, u.foto, f.nombre as nombreFacultad, g.nombre as nombreGrado FROM ucm_aw_riu_usu_usuarios as u JOIN ucm_aw_riu_fac_facultades as f ON u.facultad = f.id JOIN ucm_aw_riu_gra_grados AS g ON u.grado = g.id WHERE verificado = 0"
                connection.query(stringQuery, (err, resultado) => {
                    connection.release();
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
                            curso:ele.curso,
                            foto: ele.foto
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
                    connection.release();
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
                    connection.release();
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
                    connection.release();
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
                    connection.release();
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
                            admin:resultado[0].admin,
                            foto: resultado[0].foto
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
                    connection.release();
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
                let stringQuery = "SELECT c.id, c.idOrigen, c.asunto, c.cuerpo, c.fecha, c.leido, c.archivado, c.favorito, u.nombre, u.apellido1, u.apellido2, u.correo, u.admin FROM ucm_aw_riu_cor_correo AS c JOIN ucm_aw_riu_usu_usuarios AS u ON c.idOrigen = u.id WHERE idDestino = ? ORDER BY c.fecha DESC"
                connection.query(stringQuery, id, (err, resultado) => {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback(null, [])
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
                                apellido1:ele.apellido1,
                                apellido2:ele.apellido2,
                                correoOrigen:ele.correo,
                                admin:ele.admin
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
                    connection.release();
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
                    connection.release();
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
                let stringQuery = "SELECT i.id, i.nombre,i.aforo, t.disponibilidadIni,t.disponibilidadFin FROM ucm_aw_riu_ins_instalaciones as i JOIN ucm_aw_riu_tip_tipoinstalacion as t on i.idTipo=t.id  WHERE idTipo=? AND idFacultad=?"
                connection.query(stringQuery,[idTipo, idFacultad], function (err, resultado) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({
                        nombre: ele.nombre,
                        aforo: ele.aforo, 
                        id: ele.id,
                        ini: ele.disponibilidadIni,
                        fin: ele.disponibilidadFin
                    })))
                })
            }
        })
    }


    getReservationsByDayAndInstallation(day,idInstallation,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT idUsuario,horaIni, horaFin FROM ucm_aw_riu_res_reservas WHERE idInstalacion = ? AND fechaReserva = ? AND cancelado = 0"
                connection.query(stringQuery,[idInstallation,day], function (err, resultado) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,resultado.map(ele => ({
                        idUsuario: ele.idUsuario,
                        horaIni: ele.horaIni,
                        horaFin: ele.horaFin
                    })))
                })
            }
        })
    }

    createBooking(idUsuario, idInstallation, fecha, horaIni, horaFin, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO ucm_aw_riu_res_reservas (idUsuario, idInstalacion, fechaReserva, horaIni, horaFin) VALUES (?,?,?,?,?)"
                connection.query(stringQuery,[idUsuario, idInstallation, fecha, horaIni, horaFin], function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,res.insertId)
                })
            }
        })
    }

    getReservationsByDayAndUser(day,idUsuario,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_res_reservas WHERE idUsuario = ? AND fechaReserva = ? AND cancelado = 0"
                connection.query(stringQuery,[idUsuario,day], function (err, resultado) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        let x = resultado.length > 0 ? true : false
                        callback(null,x)
                    }
                })
            }
        })
    }

    createTypeInstallation(nombre, disponibilidadIni,disponibilidadFin,tipo,foto, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO ucm_aw_riu_tip_tipoinstalacion (nombre, disponibilidadIni,disponibilidadFin,tipo,foto) VALUES (?,?,?,?,?)"
                connection.query(stringQuery,[nombre, disponibilidadIni,disponibilidadFin,tipo,foto], function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else { 
                        callback(null,res.insertId)}
                })
            }
        })
    }

    createInstallation(nombre, idFacultad, aforo, idTipo,foto, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO ucm_aw_riu_ins_instalaciones (nombre, idFacultad, aforo, idTipo,foto) VALUES (?,?,?,?,?)"
                connection.query(stringQuery,[nombre, idFacultad, aforo, idTipo,foto], function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,res.insertId)
                })
            }
        })
    }

    favEmail(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE ucm_aw_riu_cor_correo SET favorito = 1 WHERE id = ?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,true)
                })
            }
        })
    }

    readEmail(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE ucm_aw_riu_cor_correo SET leido = 1 WHERE id = ?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,true)
                })
            }
        })
    }

    archiveEmail(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE ucm_aw_riu_cor_correo SET archivado = 1 WHERE id = ?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,true)
                })
            }
        })
    }

    deleteEmail(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "DELETE FROM ucm_aw_riu_cor_correo WHERE id = ?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,true)
                })
            }
        })
    }

    getEmail(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT c.*, u.nombre, u.apellido1, u.apellido2, u.admin,u.correo FROM ucm_aw_riu_cor_correo AS c JOIN ucm_aw_riu_usu_usuarios AS u on c.idOrigen=u.id WHERE c.id=?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        let email = {
                            idOrigen:res[0].idOrigen,
                            idDestino:res[0].idDestino, 
                            asunto:res[0].asunto,
                            cuerpo:res[0].cuerpo,
                            fecha:res[0].fecha,
                            leido:res[0].leido,
                            archivado:res[0].archivado,
                            favorito:res[0].favorito,
                            correo:res[0].correo,
                            nombre:res[0].nombre,
                            apellido1:res[0].apellido1,
                            apellido2:res[0].apellido2,
                            admin:res[0].admin
                        } 
                        callback(null,email)
                    }
                })
            }
        })
    }
    
    getProfilePhoto(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT foto FROM ucm_aw_riu_usu_usuarios WHERE id = ?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,res[0].foto)
                })
            }
        })
    }
    // getInstallationPhoto(id,callback){
    //     this.pool.getConnection((err, connection) => {
    //         if (err) callback(err, null)
    //         else {
    //             let stringQuery = "SELECT foto FROM ucm_aw_riu_ins_installation WHERE id = ?"
    //             connection.query(stringQuery, id, function (err, res) {
    //                 connection.release();
    //                 if (err) callback(err, null)
    //                 else callback(null,res[0].foto)
    //             })
    //         }
    //     })
    // }
    
    // getTypeInstallationPhoto(id,callback){
        //     this.pool.getConnection((err, connection) => {
        //         if (err) callback(err, null)
        //         else {
        //             let stringQuery = "SELECT foto FROM ucm_aw_riu_tip_tipoinstalacion WHERE id = ?"
        //             connection.query(stringQuery, id, function (err, res) {
        //                 connection.release();
        //                 if (err) callback(err, null)
        //                 else callback(null,res[0].foto)
        //             })
        //         }
        //     })
        // }

    getIdByEmail(email, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT id FROM ucm_aw_riu_usu_usuarios WHERE correo LIKE ?"
                connection.query(stringQuery, email, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        console.log(res[0].id)
                        callback(null,res[0].id)
                    }
                })
            }
        })
    }

    getFacultadById(idFac, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT nombre FROM ucm_aw_riu_fac_facultades WHERE id = ?"
                connection.query(stringQuery, idFac, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null,res[0].nombre)
                })
            }
        })
    }
    getTipoById(idTipo,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT nombre FROM ucm_aw_riu_tip_tipoinstalacion WHERE id=?"
                connection.query(stringQuery, idTipo, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        let tipo=res[0].nombre
                        callback(null,tipo)
                    }
                })
            }
        })
    }

    
    getUsersByInput(searchInput,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "Select u.*, f.nombre as nombreFacultad from ucm_aw_riu_usu_usuarios as u join ucm_aw_riu_fac_facultades as f on u.facultad=f.id Where (instr(u.nombre, ?) or instr(u.apellido1, ?) or instr(u.apellido2, ?) or instr(CONCAT(u.nombre, ' ', u.apellido1, ' ', u.apellido2), ?)or instr(correo, ?) or instr(f.nombre, ?) > 0) and verificado=1 and admin=0;"
                connection.query(stringQuery, [searchInput,searchInput,searchInput,searchInput,searchInput,searchInput], function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        callback(null, res.map(ele => ({  
                            id:ele.id,
                            nombre:ele.nombre,
                            apellido1:ele.apellido1,
                            apellido2:ele.apellido2,
                            correo:ele.correo,
                            facultad:ele.nombreFacultad
                        })))
                    }
                })
            }
        })
    }
    listReservationsByName(name, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT r.id, r.fechaReserva, i.nombre, r.cancelado FROM ucm_aw_riu_res_reservas as r join ucm_aw_riu_ins_instalaciones as i on r.idInstalacion=i.id  join ucm_aw_riu_usu_usuarios as u on r.idUsuario=u.id where u.nombre=?"
                connection.query(stringQuery, name, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        callback(null, res.map(ele => ({  
                            id:ele.id,
                            fechaReserva:ele.fechaReserva,
                            nombre:ele.nombre,
                            cancelado: ele.cancelado
                        })))
                    }
                })
            }
        })
    }

    getResDetailsById(id,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM ucm_aw_riu_res_reservas where id=?"
                connection.query(stringQuery, id, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        callback(null, res.map(ele => ({  
                            id:ele.id,
                            fechaReserva:ele.fechaReserva,
                            fecha:ele.fecha,
                            horaIni:ele.horaIni,
                            horaFin: ele.horaFin,
                            cancelado: ele.cancelado
                        })))
                    }
                })
            }
        })
    }
    getConfiguration(callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else { 
                let stringQuery = "SELECT * FROM ucm_aw_riu_con_configuracion"
                connection.query(stringQuery,  function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else {
                        let configuration = {
                            id:res[0].id,
                            nombre:res[0].nombre,
                            numero:res[0].numero,
                            direccion:res[0].direccion,
                            correo: res[0].correo,
                            logo: res[0].logo,
                            favicon: res[0].favicon,
                            abreviacion: res[0].abreviacion,
                            titulo:res[0].titulo
                        }
                        callback(null, configuration)
                    }
                })
            }
        })
    }

    updateAppearance(titulo, nombre, direccion,numero,correo,abreviacion,logo,favicon, callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else { 
                let stringQuery = "update ucm_aw_riu_con_configuracion set titulo = IFNULL(?,titulo), nombre = IFNULL(?,nombre),direccion = IFNULL(?,direccion),numero = IFNULL(?,numero),correo = IFNULL(?,correo),abreviacion = IFNULL(?,abreviacion),logo = IFNULL(?,logo),favicon = IFNULL(?,favicon) WHERE id=1"
                logo = logo ? logo.buffer : logo
                favicon = favicon ? favicon.buffer : favicon
                connection.query(stringQuery, [titulo,nombre,direccion,numero,correo,abreviacion,logo,favicon], function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null, true)
                })
            }
        })
    }

    getLogo(callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else { 
                let stringQuery = "SELECT logo FROM ucm_aw_riu_con_configuracion WHERE id = 1"
                connection.query(stringQuery, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null, res[0].logo)
                })
            }
        })
    }

    getFavicon(callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else { 
                let stringQuery = "SELECT favicon FROM ucm_aw_riu_con_configuracion WHERE id = 1"
                connection.query(stringQuery, function (err, res) {
                    connection.release();
                    if (err) callback(err, null)
                    else callback(null, res[0].favicon)
                })
            }
        })
    }
    

}
module.exports = DAO