let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    document.querySelectorAll("#cart-count").forEach(el => {
        el.innerText = cart.length;
    });
}

function showCart() {
    loadCart();
    let list = document.getElementById("cart-items");
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.name + " - $" + item.price;
        list.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

function checkout() {
    alert("Payment Successful!");
    localStorage.removeItem("cart");
    location.reload();
}

loadCart();
updateCartCount();