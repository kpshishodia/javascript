
// // Wait until the full HTML document loads before running the script
// document.addEventListener("DOMContentLoaded", () => {

//   // ✅ Array of products, each with an id, name, and price
//   const products = [
//     { id: 1, name: "Product 1", price: 20.50 },
//     { id: 2, name: "Product 2", price: 30.20 },
//     { id: 3, name: "Product 3", price: 50.40 },
//     { id: 4, name: "Product 4", price: 60.70 },
//   ];

//   const Cart = []; // Array to hold products added to cart

//   // Selecting DOM elements
//   const productList = document.getElementById("product-list"); // Container for products
//   const cartItems = document.getElementById("cart-items");     // Container for cart items

//   // Render products dynamically
//   products.forEach((product) => {
//     const productDiv = document.createElement('div');
//     productDiv.classList.add('product');

//     productDiv.innerHTML = `
//       <span>${product.name} - $${product.price.toFixed(2)}</span>
//       <button data-id="${product.id}">Add to Cart</button>
//     `;
//     productList.appendChild(productDiv);
//   });

//   // ✅ Add click event listener on product list (event delegation)
//   productList.addEventListener("click", (e) => {
//     // Only handle clicks on buttons
//     if (e.target.tagName === "BUTTON") {

//       // Get the product id from the data attribute
//       const productId = parseInt(e.target.getAttribute("data-id"));
//       console.log("Clicked productId:", productId);

//       // ❌ BUG FIX: You were not returning anything inside find
//       const filterProduct = products.find((product) => product.id === productId);

//       console.log("Filtered product:", filterProduct);

//       if (filterProduct) {
//         addToCart(filterProduct);
//       }
//     }
//   });

//   // Function to add product to cart
//   function addToCart(product) {
//     console.log("Add to Cart function called for:", product);
//     Cart.push(product); // Add product to cart array

//     // ✅ Update UI (basic example)
//     const li = document.createElement("li");
//     li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
//     cartItems.appendChild(li);

//     console.log("Current Cart:", Cart);
//   }

// });





// Wait until the HTML document is fully loaded before running JS
document.addEventListener("DOMContentLoaded", () => {

  // ✅ Array of products with id, name, and price
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  // Array to store products added to the cart
  const cart = [];

  // Selecting DOM elements
  const productList = document.getElementById("product-list");     // Container for products
  const cartItems = document.getElementById("cart-items");         // Container for cart items
  const emptyCartMessage = document.getElementById("empty-cart");  // Message shown when cart is empty
  const cartTotalMessage = document.getElementById("cart-total");  // Message showing "Total"
  const totalPriceDisplay = document.getElementById("total-price");// Element showing total price
  const checkOutBtn = document.getElementById("checkout-btn");     // Checkout button

  // ✅ Render all products on the page dynamically
  products.forEach((product) => {
    const productDiv = document.createElement("div"); // Create a div for each product
    productDiv.classList.add("product");              // Add CSS class for styling

    // Add product name, price, and a button with data-id
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;

    // Append the product div to the product list container
    productList.appendChild(productDiv);
  });

  // ✅ Event delegation: Listen for clicks on "Add to cart" buttons
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {               // Only handle button clicks
      const productId = parseInt(e.target.getAttribute("data-id")); // Get product ID
      const product = products.find((p) => p.id === productId);     // Find product object by ID
      addToCart(product);                               // Call function to add product to cart
    }
  });

  // ✅ Function to add a product to the cart array
  function addToCart(product) {
    cart.push(product);  // Add product to cart
    renderCart();        // Update the cart UI
  }

  // ✅ Function to render the cart items and total price
  function renderCart() {
    cartItems.innerText = ""; // Clear previous cart items
    let totalPrice = 0;       // Initialize total price

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");       // Hide "empty cart" message
      cartTotalMessage.classList.remove("hidden");   // Show total price section

      // Loop through cart items and display them
      cart.forEach((item) => {
        totalPrice += item.price;  // Add item's price to total

        const cartItem = document.createElement("div"); // Create div for each cart item
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);               // Add to cart container
      });

      // Display total price
      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;

    } else {
      // If cart is empty
      emptyCartMessage.classList.remove("hidden");  // Show "empty cart" message
      cartTotalMessage.classList.add("hidden");    // Hide total price section
      totalPriceDisplay.textContent = `$0.00`;     // Reset total price
    }
  }

  // ✅ Checkout button: clear cart and show alert
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;               // Clear cart array
    alert("Checkout successfully"); // Show confirmation message
    renderCart();                  // Update cart UI to empty
  });

});