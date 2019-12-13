$(document).ready(function() {
    // =====================
    // BUILD PRODUCT LISTING
    // =====================

    // generate cards based on the product data file:
    $.getJSON("assets/data/products.json", function(products) {  
        products.forEach(function(prod){
            // create a card template and pass all pertinent data from the product data into the HTML
            let productCard = `
            <div class="product-card">
                <div class="columns is-vcentered is-centered">
                    <div class="column has-text-centered">
                        <img class="prod-img" src="assets/images/${prod.description}.jpg" alt="${prod.description}">
                    </div>
                    <div class="column has-text-centered">
                        <h3 class="title is-3">${prod.description}</h3>
                        <h2>Unit Price: <b>$${prod.unit_price}</b></h2>
                        <h2 class="prod-id">Product ID: ${prod.id}</h2>
                    </div>
                    <div class="column has-text-centered">
                        <button id="${prod.id}" class="button is-info add-to-cart"><i class="fas fa-shopping-cart" style="margin-right: 1rem;"></i>Add to Cart</button>
                    </div>
                </div>
            </div>
            `;
            // append the data from each individual product to the page.
            $("#product-area").append(productCard);
        });
    });

    // =================
    // CART PERSISTENCE
    // =================

    // upon page load, check to see if the user has any existing products in their cart
    let currentCart = localStorage.getItem("fruitCart");
    if (currentCart === null) {
        // if there is no currentCart in session storage, set it to a blank string (how we represent an empty cart).
        localStorage.setItem("fruitCart", "");
    }

    // event listener for adding an item to the cart
    let successTimer;
    $("#product-area").on("click", ".add-to-cart", function() {
        $("#success").hide(); // ensure success alert is already hidden if the user is clicking fast.
        clearTimeout(successTimer)
        let prodId = $(this).attr('id');
        
        // ============================
        // POST TO CART UPDATE ENDPOINT
        // ============================
        fetch("/api/add-item", {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            },
            // send the current cart configuration from the user's local storage as well as the new prod ID
            body: JSON.stringify({
                currCart: localStorage.getItem("fruitCart"),
                id: prodId,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            // =================
            // CART PERSISTENCE
            // =================
            // once we hear back from the server, set the local storage to the new cart for persistence.
            localStorage.setItem("fruitCart", data);
            // show and hide a display indicating success for the user
            $("#success").show();
            successTimer = setTimeout(function(){ $("#success").fadeOut("fast"); }, 1000);
        })
        .catch((err) => console.log("Error:", err))
    })
})