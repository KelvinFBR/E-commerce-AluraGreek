import { deleteProduct, editProduct } from "./action-admin.js";
import { deleteProductAlert } from "./alerts.js";
import { createModal, handleModalClose } from "./modal.js";

const templateCard = document.querySelector("#template-card")?.content;
const cardContainer = document.querySelectorAll(".main__section-cards");
const modal = document.querySelector("#modal");

let typeProductIndex;

const createCards = (data, typeProduct) => {
  const fragment = document.createDocumentFragment();

  switch (typeProduct) {
    case "StarWars":
      typeProductIndex = 0;
      break;

    case "Consolas":
      typeProductIndex = 1;
      break;

    case "Diversos":
      typeProductIndex = 2;
      break;

    case "All":
      typeProductIndex = 0;
      break;

    default:
      return console.warn("error de tipo producto");
  }

  // * limpieza container cards;
  cardContainer[typeProductIndex].textContent = "";

  data.forEach(({ nombre, precio, id, imagen }) => {
    // ! implementar destructuring - este es  por filtrado
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".main__card-title").textContent = nombre;
    clone.querySelector(".main__card-price").textContent = `$${precio}`;
    clone.querySelector(".main__card-link").dataset.id = id;

    if (typeProduct === "All") {
      clone.querySelector(".action__delete").dataset.id = id;
      clone.querySelector(".action__edit").dataset.id = id;
    }

    clone.querySelector(".main__card-img").setAttribute("src", imagen);

    fragment.appendChild(clone);
  });
  cardContainer[typeProductIndex].appendChild(fragment);
};

const getAllDataProduct = async () => {
  try {
    const res = await fetch("https://aluragreek-api.herokuapp.com/productos");
    const data = await res.json();

    createCards(data, "All");
  } catch (error) {
    console.log(error);
  } finally {
  }
};

const getDataProduct = (typeProduct) => {
  try {
    typeProduct.forEach(async (type) => {
      const res = await fetch(
        `https://aluragreek-api.herokuapp.com/productos?categoria=${type}`
      );

      const data = await res.json();

      createCards(data, type);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
};

//* Evento click para las cards
document.addEventListener("click", (e) => {
  const idProduct = e.target.dataset.id;

  if (e.target.matches(".main__card-link")) {
    e.preventDefault();
    modal.classList.add("active");

    createModal(idProduct);
  }

  //*Accciones eliminar y editar
  if (e.target.matches(".action__delete")) {
    deleteProduct(idProduct);
  }

  if (e.target.matches(".action__edit")) {
    editProduct(idProduct);
  }
});

// console.log(window.location.pathname);

export { getDataProduct, getAllDataProduct };
