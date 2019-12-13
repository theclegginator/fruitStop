// load reference data for pricing etc.
var products = require("../public/assets/data/products.json");
let cart = "";
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/new-cart", function(req, res) {
        // simply clear the cart variable and return it to the client. Session storage is emptied on the client side.
        cart = "";
        res.json(cart);
    })

    app.post("/api/add-item", function(req, res) {
        // takes in the session storage and concatenates it with the new product ID
        cart = req.body.currCart + req.body.id;
        // then sends the new cart back to the client.
        res.json(cart);
    })

    app.post("/api/cart-total", function(req, res) {
        cart = req.body.currCart;
        let totalCost = 0;
        let cartMap = {};

        // =====================
        // CART PRICE ALGORITHM
        // =====================

        // 1. Go through each character in the string (that represents the cart contents). 
        for (char of cart) {
            // 2. Create a hash table to count how many occurrences of each character (ID) there are.
            if (cartMap[char]) {
                cartMap[char] = cartMap[char] + 1;
            }
            else cartMap[char] = 1;
        }

        // 3. Go through each key value in the map object
        let discounted = false, evenDiv = 0, remainder = 0, count = 0;
        for (key in cartMap) {
            count = cartMap[key];
            // use ES6 find filtering to first match the current id to the products dictionary
            let currItem = products.find((item) => {
                return (item.id === key);
            })
            // if there is a discount array inside the object of the current item, we can check for discounting
            if (currItem.volume_discounts !== undefined && currItem.volume_discounts.length !== 0) {
                discounted = true;
            }
            else discounted = false;

            // 4. If bulk pricing applies, apply the discount and add to the total, otherwise simply add the total.
            if (discounted) {
                // check to see if the count in the cart meets the minimum amount for bulk discount
                if (count >= currItem.volume_discounts[0].number) {
                    // first, get # of even divisions for bulk discount
                    evenDiv = Math.floor(count/currItem.volume_discounts[0].number);
                    // next, we must multiple the remaining items by their normal price.
                    remainder = count % currItem.volume_discounts[0].number;
                    totalCost += (evenDiv * currItem.volume_discounts[0].price) + (remainder * currItem.unit_price);
                }
                // otherwise, if the count in the cart was too low for bulk discounting...
                else totalCost += count * currItem.unit_price;
            }

            // 5. if no bulk discounting applies...
            else totalCost += count * currItem.unit_price;
        }
        res.json(totalCost);
    });

}