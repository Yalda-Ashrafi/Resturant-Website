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

    let checkoutBtn = document.getElementById("menu-checkout-btn");
    if (checkoutBtn) {
        if (cart.length > 0) {
            checkoutBtn.classList.remove("disabled-btn");
            checkoutBtn.href = "cart.html";
        } else {
            checkoutBtn.classList.add("disabled-btn");
            checkoutBtn.removeAttribute("href");
        }
    }
}

function showCart() {
    loadCart();
    let list = document.getElementById("cart-items-container");
    let totalEl = document.getElementById("total");
    if(!list) return;

    let total = 0;
    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<div class='cart-item empty'>Your cart is empty!</div>";
        document.getElementById("dining-section").style.display = "none";
        document.getElementById("payment-section").style.display = "none";
    } else {
        cart.forEach(item => {
            let div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `<span>${item.name}</span> <span>$${item.price}</span>`;
            list.appendChild(div);
            total += parseInt(item.price);
        });
        document.getElementById("dining-section").style.display = "block";
    }

    totalEl.innerHTML = `<span>Total:</span> <span>$${total}</span>`;
}

// Checkout Workflow Logic
let selectedDining = "";
let selectedPayment = "";

function selectDining(option) {
    selectedDining = option;
    document.getElementById("opt-eathere").classList.remove("selected");
    document.getElementById("opt-takeaway").classList.remove("selected");
    
    if(option === "Eat Here") document.getElementById("opt-eathere").classList.add("selected");
    else document.getElementById("opt-takeaway").classList.add("selected");

    document.getElementById("payment-section").style.display = "block";
    checkProceedReady();
}

function selectPayment(option) {
    selectedPayment = option;
    document.querySelectorAll(".pay-btn").forEach(b => b.classList.remove("selected"));
    
    if(option === "Cash") document.getElementById("pay-cash").classList.add("selected");
    else if(option === "Card") document.getElementById("pay-card").classList.add("selected");
    else if(option === "TNG") document.getElementById("pay-tng").classList.add("selected");
    else if(option === "Bank") document.getElementById("pay-bank").classList.add("selected");

    checkProceedReady();
}

function checkProceedReady() {
    let btn = document.getElementById("proceed-btn");
    // Ensure button exists (if we are on cart page)
    if(!btn) return;

    if(selectedDining && selectedPayment) {
        btn.classList.add("active");
        btn.disabled = false;
    } else {
        btn.classList.remove("active");
        btn.disabled = true;
    }
}

function processPayment() {
    if(!selectedDining || !selectedPayment) return;
    
    let modal = document.getElementById("payment-modal");
    let processing = document.getElementById("modal-processing");
    let success = document.getElementById("modal-success");

    if(!modal || !processing || !success) return;

    modal.style.display = "flex";
    processing.style.display = "block";
    success.style.display = "none";
    
    // Simulate payment delay
    setTimeout(() => {
        processing.style.display = "none";
        success.style.display = "block";
        
        cart = [];
        localStorage.removeItem("cart");
        updateCartCount();
        
        initStarRating();
    }, 2000);
}

let selectedStars = 0;
function initStarRating() {
    let stars = document.querySelectorAll("#star-rating i");
    let btn = document.getElementById("submit-rating-btn");
    
    if(!stars.length) return;

    stars.forEach(star => {
        star.addEventListener("mouseover", function() {
            let val = parseInt(this.getAttribute("data-val"));
            stars.forEach(s => {
                if(parseInt(s.getAttribute("data-val")) <= val) s.classList.add("hover");
                else s.classList.remove("hover");
            });
        });
        
        star.addEventListener("mouseout", function() {
            stars.forEach(s => s.classList.remove("hover"));
        });
        
        star.addEventListener("click", function() {
            selectedStars = parseInt(this.getAttribute("data-val"));
            stars.forEach(s => {
                if(parseInt(s.getAttribute("data-val")) <= selectedStars) s.classList.add("active");
                else s.classList.remove("active");
            });
            btn.style.display = "inline-block";
        });
    });
}

function submitRating() {
    if(selectedStars > 0) {
        location.href = "menu.html";
    }
}

loadCart();
updateCartCount();