import { alertSuccess } from "./alerts.js";

const formProduct = document.querySelector(".add-product__from");

const pathName = window.location.pathname;

const addProduct = async (product) => {
  const res = await fetch("https://aluragreek-api.herokuapp.com/productos", {
    method: "POST",
    body: JSON.stringify(product),

    headers: {
      "Content-Type": "application/json",
    },
  });
};

if (/add-product.html/g.test(pathName)) {
  formProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(formProduct);

    const name = data.get("name");
    const price = data.get("price");
    const img = data.get("urlImg");
    const description = data.get("description");
    const category = data.get("category");

    console.log(/^[0-9]{1,3}?(.)?[0-9]{1,3}$/.test(price));
    //* message alert
    if (
      name.trim().length <= 3 ||
      (price.trim().length <= 0 &&
        !/^[0-9]{1,3}?(.)?[0-9]{1,3}$/.test(price)) ||
      description.trim().length <= 10 ||
      category.trim().length <= 0 ||
      !/https/g.test(img)
    ) {
      document.querySelector(".add-product__alert").textContent =
        "Campos Incompletos/Campos Incorrectos";

      return;
    } else {
      document.querySelector(".add-product__alert").textContent = "";

      const dataProduct = {
        nombre: name,
        precio: price,
        descripcion: description,
        imagen: img,
        categoria: category,
        id: new Date().getTime(),
      };
      addProduct(dataProduct);

      //* alert producto agregado
      alertSuccess(img);
    }

    formProduct.reset();
  });
}
