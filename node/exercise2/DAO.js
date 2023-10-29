class DAO {
    
    constructor(pool) {
        this.pool = pool;
    }

    getNames() {
            this.pool.getConnection(function (err, connection) {
                if (err) console.log("Error al obtener la conexion: ", err.messages)
                else {
                    let queryString = "SELECT Nombre FROM Usuarios"
                    connection.query(queryString, function (err, filas) {
                        connection.release()
                        if (err) console.log("Error en la consulta")
                        else {
                            filas.forEach(function (fila) {
                                console.log(`${fila.Nombre}`)
                            });
                        }
                    })
                }

            })
    }

    insertarUsuario(usuario) {
        this.pool.getConnection(function(err,connection) {
            if (err) console.log("Error al obtener la conexion: ", err.messages)
            else {
                let queryString = `INSERT INTO USUARIOS VALUES (NULL, "${usuario.nombre}", "${usuario.correo}", "${usuario.telefono}");`
                connection.query(queryString, function (err, resultado) {
                    connection.release()
                    if (err) console.log("Error en la consulta")
                    else {
                        console.log(`${usuario.nombre} con id: ${resultado.insertId} insertado con exito)`)
                        usuario.id = resultado.insertId
                    }
                })
            }
            
        })


    }
    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje) {
        this.pool.getConnection(function(err,connection) {
            if (err) console.log("Error al obtener la conexion: ", err.messages)
            else {
                let queryString = `INSERT INTO mensajes VALUES (NULL, ${usuarioOrigen}, ${usuarioDestino}, "${mensaje}", current_timestamp(), 0);`
                connection.query(queryString, function (err, resultado) {
                    connection.release()
                    if (err) console.log("Error en la busqueda", err.toString())
                    else {
                       console.log("Mensaje enviado con id: ", resultado.insertId)
                    }
                })
            }
            
        })


    }

    bandejaEntrada(usuario) {
        this.pool.getConnection(function(err,connection) {
            if (err) console.log("Error al obtener la conexion: ", err.messages)
            else {
                let queryString = `SELECT mensaje FROM mensajes WHERE leido = 0 AND idDestino = (SELECT id FROM usuarios WHERE Nombre = "${usuario.nombre}");`
                let queryStringId = `SELECT mensaje FROM mensajes WHERE leido = 0 AND idDestino = ${usuario.id});`
                connection.query(queryString, function (err, resultado) {
                    connection.release()
                    if (err) console.log("Error en la busqueda")
                    else {
                       resultado.forEach(ele => {
                            console.log("Mensaje sin leer: ", ele.mensaje)
                       })
                    }
                })
            }
            
        })
    }

    buscarUsuario(str, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null);
            else{  
                let queryString = `SELECT * FROM USUARIOS WHERE nombre LIKE ?`;
                connection.query(queryString, [`%${str}%`], (err, resultados) => {
                    connection.release();
                    if (err) callback(err, null);
                    else {
                        callback(null, resultados.map(ele => ({
                            id: ele.id,
                            nombre: ele.nombre,
                            correo: ele.correo,
                            telefono: ele.telefono
                        })));
                    }
                });
            }
        });
    }


}

// Abrimos la pool en app o en DAO?
// Asumimos que mostrarBandeja() trae id?




module.exports = DAO
