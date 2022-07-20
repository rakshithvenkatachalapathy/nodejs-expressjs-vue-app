// This module is used to define the routes for the api calls
module.exports = app => {
  const doctor = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Doctor
  router.post("/", doctor.create);

  router.post("/appointments", doctor.createPhoneNumber);

  // Retrieve all Doctors
  router.get("/", doctor.findAll);

  // Retrieve a single Doctor with fname and lname
  router.get("/:firstName/:lastName", doctor.findByName);

  // Retrieve a  Doctor with name and date
  router.get("/appointments/:id/:appointmentDate", doctor.findByIdAndDate);

  // Update a Doctor with id
  router.put("/:id", doctor.update);

  // Delete a Doctor with id
  router.delete("/:id", doctor.delete);

  // Delete a Appointment with id
  router.delete("/appointments/:id", doctor.deleteAppoinment);

  // Delete all Doctor
  router.delete("/", doctor.deleteAll);

  // the default api which will be extended with the routes given above 
  app.use('/api/doctors', router);
};
