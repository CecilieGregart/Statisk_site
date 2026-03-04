// 1. Hent category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Skriv kategori som overskrift
document.querySelector("h2").textContent = category;

// 3. Byg endpoint med category
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=10`;

// 4. Fetch produkter
fetch(endpoint)
  .then((res) => res.json())
  .then(showProducts);

// 5. Funktion der viser produkter
function showProducts(products) {
  console.table(products);

  const container = document.querySelector(".product_list_container");

  let markup = "";

  products.forEach((product) => {
    markup += `
      <a class="product_card ${product.soldout ? "soldOut" : ""}" href="product.html?id=${product.id}">
        <h3>${product.productdisplayname}</h3>
        <p>${product.brandname}</p>
        <p>${product.price} kr</p>

        ${product.discount ? `<span class="discount">${product.discount}%</span>` : ""}

        ${product.soldout ? `<span class="soldout_badge">SOLD OUT</span>` : ""}
      </a>
    `;
  });

  container.innerHTML = markup;
}
