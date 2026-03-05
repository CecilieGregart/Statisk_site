// 1. Hent category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Skriv kategori som overskrift
document.querySelector("h2").textContent = category;

// 3. Byg endpoint med category
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=30`;

// Gem alle produkter her - filtrere dem
let allProducts = [];

// 4. Fetch produkter
fetch(endpoint)
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;
    showProducts(allProducts);
  });

// Filtrering (trin 2)
document.querySelectorAll(".filter_btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.textContent; // "All", "Men", "Women", "Unisex"
    if (filter === "All") {
      showProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.gender === filter,
      );
      showProducts(filtered);
    }
  });
});

// 5. Funktion der viser produkter
function showProducts(products) {
  console.table(products);

  const container = document.querySelector(".product_list_container");

  let markup = "";

  products.forEach((product) => {
    markup += `
  <a class="product_card ${product.soldout ? "soldout" : ""}" href="product.html?id=${product.id}">

    <div class="img_wrap">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
           alt="${product.productdisplayname}" />

      ${product.soldout ? `<span class="soldout_badge">SOLD OUT</span>` : ""}
    </div>

    <h3>${product.productdisplayname}</h3>
    <p class="brand">${product.brandname}</p>

    <p class="price">
      <span class="new_price">${product.price} kr</span>
      ${product.discount ? `<span class="discount_text">${product.discount}%</span>` : ""}
    </p>

  </a>
  `;
  });

  container.innerHTML = markup;
}
