module.exports = app => {
  const employee = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/", employee.create);

  // Retrieve all Employee
  router.get("/", employee.findAll);

  // Retrieve all published Employee
  router.get("/published", employee.findAllPublished);

  // Retrieve a single Employee with id
  router.get("/:id", employee.findOne);

  // Update a Employee with id
  router.put("/:id", employee.update);

  // Delete a Employee with id
  router.delete("/:id", employee.delete);

  // Delete all Employee
  router.delete("/", employee.deleteAll);

  app.use('/api/employees', router);
};
