// 1. Hent category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Skriv kategori som overskrift
document.querySelector("h2").textContent = category;

// 3. Byg endpoint med category
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=30`;

// Gem alle data + det aktuelle "udsnit" (bruges til filtrering + sortering)
let allData = [];
let udsnit = [];

// 4. Fetch produkter
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    udsnit = [...allData]; // kopi (så vi har et "udsnit" at arbejde med)
    showProducts(udsnit);
  });

// ===== Filtrering =====
// vælg alle filterknapper og sæt click eventlistener på hver
document.querySelectorAll(".filter_btn").forEach((knap) => {
  knap.addEventListener("click", filtrer);
});

function filtrer(e) {
  const valgt = e.target.textContent; // "All", "Men", "Women", "Unisex"

  if (valgt === "All") {
    udsnit = [...allData]; // vis alle (kopi)
  } else {
    udsnit = allData.filter((element) => element.gender === valgt); // filtrer
  }

  showProducts(udsnit); // vis filtrerede produkter
}

// ===== Sortering =====
// vælg alle sorter-knapper og sæt click eventlistener på hver
document.querySelectorAll("#sorter button").forEach((knap) => {
  knap.addEventListener("click", sorter);
});

function sorter(e) {
  const knap = e.target;

  // Her tjekker vi om der skal sorteres efter tekst eller pris
  if (knap.dataset.text) {
    // Sortering på navn (A-Z / Z-A)
    if (knap.dataset.text === "az") {
      udsnit = [...udsnit].sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname),
      );
    } else {
      udsnit = [...udsnit].sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname),
      );
    }
  } else if (knap.dataset.price) {
    // Sortering på pris (lav-høj / høj-lav)
    if (knap.dataset.price === "up") {
      udsnit = [...udsnit].sort((a, b) => a.price - b.price);
    } else {
      udsnit = [...udsnit].sort((a, b) => b.price - a.price);
    }
  }

  // Vis det sorterede udsnit
  showProducts(udsnit);
}

// 5. Funktion der viser produkter
function showProducts(products) {
  console.table(products);

  const container = document.querySelector(".product_list_container");

  let markup = "";

  products.forEach((product) => {
    markup += `
      <a class="product_card ${product.soldout ? "soldout" : ""}" href="product.html?id=${product.id}">
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
