const iconSearch = document.querySelector(".nav__search");
const barSearch = document.querySelector(".nav__search-mobile-container");
const inputSearch = document.querySelector("#search-mobile");
const cardMain = document.querySelector(".main__product-search");
const templateCard = document.querySelector("#template-card")?.content;

let allProduct;

const createCards = (data, page) => {
  const fragment = document.createDocumentFragment();

  console.log(page);
  // * limpieza container cards;
  cardMain.textContent = "";

  data.forEach((item) => {
    // ! implementar destructuring - este es  por filtrado
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".main__card-title").textContent = item.nombre;
    clone.querySelector(".main__card-price").textContent = `$${item.precio}`;
    clone.querySelector(".main__card-link").dataset.id = item.id;

    if (page === "admin") {
      clone.querySelector(".action__delete").dataset.id = item.id;
      clone.querySelector(".action__edit").dataset.id = item.id;
    }

    clone.querySelector(".main__card-img").setAttribute("src", item.imagen);

    fragment.appendChild(clone);
  });
  cardMain.appendChild(fragment);
};

const searchProduct = async (word, page) => {
  const regExp = new RegExp(word, "i");

  console.log(regExp);
  console.log(allProduct);
  console.log(word);
  const products = allProduct.filter(
    (prod) => regExp.test(prod.categoria) || regExp.test(prod.nombre)
  );
  console.log(products);
  // console.log(data);
  createCards(products, page);
};

const getAllDataProduct = async () => {
  try {
    const res = await fetch("https://aluragreek-api.herokuapp.com/productos");
    const data = await res.json();

    allProduct = [...data];
    return allProduct;
  } catch (error) {
    console.log(error);
  }
};

const searchInit = (page) => {
  //* focus input search
  iconSearch.addEventListener("click", () => {
    barSearch.classList.toggle("active");
    inputSearch.focus();
  });

  //* get data for to searching
  inputSearch.addEventListener("focus", () => {
    console.log("focus");
    getAllDataProduct();
  });

  //* get word search
  inputSearch.addEventListener("keyup", () => {
    cardMain.classList.add("index");
    const wordSearch = [`${inputSearch.value}`];
    searchProduct(wordSearch, page);
  });
};

export { searchInit };
