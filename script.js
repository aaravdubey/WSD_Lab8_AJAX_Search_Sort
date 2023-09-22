const cardContainer = document.getElementById('card-container');
let products = [];

function fetchProducts() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://dummyjson.com/products', true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = JSON.parse(xhr.responseText);
      products = data.products;
      console.log(data);

      displayCards(products);
    }
  }

  xhr.send();
}

function displayCards(products) {
  cardContainer.innerHTML = '';

  products.forEach(product => {
    createCard(product);
  });
}

function createCard(product) {
  const cardCont = document.createElement('div');
  cardCont.classList.add('px-3', 'col-4');

  const card = document.createElement('div');
  card.classList.add('card', 'mb-3', 'shadow');

  const cardImage = document.createElement('img');
  cardImage.src = product.images[0];
  cardImage.classList.add('card-img-top')

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = product.title;

  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card-text');
  cardDescription.textContent = product.description;

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('card-text');
  cardPrice.textContent = `Price: $${product.price}`;

  const cardDiscount = document.createElement('p');
  cardDiscount.classList.add('card-text');
  cardDiscount.textContent = `Discount: ${product.discountPercentage}%`;

  const cardStock = document.createElement('p');
  cardStock.classList.add('card-text');
  cardStock.textContent = `Stock: ${product.stock} units`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardDiscount);
  cardBody.appendChild(cardStock);

  card.appendChild(cardImage);
  card.appendChild(cardBody);

  cardCont.appendChild(card)
  cardContainer.appendChild(cardCont);
}

function searchProduct(event) {
  event.preventDefault();

  const formdata = new FormData(event.target);
  let searchText = formdata.get('searchtext');
  let = formdata.get('searchtext');
  console.log(formdata.get('options'));

  cardContainer.innerHTML = '';

  products.forEach(product => {
    if (product.title.toLowerCase().includes(searchText.toLowerCase()) || product.brand.toLowerCase().includes(searchText.toLowerCase()) || product.category.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase())) {
      createCard(product);
    }
  });
}

function sortBy(event) {
  let sortedProducts = [];

  if (event.target.value == 'name') sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
  else if (event.target.value == 'price') sortedProducts = products.sort((a, b) => a.price - b.price);
  else if (event.target.value == 'discount') sortedProducts = products.sort((a, b) => a.discountPercentage - b.discountPercentage);
  
  displayCards(sortedProducts);
  // console.log(event.target.value);
}

fetchProducts();