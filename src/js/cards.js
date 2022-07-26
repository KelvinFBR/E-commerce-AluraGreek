const templateCard = document.querySelector("#template-card").content;
const cardContainer = document.querySelectorAll(".main__section-cards");

// console.log(cardContainer);
let typeProductIndex = "";

const images = {
  StarWars: {
    "starwars1.png": "https://i.imgur.com/MtQn0zP.png",
    "starwars2.png": "https://i.imgur.com/RPPvIkI.png",
    "starwars3.png": "https://i.imgur.com/43D8WtY.png",
    "starwars4.png": "https://i.imgur.com/eMvOd9F.png",
    "starwars5.png": "https://i.imgur.com/kkPW4EM.png",
    "starwars6.png": "https://i.imgur.com/yEf71lk.png",
  },
  Consolas: {
    "consolas1.png": "https://i.imgur.com/6JwiIvv.png",
    "consolas2.png": "https://i.imgur.com/jMFkVpj.png",
    "consolas3.png": "https://i.imgur.com/NLz3S6H.png",
    "consolas4.png": "https://i.imgur.com/6Tl3E47.png",
    "consolas5.png": "https://i.imgur.com/EZxHvKG.png",
    "consolas6.png": "https://i.imgur.com/K5sKSdt.png",
  },
  Diversos: {
    "diversos1.png": "https://i.imgur.com/vCOJL6u.png",
    "diversos2.png": "https://i.imgur.com/dUUYNky.png",
    "diversos3.png": "https://i.imgur.com/w32jKud.png",
    "diversos4.png": "https://i.imgur.com/ilZffan.png",
    "diversos5.png": "https://i.imgur.com/CVrAGDa.png",
    "diversos6.png": "https://i.imgur.com/Z2kxJTZ.png",
  },

  All: {
    "starwars1.png": "https://i.imgur.com/MtQn0zP.png",
    "starwars2.png": "https://i.imgur.com/RPPvIkI.png",
    "starwars3.png": "https://i.imgur.com/43D8WtY.png",
    "starwars4.png": "https://i.imgur.com/eMvOd9F.png",
    "starwars5.png": "https://i.imgur.com/kkPW4EM.png",
    "starwars6.png": "https://i.imgur.com/yEf71lk.png",
    "consolas1.png": "https://i.imgur.com/6JwiIvv.png",
    "consolas2.png": "https://i.imgur.com/jMFkVpj.png",
    "consolas3.png": "https://i.imgur.com/NLz3S6H.png",
    "consolas4.png": "https://i.imgur.com/6Tl3E47.png",
    "consolas5.png": "https://i.imgur.com/EZxHvKG.png",
    "consolas6.png": "https://i.imgur.com/K5sKSdt.png",
    "diversos1.png": "https://i.imgur.com/vCOJL6u.png",
    "diversos2.png": "https://i.imgur.com/dUUYNky.png",
    "diversos3.png": "https://i.imgur.com/w32jKud.png",
    "diversos4.png": "https://i.imgur.com/ilZffan.png",
    "diversos5.png": "https://i.imgur.com/CVrAGDa.png",
    "diversos6.png": "https://i.imgur.com/Z2kxJTZ.png",
  },
};

const createCards = (data, typeProduct) => {
  console.log();
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
      typeProductIndex = 2;
      break;

    default:
      return console.warn("error de tipo producto");
  }

  // * limpieza container cards;
  cardContainer[typeProductIndex].textContent = "";

  data.forEach((item) => {
    // ! implementar destructuring - este es  por filtrado
    if (item.categoria === typeProduct || typeProduct === "All") {
      const clone = templateCard.cloneNode(true);
      clone.querySelector(".main__card-title").textContent = item.nombre;
      clone.querySelector(".main__card-price").textContent = `$${item.precio}`;
      clone.querySelector(".main__card-link").dataset.id = item.id;

      clone
        .querySelector(".main__card-img")
        .setAttribute(
          "src",
          /https/g.test(item.images)
            ? item.images
            : images[typeProduct][item.imagen]
        );

      fragment.appendChild(clone);
    }
  });
  cardContainer[typeProductIndex].appendChild(fragment);
};

const getDataProduct = async () => {
  try {
    const res = await fetch(
      "https://orac-e-commerce-project.herokuapp.com/productos"
    );
    const data = await res.json();

    // createCards(data, "StarWars");
    // createCards(data, "Consolas");
    // createCards(data, "Diversos");
    createCards(data, "All");
  } catch (error) {
    console.log(error);
  } finally {
  }
};

getDataProduct();

console.log(
  document.addEventListener("click", (e) => {
    if (e.target.matches(".main__card-link")) {
      e.preventDefault();
      console.log(e.target.dataset.id);
    }
  })
);

// console.log(window.location.pathname);
