document.addEventListener("DOMContentLoaded", () => {
  const dataUrl = "product.json"; // Replace with the actual path to your JSON file
  const productContainer = document.getElementById("productContainer");

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
              <a href="product.html?id=${product.id}">
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
});




// details


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id"); // Get the product ID from URL
  const productUrl = "product.json"; // Path to your JSON file
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
    .then((products) => {
      // Find the product by ID
      const product = products.find((p) => p.id == productId);

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
              <button class="bg-blue-500 text-white px-4 py-2 rounded">
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