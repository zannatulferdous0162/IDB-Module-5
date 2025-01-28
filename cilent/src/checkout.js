document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutForm = document.getElementById("checkout-form");

    let totalPrice = 0;
    let cartItems = [];

    // ✅ 1️⃣ MongoDB থেকে কার্টের প্রোডাক্ট লোড করা
    fetch("http://localhost:3000/api/cartFind")
        .then(response => response.json())
        .then(data => {
            cartItems = data;
            cartContainer.innerHTML = ""; // Clear previous content

            data.forEach((item) => {
                const cartItem = document.createElement("div");
                cartItem.className = "flex items-center justify-between bg-gray-200 p-4 rounded mb-3";
                cartItem.innerHTML = `
                    <div>
                        <h3 class="font-bold">${item.productName}</h3>
                        <p>Price: $${item.price}</p>
                    </div>
                    <img src="${item.image}" class="w-16 h-16 object-cover rounded">
                `;
                cartContainer.appendChild(cartItem);

                totalPrice += item.price;
            });

            totalPriceElement.innerText = `$${totalPrice}`;
        })
        .catch(error => console.error("Error loading cart:", error));

    // Checkout Form Submit করলে অর্ডার ডাটাবেজে পাঠানো
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const payment = document.getElementById("payment").value;

        const orderData = {
            userId: "user123", // এখানে লগইন করা ইউজারের ID দিবে
            cartItems: cartItems,
            totalPrice: totalPrice,
            paymentMethod: payment,
            address: address,
            phone: phone,
            status: "Pending"
        };

        //  অর্ডার API-তে ডাটা পাঠানো
        fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        })
        .then(response => response.json())
        .then(data => {
            alert("Order placed successfully!");
            window.location.href = "order-success.html"; // Success page-এ নিয়ে যাবে
        })
        .catch(error => console.error("Error placing order:", error));
    });
});
