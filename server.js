const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Defining the public path that we will serve to the client. This will route ONLY from the "public" folder.
const public = require("path").join(__dirname, "public");
app.use(express.static(public));

// routing for API endpoints and HTML pages
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

module.exports = app;