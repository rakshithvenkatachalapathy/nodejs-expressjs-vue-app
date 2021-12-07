//This module is used to define the structure for the employees
module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    dateOfJoining: {
      type: Sequelize.DATEONLY
    }
  });

  return Employee;
};
