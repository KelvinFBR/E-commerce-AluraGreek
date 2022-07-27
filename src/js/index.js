import "./form-validate.js";
import { getAllDataProduct, getDataProduct } from "./cards.js";
import "./add-product.js";

const pathName = window.location.pathname;

console.log(pathName);

if (/index.html/g.test(pathName) || /E-commerce-AluraGreek/g.test(pathName)) {
  getDataProduct(["StarWars", "Consolas", "Diversos"]);
} else if (
  /E-commerce-AluraGreek\/administration-product.html/g.test(pathName)
) {
  getAllDataProduct();
}
