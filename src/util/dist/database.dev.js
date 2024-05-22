"use strict";

var mysql = require('mysql2');

var dbConfig = require("../config/db.config");

var pool = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD
});
module.exports = pool.promise();