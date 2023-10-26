// La consulta funciona
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
}

module.exports = DAO