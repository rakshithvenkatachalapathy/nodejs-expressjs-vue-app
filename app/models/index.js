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

db.doctor = require("./model.js")(sequelize, Sequelize);
db.appointments = require("./contact-number.js")(sequelize, Sequelize);

// create the relationship where a patient can have multiple phone numbers
db.doctor.hasMany(db.appointments, { as: "numbers" });
db.appointments.belongsTo(db.doctor, {
  foreignKey: "doctorId",
  as: "user",
});

module.exports = db;
