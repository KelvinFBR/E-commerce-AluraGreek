const templateModal = document.querySelector("#templateModal")?.content;
const modal = document.querySelector("#modal");

const handleModalClose = (modal) => {
  const modalClose = document.querySelector(".modal__close-container");
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.textContent = "";
  });
};

const createModal = async (id) => {
  const fragment = document.createDocumentFragment();

  try {
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?id=${id}`
    );

    const data = await res.json();

    data.forEach(({ nombre, precio, descripcion, imagen }) => {
      // * limpieza container modal;
      modal.textContent = "";

      // ! implementar destructuring - este es  por filtrado
      const clone = templateModal.cloneNode(true);
      clone.querySelector(".modal__title").textContent = nombre;
      clone.querySelector(".modal__price").textContent = `$${precio}`;
      clone.querySelector(".modal__description").textContent = descripcion;

      clone.querySelector(".modal__img").setAttribute("src", imagen);

      fragment.appendChild(clone);
    });

    modal.appendChild(fragment);
  } catch (error) {
    console.log(error);
    console.warn("modal no creado, Error!");
  } finally {
    handleModalClose(modal);
  }
};

export { handleModalClose, createModal };
