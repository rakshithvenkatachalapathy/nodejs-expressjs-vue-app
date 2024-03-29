const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

// Change this directory to the app/views folder on your computer
const path = '/Users/rakshith/Documents/raknode/app/views/';
const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
//drop the table if it already exists
// can be used to drop all and recreate the tables
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.get('/', function (req, res) {
  res.sendFile(path + "index.html");
})

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
