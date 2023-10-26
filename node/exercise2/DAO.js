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

}

module.exports = DAO