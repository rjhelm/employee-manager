const mysql = require('mysql2');

const connection = mysql.createConnection({ 
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Soybean2019!',
    database: 'employees'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;