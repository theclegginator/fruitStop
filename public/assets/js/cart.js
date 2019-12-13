$(document).ready(function() {

    $(".empty-cart").on("click", function() {
        fetch("/api/new-cart")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            // update local storage with result (empty string for empty cart)
            localStorage.setItem("fruitCart", data);
            // lastly update the cost on the page (should display 0, as cart was just emptied) and the items displaying.
            getCurrCost();
            $("#cart-items").empty();
        })
    })

    // function to find the current value of all items in the cart.
    function getCurrCost() {
        // perform fetch request to the algorithm api endpoint
        fetch("/api/cart-total", {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            },
            // send the current cart configuration from the user's local storage as well as the new prod ID
            body: JSON.stringify({
                currCart: localStorage.getItem("fruitCart"),
            })
        })
        .then((res) => res.json())
        .then((data) => {
            $("#cartVal").text(`$${data}`);
        })
    }

    function getCartItems() {
        // get the current cart value
        let cart = localStorage.getItem("fruitCart");
        let cartMap = {};
        for (char of cart) {
            // Create a hash table to count how many occurrences of each character (ID) there are.
            if (cartMap[char]) {
                cartMap[char] = cartMap[char] + 1;
            }
            else cartMap[char] = 1;
        }
        $.getJSON("assets/data/products.json", function(products) {  
            products.forEach(function(prod){
                if (cartMap[prod.id]) {
                    console.log(prod.id)
                    let itemCard = `
                        <div class="columns is-vcentered is-centered">
                            <div class="column has-text-centered">
                                <img class="prod-img" src="assets/images/${prod.description}.jpg" alt="Apple">
                            </div>
                            <div class="column has-text-centered">
                                <h3 class="title is-3">${prod.description}</h3>
                                <h2>Quantity: <b>${cartMap[prod.id]}</b></h2>
                                <h2 class="prod-id">Product ID: ${prod.id}</h2>
                            </div>
                        </div>`
                    $("#cart-items").append(itemCard);
                }
            })
        })
    }

    // get the cart value upon loading the page
    getCurrCost();
    getCartItems();
})