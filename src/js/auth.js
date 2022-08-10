import { alertAccessAllow, alertAccessDenied } from "./alerts.js";

const userAuth = { auth: false };
const pathName = window.location.pathname;

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
      alertAccessDenied();

      setTimeout(() => {
        window.location = "./login.html";
      }, 2000);

      return;
    }
  }
};
const authenticationPerfilPage = () => {
  const storageAuth = JSON.parse(sessionStorage.getItem("auth"));

  if (storageAuth) {
    if (storageAuth.auth) {
      document.querySelector(".nav__btn-login").style.display = "none";
      return;
    }

    document.querySelector(".avatar").style.display = "none";
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
  authenticationPerfilPage,
};
