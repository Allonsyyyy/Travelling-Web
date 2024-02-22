'use strict';

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function() {
    this.classList.toggle("active");
    header.classList.toggle("active");
});



/**
 * 
hiển thị nút btn lên dưới cùng khi cuộn cửa sổ tới 500px
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function() {
    window.scrollY >= 500 ? goTopBtn.classList.add("active") :
        goTopBtn.classList.remove("active");
});
