$(document).ready(function () {
  // Define the API endpoint
  

  // Function to fetch products from the API
  function fetchProducts() {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/services-gestion`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        displayProducts(response);
      },
      error: function (xhr, status, error) {
        console.error("Failed to fetch products:", error);
      },
    });
  }

  // Function to display products on the page
  function displayProducts(products) {
    var productContainer = $("#product-container");
    productContainer.empty(); // Clear existing products
    console.log("products", products?.data);

    products?.data.forEach(function (product) {
      var productHtml = `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card h-100">
            <img src="${apiConfig.apiUrl}/${product.photo}" class="card-img-top" alt="Product" style="height: 200px; object-fit: cover"/>
            <div class="card-body text-center">
              <h5 class="card-title text-dark">${product.name}</h5>
              <p class="card-text text-dark">${product.price}Cfa</p>
            </div>
            <button class="btn btn-primary add-to-cart-btn" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}"
                    data-photo="${product.photo}"
                    style="background-color: #363030; border: none;">Ajouter au panier</button>
          </div>
        </div>`;
      productContainer.append(productHtml);
    });

    // Attach click event listeners to "Add to Cart" buttons after products are displayed
    $(".add-to-cart-btn").on("click", addToCart);
  }

  // Function to add item to cart
  function addToCart(event) {
    const productId = $(this).data("id");
    const productName = $(this).data("name");
    const productPrice = $(this).data("price");
    const productPic=$(this).data("photo");

    // Create a product object
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1, // default quantity
      photo:productPic
    };

    // Retrieve the existing cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      alert(`${productName} a été deja ajouté au panier.`);
    } else {
      // Otherwise, add the new product to the cart
      cart.push(product);
      alert(`${productName} a été ajouté au panier.`);
    
      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    
      // Refresh the page to reflect changes (e.g., cart count)
      location.reload(); // Refresh the current page
    }
    

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Fetch products on page load
  fetchProducts();
});
