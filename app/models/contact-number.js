
module.exports = (sequelize, DataTypes) => {
  const ContactNumber = sequelize.define('contactNumber', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return ContactNumber;
};
