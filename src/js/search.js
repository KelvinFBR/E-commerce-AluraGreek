const iconSearch = document.querySelector(".nav__search");
const barSearch = document.querySelector(".nav__search-mobile-container");

iconSearch.addEventListener("click", () => {
  barSearch.classList.toggle("active");
  barSearch.querySelector("#search-mobile").focus();
});
