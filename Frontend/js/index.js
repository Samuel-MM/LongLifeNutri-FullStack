const API_URL='http://localhost:3000';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const keyWord = document.querySelector('.search-input').value;

  const productData = await fetchData(keyWord);
  removeLoadingAnimation();
  createProducts(productData);
})

async function fetchData(keyWord) {
  const url = `${API_URL}/api/scrape?keyWord=${keyWord}`;
  try {
    addLoadingAnimation();
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    removeLoadingAnimation();
    showError();
    console.error(error);
    return;
  }
}

function createProducts(productData) {
  const productDataList = Array.from(productData);
  const productSection = document.getElementById("product-section");
  productDataList.forEach(product => {
    const productRating = (product.rating.trim() === "") ? "Sem Avaliações" : product.rating;
    const productReviews = (product.reviewsNumber.trim() === "") ? "-" : product.reviewsNumber;
    const productContainer = document.createElement("div");
    productContainer.classList.add("grid-item");
    productContainer.innerHTML = `
      <div class="img-container">
        <img src="${product.url}" alt="Product image">
      </div>
      <h3 class="title">${product.title}</h3>
      <div class="rating">
        <span class="rating-value">${productRating}</span>
        <span class="num-ratings">${productReviews}</span>
      </div>
    `
    productSection.appendChild(productContainer);
  });
  document.getElementById("result-text").innerText = "Resultados";
}

function addLoadingAnimation() {
  const main = document.getElementById("main");
  const loadingContainer = document.createElement("div");
  loadingContainer.id = "loading-section"
  loadingContainer.classList.add("loading-container");

  loadingContainer.innerHTML = '<div class="loading-circle"></div>'
  main.appendChild(loadingContainer);
}

function removeLoadingAnimation() {
  const loadingContainer = document.getElementById("loading-section");
  if (!loadingContainer) return;
  loadingContainer.parentNode.removeChild(loadingContainer)
}

function showError() {
  const main = document.getElementById("main");
  const errorSection = document.createElement("h2");
  errorSection.classList.add("error-text");
  errorSection.innerText = "Desculpe, houve um erro. Tente novamente mais tarde";
  main.appendChild(errorSection)
}
