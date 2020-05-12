export async function getCategories() {
  fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
    .then((response) => response.json)
    .then((json) => console.log(json))
    .catch((erro) => console.log(erro));
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // implement here
}

getCategories();
