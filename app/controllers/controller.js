const { condition } = require("sequelize");
const { DATE } = require("sequelize");
const db = require("../models");
const Doctor = db.doctor;
const Op = db.Sequelize.Op;
const Appointment = db.appointments;

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Patient
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  // Save Patient in the database
  Doctor.create(patient)
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
    "email": "rak@xyz.com"

    
    "id": 1,
    "name": "patient",
    "kind": "re-visit",
    "appointmentTime": "13:00"

*/
// Create and Save appointment
exports.createPhoneNumber = async (req, res) => {
    time = req.body.appointmentTime

    var condition = {
      [Op.and]: 
      [{doctorId : req.body.id}, 
        {appointmentTime : req.body.appointmentTime}]
    }

    if(isValidTime(time.slice(-2))){
      const count = await Appointment.count({
        where: condition
      })
      if(count < 3){
        return Appointment.create({
          name: req.body.name,
          kind: req.body.kind,
          doctorId: req.body.id,
          appointmentTime: req.body.appointmentTime,
          appointmentDate : req.body.appointmentDate
        })
          .then(data => {
            res.send(data);
            console.log(">> Created  appointment: ");
          })
          .catch((err) => {
            console.log(">> Error while creating appointment: ", err);
          });
      }
      else{
        throw new Error('>> Error while creating appointment: More than 3 appointments at this time')
      }
      
    }
    else{
      throw new Error('>> Error while creating appointment: Time can only be in 15 min intervals')
    }

    // take his appoinment at that time 
    // check if it is < 3 then insert.

  
};

const isValidTime = timestr => {
   //let digts  = timestr.splice(-2) ;
  let correctDigits = ['00', '15', '30', '45'];
  return correctDigits.includes(timestr)
}


// Retrieve all Doctors from the database.
exports.findAll = (req, res) => {
  const title = req.query.firstName;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Doctor.findAll({ where: condition, include: ["numbers"], })
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

// Find an Patient with a name
exports.findByName = (req, res) => {
  const firstName = req.params.firstName;
  const lastName = req.params.lastName;
  var condition = null
  if (!firstName || !lastName) {
    res.status(500).send({
      message:
        "Both the first name and last name are nulls"
    });
  }
  else {
    condition =
    {
      [Op.and]: [
        { firstName: req.params.firstName },
        { lastName: req.params.lastName },
      ]
    }
  }
  console.log(condition)
  Doctor.findAll({ where: condition, include: ["numbers"] })
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

exports.findByIdAndDate = (req, res) => {
  var condition = null
  
    condition =
    {
      [Op.and]: [
        { doctorId: req.params.id },
        { appointmentDate: req.params.appointmentDate },
      ]
    }
  
  console.log(condition)
  Appointment.findAll({ where: condition })
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

// Update a Patient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Doctor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doctor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe the Patient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};

exports.deleteAppoinment = (req, res) => {
  const id = req.params.id;

  Appointment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Appointment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe the Patient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};

// Delete all Patient from the database.
exports.deleteAll = (req, res) => {
  Doctor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Patients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Patient."
      });
    });
};
