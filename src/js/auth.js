import { alertAccessAllow, alertAccessDenied } from "./alerts.js";

const userAuth = { auth: false };

const authenticationInit = () => {
  const storageAuth = JSON.parse(sessionStorage.getItem("auth"));

  if (!storageAuth) {
    sessionStorage.setItem("auth", JSON.stringify(userAuth));
  }
};

const authentication = () => {
  const newUserAuth = { ...userAuth };
  newUserAuth.auth = true;
  sessionStorage.setItem("auth", JSON.stringify(newUserAuth));
};

const authenticationAdminPage = () => {
  const storageAuth = JSON.parse(sessionStorage.getItem("auth"));

  if (storageAuth) {
    if (!storageAuth.auth) {
      console.log("Permisos Denegado");

      alertAccessDenied();

      setTimeout(() => {
        window.location = "./login.html";
      }, 2000);

      return;
    }
  }
};

const authenticationLoginPage = () => {
  const storageAuth = JSON.parse(sessionStorage.getItem("auth"));

  if (storageAuth) {
    if (storageAuth.auth) {
      alertAccessAllow();

      setTimeout(() => {
        window.location = "./administration-product.html";
      }, 2000);

      return;
    }
  }
};

export {
  authenticationAdminPage,
  authenticationLoginPage,
  authenticationInit,
  authentication,
};
