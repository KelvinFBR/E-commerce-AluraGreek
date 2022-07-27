import "./form-validate.js";
import { getAllDataProduct, getDataProduct } from "./cards.js";
import "./add-product.js";

const pathName = window.location.pathname;

console.log(pathName);

if (/E-commerce-AluraGreek\/index.html/g.test(pathName)) {
  getDataProduct(["StarWars", "Consolas", "Diversos"]);
} else if (
  /E-commerce-AluraGreek\/administration-product.html/g.test(pathName) ||
  /administration-product.html/g.test(pathName)
) {
  getAllDataProduct();
}
