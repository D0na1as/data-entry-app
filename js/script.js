const productForm = document.querySelector(".product__entry");
const productCode = document.getElementById("product-code");
const productName = document.getElementById("product-name");
const productQuntity = document.getElementById("product-quantity");

const productSearchForm = document.querySelector(".product-search__entry");
const productSearchCode = document.getElementById("product-code-search");

const insertButton = document.querySelector(".button.button--insert");
const editButton = document.querySelector(".button.button--edit");
const deleteButton = document.querySelector(".button.button--delete");

const productsDataTable = document.querySelector(".product__table");

const productSearchButton = document.querySelector(
  ".button.product-search__button",
);

const prodyctsKey = "products";
const prodyctsBasketKey = "products_basket";

function checkAndCreateProductList() {
  console.log(localStorage.getItem(prodyctsKey));
  console.log(localStorage.getItem(prodyctsBasketKey));
  if (!localStorage.getItem(prodyctsKey)) {
    localStorage.setItem(prodyctsKey, JSON.stringify([]));
  }
  if (!localStorage.getItem(prodyctsBasketKey)) {
    localStorage.setItem(prodyctsBasketKey, JSON.stringify([]));
  }
}

function createObject(id, name, quantity) {
  return {
    id: id,
    name: name,
    quantity: quantity,
  };
}

function getProductIndex(id) {
  const productList = JSON.parse(localStorage.getItem(prodyctsKey));
  return productList.findIndex((item) => item.id === id);
}
function getProductInBasketIndex(id) {
  const productList = JSON.parse(localStorage.getItem(prodyctsBasketKey));
  return productList.findIndex((item) => item.id === id);
}

function updateItem(code, name, quantity) {
  const products = JSON.parse(localStorage.getItem(prodyctsKey));
  const basket = JSON.parse(localStorage.getItem(prodyctsBasketKey));
  console.log(products);
  const productIndex = getProductIndex(code);
  if (productIndex === -1) {
    alert("A product with this code do not exist");
    // delete from basket
    return;
  }
  const updatedProduct = createObject(code, name, quantity);
  products[productIndex] = updatedProduct;
  localStorage.setItem(prodyctsKey, JSON.stringify(products));
  loadProductsTable();

  const basketIndex = getProductInBasketIndex(code);
  if (basketIndex === -1) {
    return;
  }
  basket[basketIndex] = updatedProduct;
  localStorage.setItem(prodyctsBasketKey, JSON.stringify(basket));
  loadProductBasketTable();
}

function deleteProduct(code) {
  const products = JSON.parse(localStorage.getItem(prodyctsKey));
  const basket = JSON.parse(localStorage.getItem(prodyctsBasketKey));
  console.log(products);
  let productIndex = getProductIndex(code);
  let basketIndex = getProductInBasketIndex(code);
  if (basketIndex !== -1) {
    basket.splice(basketIndex, 1);
    localStorage.setItem(prodyctsBasketKey, JSON.stringify(basket));
    loadProductBasketTable();
  }
  if (productIndex === -1) {
    alert("A product with this code do not exist");
    return;
  }
  products.splice(productIndex, 1);
  localStorage.setItem(prodyctsKey, JSON.stringify(products));
  productCode.value = "";
  productName.value = "";
  productQuntity.value = "";
  loadProductsTable();
}

function loadProductsTable() {
  const productList = JSON.parse(localStorage.getItem(prodyctsKey));
  const existingTableHead = document.querySelector(".product__table-head");
  const existingTableBody = document.querySelector(".product__table-body");
  if (existingTableBody && existingTableHead) {
    existingTableBody.remove();
    existingTableHead.remove();
  }
  if (productList.length == 0) {
    return;
  }
  productList.sort((a, b) => b.id - a.id);
  const newTable = document.querySelector(".product__table");

  const newTableHead = document.createElement("thead");
  newTableHead.classList.add("product__table-head");
  const idHeadElement = document.createElement("th");
  const codeHeadElement = document.createElement("th");
  const quantityHedElement = document.createElement("th");
  idHeadElement.textContent = "Product code";
  codeHeadElement.textContent = "Product Name";
  quantityHedElement.textContent = "Product Quantity";
  const headRowElement = document.createElement("tr");
  headRowElement.append(idHeadElement, codeHeadElement, quantityHedElement);
  newTableHead.appendChild(headRowElement);
  newTable.appendChild(newTableHead);

  const newTableBody = document.createElement("tbody");
  newTableBody.classList.add("product__table-body");
  productList.forEach((product) => {
    const rowElement = document.createElement("tr");
    rowElement.classList.add("product__table-row");
    rowElement.dataset.id = product.id;
    const idCellElement = document.createElement("td");
    const nameCellElement = document.createElement("td");
    const quantityCellElement = document.createElement("td");
    idCellElement.textContent = product.id;
    nameCellElement.textContent = product.name;
    quantityCellElement.textContent = product.quantity;
    rowElement.append(idCellElement, nameCellElement, quantityCellElement);
    newTableBody.appendChild(rowElement);
    newTable.appendChild(newTableBody);

    const productForm = document.querySelector(".product__entry");
    productForm.insertAdjacentElement("afterend", newTable);
  });
}

function loadProductBasketTable() {
  const productList = JSON.parse(localStorage.getItem(prodyctsBasketKey));
  const existingTableHead = document.querySelector(
    ".product-search__table-head",
  );
  const existingTableBody = document.querySelector(
    ".product-search__table-body",
  );
  if (existingTableBody && existingTableHead) {
    existingTableBody.remove();
    existingTableHead.remove();
  }
  if (productList.length == 0) {
    return;
  }
  productList.sort((a, b) => a.id - b.id);
  const newTable = document.querySelector(".product-search__table");

  const newTableHead = document.createElement("thead");
  newTableHead.classList.add("product-search__table-head");
  const idHeadElement = document.createElement("th");
  const codeHeadElement = document.createElement("th");
  const quantityHedElement = document.createElement("th");
  idHeadElement.textContent = "Product code";
  codeHeadElement.textContent = "Product Name";
  quantityHedElement.textContent = "Product Quantity";
  const headRowElement = document.createElement("tr");
  headRowElement.append(idHeadElement, codeHeadElement, quantityHedElement);
  newTableHead.appendChild(headRowElement);
  newTable.appendChild(newTableHead);

  const newTableBody = document.createElement("tbody");
  newTableBody.classList.add("product-search__table-body");
  newTable.appendChild(newTableBody);
  productList.forEach((product) => {
    const rowElement = document.createElement("tr");
    rowElement.dataset.id = product.id;
    const idCellElement = document.createElement("td");
    const nameCellElement = document.createElement("td");
    const quantityCellElement = document.createElement("td");
    idCellElement.textContent = product.id;
    nameCellElement.textContent = product.name;
    quantityCellElement.textContent = product.quantity;
    rowElement.append(idCellElement, nameCellElement, quantityCellElement);
    newTableBody.appendChild(rowElement);
  });
}

checkAndCreateProductList();
loadProductsTable();
loadProductBasketTable();

insertButton.addEventListener("click", (event) => {
  event.preventDefault();

  checkAndCreateProductList();

  if (!productForm.reportValidity()) {
    return;
  }
  const productIndex = getProductIndex(parseInt(productCode.value));
  if (productIndex !== -1) {
    alert("A product with this code already exist");
    return;
  }
  const newObject = createObject(
    parseInt(productCode.value),
    productName.value,
    parseInt(productQuntity.value),
  );
  const products = JSON.parse(localStorage.getItem(prodyctsKey));
  products.push(newObject);
  localStorage.setItem(prodyctsKey, JSON.stringify(products));
  loadProductsTable();
});

editButton.addEventListener("click", (event) => {
  event.preventDefault();

  checkAndCreateProductList();

  if (!productForm.reportValidity()) {
    return;
  }
  const code = parseInt(productCode.value);
  const name = productName.value;
  const quantity = parseInt(productQuntity.value);

  updateItem(code, name, quantity);
});

deleteButton.addEventListener("click", (event) => {
  event.preventDefault();

  checkAndCreateProductList();

  if (!productCode.reportValidity()) {
    return;
  }
  const code = parseInt(productCode.value);
  deleteProduct(code);
});

productSearchButton.addEventListener("click", (event) => {
  event.preventDefault();

  checkAndCreateProductList();

  if (!productSearchForm.reportValidity()) {
    return;
  }
  const code = parseInt(productSearchCode.value);
  console.log(code);
  const products = JSON.parse(localStorage.getItem(prodyctsKey));
  console.log(code);
  const productBasketIndex = getProductInBasketIndex(code);
  if (productBasketIndex !== -1) {
    alert("A product with this code already exist in basket");
    return;
  }
  const productIndex = getProductIndex(code);
  if (productIndex === -1) {
    alert("A product is not in store");
    return;
  }

  const productBasket = JSON.parse(localStorage.getItem(prodyctsBasketKey));
  productBasket.push(products[productIndex]);
  localStorage.setItem(prodyctsBasketKey, JSON.stringify(productBasket));
  loadProductBasketTable();
});

productsDataTable.addEventListener("click", (event) => {
  event.preventDefault();

  const tableRow = event.target.closest(".product__table-row");
  if (!tableRow) {
    return;
  }
  const productId = parseInt(tableRow.dataset.id);
  const productIndex = getProductIndex(productId);
  if (productIndex === -1) {
    return;
  }
  const productList = JSON.parse(localStorage.getItem(prodyctsKey));
  const selectedProduct = productList[productIndex];
  productCode.value = selectedProduct.id;
  productName.value = selectedProduct.name;
  productQuntity.value = selectedProduct.quantity;
  loadProductsTable();
});
