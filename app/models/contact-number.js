// This module is used to define the structure for the phone numbers
module.exports = (sequelize, Sequelize) => {
  const AppointmentNumber = sequelize.define('contactNumber', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    kind: {
      type: Sequelize.STRING,
      allowNull: false
    },
    appointmentTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    appointmentDate: {
      type : Sequelize.DATEONLY,
      
    }
  });

  return AppointmentNumber;
};
