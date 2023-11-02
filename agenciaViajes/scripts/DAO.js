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


    prueba(){
        this.pool.getConnection((err, connection) => {
            if(err) console.log("No funciono", err)
            else console.log("Funciono")
        })
    }

}

module.exports = DAO