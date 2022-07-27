// Alerts
const alertSuccess = (img) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado con exito",
    confirmButtonColor: "#3085d6",
    denyButtonColor: "#747E7E",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Ir A Menú Administrador",
    denyButtonText: `Agregar Otro Producto`,
    width: "34em",
    imageUrl: img,
    imageWidth: "90%",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location = "./administration-product.html";
    }
  });
};

const alertAccessDenied = () => {
  document.querySelector("main").textContent = "";
  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Acceso Denegado, Iniciar sesion",
    showConfirmButton: false,
    width: "34em",
  });
};

const alertAccessAllow = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Usuario identificado",
    showConfirmButton: false,
    width: "34em",
  });
};

export { alertAccessAllow, alertSuccess, alertAccessDenied };
