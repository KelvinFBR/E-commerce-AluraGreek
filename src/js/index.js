import "./form-validate.js";
import "./add-product.js";
import "./auth.js";
import "./search.js";
import { getAllDataProduct, getDataProduct } from "./cards.js";
import {
  authenticationAdminPage,
  authenticationInit,
  authenticationLoginPage,
} from "./auth.js";
import { searchInit } from "./search.js";

const pathName = window.location.pathname;

authenticationInit();

if (
  /E-commerce-AluraGreek\/index.html/g.test(pathName) ||
  /index.html/g.test(pathName)
) {
  getDataProduct(["StarWars", "Consolas", "Diversos"]);
  searchInit(false);
} else if (
  /E-commerce-AluraGreek\/administration-product.html/g.test(pathName) ||
  /administration-product.html/g.test(pathName)
) {
  authenticationAdminPage();
  getAllDataProduct();
  searchInit("admin");
} else if (
  /E-commerce-AluraGreek\/login.html/g.test(pathName) ||
  /login.html/g.test(pathName)
) {
  authenticationLoginPage();
} else if (
  /E-commerce-AluraGreek\/see-more-page.html/g.test(pathName) ||
  /see-more-page.html/g.test(pathName)
) {
  searchInit(false);
}
