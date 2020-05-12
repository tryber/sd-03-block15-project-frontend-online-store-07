export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories', { method: 'GET' })
    .then((response) => response.json())
    .catch((erro) => console.log(erro));
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // implement here
}
