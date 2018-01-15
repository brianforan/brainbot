const mysql = require('mysql2');

module.exports = class BrainDB {
    constructor(db) {
        this.user = db.user;
        this.pass = db.pass;
        this.server = db.server;
        this.port = db.port;
        this.name = db.name;
        this.conn = null;
    }

    // Connect to the database
    connect() {
        this.conn = mysql.createConnection({
            host: this.server,
            user: this.user,
            password: this.pass,
            database: this.name,
            port: this.port
        });
    }

    table(name) {
        return
    }

    select(find = []) {
        const fields = find.join(', ');
        return `SELECT ${fields} `;
    }
}
