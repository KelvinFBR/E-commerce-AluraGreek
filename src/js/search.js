const iconSearch = document.querySelector(".nav__search");
const barSearch = document.querySelector(".nav__search-mobile-container");
const inputSearchMobile = document.querySelector("#search-mobile");
const inputSearchDesktop = document.querySelector("#search");
const cardMain = document.querySelector(".main__product-search");
const templateCard = document.querySelector("#template-card")?.content;

let allProduct = [];

const createCards = (data, page) => {
  const fragment = document.createDocumentFragment();

  // * limpieza container cards;
  cardMain.textContent = "";

  data.forEach(({ nombre, precio, id, imagen }) => {
    // ! implementar destructuring - este es  por filtrado
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".main__card-title").textContent = nombre;
    clone.querySelector(".main__card-price").textContent = `$${precio}`;
    clone.querySelector(".main__card-link").dataset.id = id;

    if (page === "admin") {
      clone.querySelector(".action__delete").dataset.id = id;
      clone.querySelector(".action__edit").dataset.id = id;
    }

    clone.querySelector(".main__card-img").setAttribute("src", imagen);

    fragment.appendChild(clone);
  });
  cardMain.appendChild(fragment);
};

const searchProduct = async (word, page) => {
  const regExp = new RegExp(word, "i");

  const products = allProduct.filter(
    (prod) => regExp.test(prod.categoria) || regExp.test(prod.nombre)
  );
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

const inputEventListener = (input, page) => {
  //* get data for to searching
  input.addEventListener("focus", () => {
    getAllDataProduct();
  });

  //* get word search mobile & desktop
  input.addEventListener("keyup", () => {
    cardMain.classList.add("index");
    const wordSearch = [`${input.value}`];
    searchProduct(wordSearch, page);
  });
};

const searchInit = (page) => {
  //* focus input search
  iconSearch.addEventListener("click", () => {
    barSearch.classList.toggle("active");
    inputSearchMobile.focus();
  });

  // mobile
  inputEventListener(inputSearchMobile, page);
  // desktop
  inputEventListener(inputSearchDesktop, page);
};

export { searchInit };
