const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;
const Phone = db.phoneNumbers;

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Employee
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    dateOfJoining : req.body.dateOfJoining
  };

  // Save Employee in the database
  Employee.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Database."
      });
    });
};

/* 
  "firstName": "sac ",
    "lastName": "bs",
    "address": "usf",
    "dateOfJoining": "jul 2021"

    "id" : 1,
    "number":"80952345666",
    "type":"home"
*/
// Create and Save new Comments
exports.createPhoneNumber = (req, res) => {
  const comment = 
  {
  text: "Hi, thank you!"
}
  return Phone.create({
    phoneNumber: req.body.number,
    type: req.body.type,
    employeeId: req.body.id,
  })
    .then(() => {
      console.log(">> Created phone number: ");
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating phone number: ", err);
    });
};

// Retrieve all Employee from the database.
exports.findAll = (req, res) => {
  const title = req.query.firstName;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Employee.findAll({ where: condition,  include: ["numbers"],})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the records."
      });
    });
};

// Find an Employee with a name
exports.findByFirstName = (req, res) => {
  const firstName = req.params.firstName;
  

  var condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

  Employee.findAll({ where: condition,  include: ["numbers"],})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the records."
      });
    });
  // Employee.findByPk(id)
  //   .then(data => {
  //     if (data) {
  //       res.send(data);
  //     } else {
  //       res.status(404).send({
  //         message: `Cannot find employee with id=${id}.`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving employee with id=" + id
  //     });
  //   });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe the employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};

// Delete all Employee from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} employee were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};

// find all published Employee
exports.findAllPublished = (req, res) => {
  Employee.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};
