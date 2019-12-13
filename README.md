# fruitStop
## Summary
fruitStop is a simple e-commerce Node.js web application with API endpoints to emulate an online shopping experience.

### Module Dependencies
The following Node modules are used (and are included in the package.json file):
* express - backend server routing.
* nodemon - used for continuosly running a dev server after updates.

### How to Run the App on Your Machine
* Clone the git repo.
* CD into the folder and run 'npm install' in the terminal to install dependencies.
* Run 'node server.js' or 'nodemon server.js' to run the server.
* Navigate to http://localhost:8080/  in your browser to view the app.

## Features

### Home Page
* This page allows you to add fruits to your cart. 
* A count will display next to the cart indicating how many items there are in the cart.
* Upon adding a fruit to your cart, the "add-item" API endpoint will be called from the client to update the current cart.
* If the cart update is successful, a success icon will indicate that your cart has been updated.

### Cart Page
* This page shows you a receipt of all the items and quantities currently in your cart. This page is accessible via the "Home" icon at the top right of the page.
* Toward the bottom of the page, both the "Checkout" and "Empty Cart" buttons will run the "empty-cart" endpoint of the API.

### Cart Persistence
* Upon any successful return to the client from the API, the cart configuration is stored in localStorage on the client's machine. This page is accessible via the "Cart" icon at the top right of the page.
* Upon any page load, the app will check for an existing cart from the user.
* This allows for cart persistence between visits to the site.

### Cart Value Algorithm
* This algorithm is found in the "cart-total" endpoint of the API.
* 1. A hash map of the cart is formed for efficiency (the cart is represented by a string of characters of item IDs, e.g. "AAABCDBA"), counting the occurrences of each fruit ID in the cart.
* 2. The hash map is then dissected, one item ID at a time (e.g. "A").
* 3. We check against the "database" (assets/data/products.json) to match the ID in the cart to the product data.
* 4. We check to see if any bulk discounting may apply to the current product.
* 5. IFF bulk discounting applies, we find the number of even divisions in which the total quantity of the item in the cart can be divided by the bulk discount amount. This is then multiplied by the bulk pricing. Lastly, the remainder (which does NOT qualify for bulk discounting), is added to the total cost for that item ID in the cart.
* 6. If bulk discounting does not apply for the item at hand, the normal price is calculated by the total number of that item in the cart by the unit price.
* This endpoint is called each time the cart page is visited or when the user empties the cart or checks out.
