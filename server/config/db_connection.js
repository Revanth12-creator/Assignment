const Sequelize = require("sequelize");

const sequelize = new Sequelize("curd", "root", "root123", {
  port: 3306,
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
