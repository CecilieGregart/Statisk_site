// 1. Hent category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Skriv kategori som overskrift
document.querySelector("h2").textContent = category;

// 3. Byg endpoint med category
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=30`;

// allData = alle produkter fra API'et
// udsnit = den liste vi viser lige nu (efter filter/sortering)
let allData = [];
let udsnit = [];

// 4. Fetch produkter
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    allData = data; // gem alle produkter
    udsnit = data; // start med at vise alle
    showProducts(udsnit);
  });

// ---------- FILTRERING  ----------
document.querySelectorAll(".filter_btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const valgt = e.target.textContent; // "All", "Men", "Women", "Unisex"

    if (valgt === "All") {
      udsnit = allData;
    } else {
      udsnit = allData.filter((product) => product.gender === valgt);
    }

    showProducts(udsnit);
  });
});

// ---------- SORTERING ----------
document.querySelectorAll("#sorter button").forEach((knap) => {
  knap.addEventListener("click", sorter);
});

function sorter(e) {
  const textSort = e.target.dataset.text; // "az" eller "za"
  const priceSort = e.target.dataset.price; // "up" eller "down"

  // Sortér på en kopi (sort() ændrer originalt array)
  let sorted = [...udsnit];

  if (textSort) {
    if (textSort === "az") {
      // A-Z: stigende alfabetisk på produktnavn
      sorted.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname),
      );
    } else {
      // Z-A: faldende alfabetisk på produktnavn
      sorted.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname),
      );
    }
  } else if (priceSort) {
    if (priceSort === "up") {
      // Lav-høj: stigende pris
      sorted.sort((a, b) => a.price - b.price);
    } else {
      // Høj-lav: faldende pris
      sorted.sort((a, b) => b.price - a.price);
    }
  }

  udsnit = sorted;
  showProducts(udsnit);
}

// 5. Funktion der viser produkter
function showProducts(products) {
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
