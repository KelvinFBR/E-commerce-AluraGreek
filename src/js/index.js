import "./form-validate.js";
import { getDataProduct } from "./cards.js";

const pathName = window.location.pathname;

console.log(pathName);

if (/index.html/g.test(pathName)) {
  getDataProduct(["StarWars", "Consolas", "Diversos"]);
} else if (/administration-product.html/g.test(pathName)) {
  getDataProduct(["All"]);
}
