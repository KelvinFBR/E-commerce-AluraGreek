import { getDataProduct } from "./cards.js";

const templateCard = document.querySelector("#template-card")?.content;
const cardMain = document.querySelector(".main__section-cards");
const SectionTitle = document.querySelector(".main__section-title");

const seeMorePageInit = () => {
  const arrow = document.querySelector(".arrow__img");

  document.addEventListener("click", (e) => {
    let nameProduct = "";
    document.removeEventListener("click", arrow);

    if (e.target.matches(".main__btn")) {
      nameProduct = e.target.dataset.title;
      localStorage.setItem("nameProduct", JSON.stringify(nameProduct));
    } else if (e.target.matches(".arrow__img")) {
      nameProduct = e.target.parentElement.parentElement.dataset.title;
      localStorage.setItem("nameProduct", JSON.stringify(nameProduct));
    }
  });
};

const createCards = async (typeProduct) => {
  const fragment = document.createDocumentFragment();

  try {
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?categoria=${typeProduct}`
    );

    const data = await res.json();

    // * limpieza container cards;
    cardMain.textContent = "";

    data.forEach(({ nombre, precio, id, imagen }) => {
      // ! implementar destructuring - este es  por filtrado
      const clone = templateCard.cloneNode(true);
      clone.querySelector(".main__card-title").textContent = nombre;
      clone.querySelector(".main__card-price").textContent = `$${precio}`;
      clone.querySelector(".main__card-link").dataset.id = id;
      clone.querySelector(".main__card-img").setAttribute("src", imagen);

      fragment.appendChild(clone);
    });

    cardMain.appendChild(fragment);
  } catch (error) {
    console.log(error);
  }
};

const createProductSeeMore = () => {
  const nameProdructStorage = JSON.parse(localStorage.getItem("nameProduct"));

  //* cambiando nombre del titulo
  SectionTitle.textContent = nameProdructStorage;

  createCards(nameProdructStorage.replace(" ", ""));
};

export { seeMorePageInit, createProductSeeMore };
