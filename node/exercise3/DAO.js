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

    leerArticulos(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(err, null)
            else {
                let stringQuery = "SELECT * FROM articulos JOIN palabrasclave ON articulos.id = palabrasclave.IdArticulo;"
                connection.query(stringQuery, (err, resultados) => {
                    if (err) callback(err, null)
                    else {
                        const datosOrganizados = {};
                        resultados.forEach(resultado => {
                            const id = resultado.id;
                            const titulo = resultado.titulo;
                            const fecha = resultado.fecha;
                            const palabraClave = resultado.PalabraClave;
                            if (!datosOrganizados[id]) {
                                datosOrganizados[id] = {
                                    id: id,
                                    titulo: titulo,
                                    fecha: fecha,
                                    palabrasClave: [palabraClave] // Inicializar un array con la primera palabra clave
                                };
                            } else datosOrganizados[id].palabrasClave.push(palabraClave);
                        });
                        callback(null,datosOrganizados)
                    }

                });

            }
        })
    }
}






module.exports = DAO;