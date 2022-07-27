import "./form-validate.js";
import "./add-product.js";
import "./auth.js";
import { getAllDataProduct, getDataProduct } from "./cards.js";
import {
  authenticationAdminPage,
  authenticationInit,
  authenticationLoginPage,
} from "./auth.js";

const pathName = window.location.pathname;
console.log(pathName);

authenticationInit();

if (
  /E-commerce-AluraGreek\/index.html/g.test(pathName) ||
  /index.html/g.test(pathName)
) {
  getDataProduct(["StarWars", "Consolas", "Diversos"]);
} else if (
  /E-commerce-AluraGreek\/administration-product.html/g.test(pathName) ||
  /administration-product.html/g.test(pathName)
) {
  authenticationAdminPage();
  getAllDataProduct();
} else if (
  /E-commerce-AluraGreek\/login.html/g.test(pathName) ||
  /login.html/g.test(pathName)
) {
  authenticationLoginPage();
}
