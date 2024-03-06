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
 * show go top btn when scroll window to 500px
 */

const writeBlogBtn = document.getElementsByClassName('writeBlog')[0];
const footer = document.getElementsByClassName('footer')[0];

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function() {
    if(window.scrollY >= 500) goTopBtn.classList.add("active")
    else goTopBtn.classList.remove("active");
    
    // if(window.scrollY >= window.innerHeight - footer.clientHeight){
    //     writeBlogBtn.classList.add("hiddenWriteBlog");    
    // }
    // else{
    //     writeBlogBtn.classList.remove("hiddenWriteBlog");
    // }
});

