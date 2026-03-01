const endpoint = "https://kea-alt-del.dk/t7/api/categories";

fetch(endpoint)
  .then((res) => res.json())
  .then(showCategories);

function showCategories(categories) {
  const container = document.querySelector(".category_list_container");

  let markup = "";
  categories.forEach((elm) => {
    markup += `
      <a class="card" href="html/productlist.html?category=${encodeURIComponent(elm.category)}">
        ${elm.category}
      </a>
    `;
  });

  container.innerHTML = markup;
}
