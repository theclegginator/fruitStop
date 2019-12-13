// load reference data for pricing etc.
var products = require("../public/assets/data/products.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/all-products", function(req, res) {
        res.json(products);
    });

}