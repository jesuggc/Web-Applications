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

    //DESTINOS
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
    //RESERVAS
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
    //CAROUSEL
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

    //USUARIOS
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
                                apellidos:resultado[0].apellidos,
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

    checkEmail(correo, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM usuarios WHERE correo = ?"
                connection.query(stringQuery, correo, (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback("El correo no esta asociado a ninguna cuenta", null)
                    else {
                        let user = { 
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            apellidos:resultado[0].apellidos,
                            correo:resultado[0].correo
                        }
                        callback(null, user)
                    } 
                })
            }
        })
    }


    checkUser(correo, contrasena, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?"
                connection.query(stringQuery, [correo, contrasena], (err, resultado) => {
                    if (err) callback(err, null)
                    else if (resultado.length === 0) callback("No encontrado", null)
                    else {
                        let user = { 
                            id:resultado[0].id,
                            nombre:resultado[0].nombre,
                            apellidos:resultado[0].apellidos,
                            correo:resultado[0].correo
                        }
                         callback(null, user)
                    } 
                })
            }
        })
    }

    //COMENTARIOS
    postComment(nombre,destino,comentario,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "INSERT INTO comentarios (destino_id,nombre_usuario,comentario) VALUES (?,?,?)"
                connection.query(stringQuery, [destino,nombre,comentario], (err, resultado) => {
                    if (err) callback(err, null)
                    else callback(null, resultado.insertId)
                })
            }
        })
    }
    updateLikes(id, likes, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "UPDATE comentarios SET LIKES = ? WHERE id = ?"
                connection.query(stringQuery, [id,likes], (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback(null, "No hay comentarios aún")
                        else callback(null, res)
                    }
                })
            }
        })  
    }
    
    // Funcion que recoge SOLO los 3 primeros comentarios para que no afecte al tiempo de renderizado de la pagina
    getFirstComments(destino,callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM comentarios WHERE destino_id = ? ORDER BY fecha_comentario DESC LIMIT 3"
                connection.query(stringQuery, destino, (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback("No hay comentarios aún", null)
                        else {
                            
                            let res = resultado.map(ele => ({ 
                                nombre: ele.nombre_usuario,
                                comentario: ele.comentario,
                                fecha: ele.fecha_comentario.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0],
                                hora: ele.fecha_comentario.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[1],
                                likes: ele.likes,
                                id: ele.id
                            }))
                            callback(null, res)
                        }
                    }
                })
            }
        })
    }
    getAllComments(destino,callback) { 
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM comentarios WHERE destino_id = 1 ORDER BY fecha_comentario DESC"
                connection.query(stringQuery, destino, (err, resultado) => {
                    if (err) callback(err, null)
                    else {
                        if (resultado.length === 0) callback("No hay comentarios aún", null)
                        else {
                            let res = resultado.map(ele => ({ 
                                nombre: ele.nombre_usuario,
                                comentario: ele.comentario,
                                fecha: ele.fecha_comentario.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0],
                                hora: ele.fecha_comentario.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[1],
                                likes: ele.likes,
                                id: ele.id
                            }))
                            callback(null, res)
                        }
                    }
                })
            }
        })
    }
}
module.exports = DAO