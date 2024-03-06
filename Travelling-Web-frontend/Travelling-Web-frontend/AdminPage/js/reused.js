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


// format time

const formatTime = (time) =>{
    return new Date(time).toLocaleString().replace("," , "</br>");
}