module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    dateOfJoining:{
      type: Sequelize.STRING
    }
  });

  return Employee;
};
