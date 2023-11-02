const sql = require("mysql")

class DAO {
    constructor(host, user, password, database) {
        this.pool = sql.createPool({
            host:host,
            user:user,
            password:password,
            database:database
        })
    }


    listAll(callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(err,null)
            else {
                let stringQuery = "SELECT * FROM destinos"
                connection.query(stringQuery,function(err, resultado) {
                    if(err) callback(err,null)
                    else {
                        callback(null, resultado)
                    }
                })
            }
        })
    }

}

module.exports = DAO