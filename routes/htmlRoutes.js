const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });

  app.get("/cart", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/cart.html"));
  });

  // If no matching route is found default to THE 404 page.
  // Catch all comes last purposefully so that no other routes mistakenly route user to the 404 page.
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/404.html"));
  });
};
