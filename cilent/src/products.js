function filterProducts() {
  document.addEventListener("DOMContentLoaded", () => {
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");
    const productContainer = document.getElementById("productContainer");

    const fetchProducts = () => {
      const minPrice = minPriceInput.value;
      const maxPrice = maxPriceInput.value;
      const dataUrl = `http://localhost:3000/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;

      // Fetch JSON data using Fetch API
      fetch(dataUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          productContainer.innerHTML = ""; // Clear existing content

          // Loop through the data and create product cards
          data.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className =
              "card card-compact bg-base-100 shadow-xl hover:scale-105 transform duration-300";

            productCard.innerHTML = `
              <figure>
                <img class='w-[500px]' src="${product.image}" alt="${product.name}">
              </figure>
              <div class="card-body">
                <h2 class="card-title">${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <div class="card-actions justify-end">
                  <a href="product.html?id=${product._id}">
                    <button class="btn btn-primary">Buy Now</button>
                  </a>
                </div>
              </div>
            `;
            productContainer.appendChild(productCard); // Append the card to the container
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          productContainer.innerHTML = "Error fetching data. Please try again later.";
        });
    };

    // Fetch products on initial load
    fetchProducts();

    // Add event listeners to filter inputs
    minPriceInput.addEventListener("input", fetchProducts);
    maxPriceInput.addEventListener("input", fetchProducts);
  });
}

filterProducts();

// details


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id"); // Get the product ID from URL
  const productUrl = `http://localhost:3000/api/product/${productId}`; // Path to your JSON file
  const productDetails = document.getElementById("product-details");

  if (!productId) {
    productDetails.innerHTML = "<p>Product not found!</p>";
    return;
  }

  // Fetch JSON data
  fetch(productUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((product) => {
      if (!product) {
        productDetails.innerHTML = "<p>Product not found!</p>";
        return;
      }

      // Populate the product details
      productDetails.innerHTML = `
        <div class="max-w-sm mx-auto bg-white shadow-md hover:scale-105 transform duration-300 mt-10">
          <div class="relative">
        <img
          class="w-full h-48 object-cover"
          src="${product.image}"
          alt="${product.name}"
        />
          </div>
          <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-900">${product.name}</h2>
        <p class="text-gray-600 mt-2">${product.description}</p>
        <p class="text-gray-600 mt-2"><strong>Price:</strong> $${product.price}</p>
        <div class="mt-4">
          <button onClick='addToCart(${JSON.stringify(product)})' class="bg-blue-500 text-white px-4 py-2 rounded">
            Add to cart
          </button>
        </div>
          </div>
        </div>
      `;

     
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      productDetails.innerHTML = "<p>Error loading product details.</p>";
    });
});


function addToCart(product) {
  const productUrl = `http://localhost:3000/api/addToCart`;

  fetch(productUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productName: product.name, price: product.price, image: product.image }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert(`Product ${data.productName} added to cart`);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart. Please try again later.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("show-cart");

  const fetchCart = () => {
    const cartUrl = `http://localhost:3000/api/cardFind`;

    fetch(cartUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((cartItems) => {
        cartContainer.innerHTML = ""; // Clear existing content

        if (cartItems.length === 0) {
          cartContainer.innerHTML = "<p>Your cart is empty.</p>";
          return;
        }

        cartItems.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item flex items-center bg-white p-4 rounded shadow mt-5";

          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.productName}" class="w-24 h-24 object-cover mr-5">
            <div class="flex-grow">
              <h2 class="text-xl m-0">${item.productName}</h2>
              <p class="text-gray-500">$${item.price}</p>
            </div>
            <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" onclick='deleteCartItem("${item._id}")'>Delete</button>
          `;

          cartContainer.appendChild(cartItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        cartContainer.innerHTML = "Error fetching cart data. Please try again later.";
      });
  };

  const deleteCartItem = (id) => {
    const deleteUrl = `http://localhost:3000/api/cart/${id}`;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        fetchCart(); // Refresh cart items
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
        alert("Error deleting cart item. Please try again later.");
      });
  };

  fetchCart(); // Fetch cart items on initial load
});
