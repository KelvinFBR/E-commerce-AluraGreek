import { alertSuccessEdit } from "./alerts.js";

const formProductEdit = document.querySelector(".add-product__from");

const modal = document.querySelector(".modal__form");

const toggleModalEdit = (modal) => {
  const modalCloseEdit = document.querySelector(".modal__close-edit");
  modal.classList.add("active");

  modalCloseEdit.addEventListener("click", () => {
    modal.classList.remove("active");
  });
};

const deleteProduct = async (id) => {
  await fetch(`https://aluragreek-api.herokuapp.com/productos/${id}`, {
    method: "DELETE",
  });

  //* recargar;
  window.location.reload();
};

const editProduct = async (id) => {
  try {
    const res = await fetch(
      `https://aluragreek-api.herokuapp.com/productos?id=${id}`
    );

    const data = await res.json();
    const { imagen, categoria, nombre, precio, descripcion } = data[0];

    formProductEdit.urlImg.value = imagen;
    formProductEdit.category.value = categoria;
    formProductEdit.name.value = nombre;
    formProductEdit.price.value = precio;
    formProductEdit.description.value = descripcion;
  } catch (error) {
    console.log(error);
  } finally {
    toggleModalEdit(modal);
    //* recargar;
    //   window.location.reload();

    getDataEdit(id);
  }
};

const getDataEdit = (id) => {
  try {
    formProductEdit.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(formProductEdit);

      const name = data.get("name");
      const price = data.get("price");
      const img = data.get("urlImg");
      const description = data.get("description");
      const category = data.get("category");

      //* message alert
      if (
        name.trim().length <= 0 ||
        price.trim().length <= 0 ||
        description.trim().length <= 10 ||
        category.trim().length <= 0 ||
        !/https/g.test(img)
      ) {
        return {};
      } else {
        const dataProduct = {
          nombre: name,
          precio: price,
          descripcion: description,
          imagen: img,
          categoria: category,
          id: new Date().getTime(),
        };

        await fetch(`https://aluragreek-api.herokuapp.com/productos/${id}`, {
          method: "PUT",
          body: JSON.stringify(dataProduct),

          headers: {
            "Content-Type": "application/json",
          },
        });

        //* alert producto agregado
        alertSuccessEdit(img);
        console.log("actualizado");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { deleteProduct, editProduct };
