const templateCard = document.querySelector("#template-card")?.content;
const cardContainer = document.querySelectorAll(".main__section-cards");

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
  console.log({ cardContainer, typeProductIndex, typeProduct });
  cardContainer[typeProductIndex].textContent = "";

  data.forEach((item) => {
    // ! implementar destructuring - este es  por filtrado
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".main__card-title").textContent = item.nombre;
    clone.querySelector(".main__card-price").textContent = `$${item.precio}`;
    clone.querySelector(".main__card-link").dataset.id = item.id;

    if (typeProduct === "All") {
      clone.querySelector(".action__delete").dataset.id = item.id;
      clone.querySelector(".action__edit").dataset.id = item.id;
    }

    clone.querySelector(".main__card-img").setAttribute("src", item.imagen);

    fragment.appendChild(clone);
  });
  cardContainer[typeProductIndex].appendChild(fragment);
};

const getAllDataProduct = async () => {
  try {
    const res = await fetch("https://aluragreek-api.herokuapp.com/productos");
    const data = await res.json();

    console.log(data);
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

      console.log(data);
      createCards(data, type);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
};

//* Evento click para las cards
document.addEventListener("click", (e) => {
  if (e.target.matches(".main__card-link")) {
    e.preventDefault();
    console.log(e.target.dataset.id);
  }
});

// console.log(window.location.pathname);

export { getDataProduct, getAllDataProduct };
