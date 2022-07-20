//This module is used to define the structure for the employees
module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("doctor", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Patient;
};
