var mysql = require("mysql");

var createConnection = () => {
  return mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "HYJAsCDBW1",
    password: "SRPycBhAjM",
    database: "HYJAsCDBW1"
  });
};

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connections = createConnection();
      connections.connect();
      connections.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connections.end();
      });
    });
  },
  
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },
};
