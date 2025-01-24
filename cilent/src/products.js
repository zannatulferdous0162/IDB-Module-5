{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> */}
// $(document).ready(function () { $("product.json").click(function () { $.ajax({
// url: "product.json", // API URL method: "GET", success:
// function (response) { $("#product-list").empty(); response.forEach(product => {
// $("#product-list").append(`
// <div class="product">
//   <h2>${product.name}</h2>
//   <p>${product.description}</p>
//   <p>Price: $${product.price}</p>
//   <button class="view-details" data-id="${product.id}">View Details</button>
// </div>
// `); }); }, error: function (error) { alert("Failed to load products."); } });
// }); });

// $(document).ready(function () {
//  console.log("Hello World");
 
// })