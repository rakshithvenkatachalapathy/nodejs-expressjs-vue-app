const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("./model.js")(sequelize, Sequelize);
db.phoneNumbers = require("./contact-number.js")(sequelize, Sequelize);
// create the relationship where an employee can have multiple phone numbers
db.employee.hasMany(db.phoneNumbers, { as: "numbers" });
db.phoneNumbers.belongsTo(db.employee, {
  foreignKey: "employeeId",
  as: "user",
});

module.exports = db;
