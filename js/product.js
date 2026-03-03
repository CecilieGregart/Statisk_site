const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(endpoint)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(product) {
  console.log(product);

  document.querySelector(".product_title").textContent =
    product.productdisplayname;
  document.querySelector(".product_brand").textContent = product.brandname;

  const img = document.querySelector(".product_media img");
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  img.alt = product.productdisplayname;

  document.querySelector(".new_price").textContent = `DKK ${product.price}`;

  if (product.discount) {
    document.querySelector(".product_discount").textContent =
      `${product.discount}%`;
  } else {
    document.querySelector(".product_discount").style.display = "none";
  }

  const dds = document.querySelectorAll(".product_meta dd");
  dds[0].textContent = product.category;
  dds[1].textContent = product.basecolour;
  dds[2].textContent = product.sizetext;
  dds[3].textContent = product.soldout ? "Sold out" : "In stock";
}
