$(document).ready(function() {
    // generate cards based on the product data file:
    $.getJSON( "assets/data/products.json", function( products ) {  
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

    // event listener for adding an item to the cart
    $("#product-area").on("click", ".add-to-cart", function() {
        let prodId = $(this).attr('id');
        alert(prodId)
    })
})