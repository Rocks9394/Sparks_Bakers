
const navToggle  = document.getElementById("nav-toggle");

navToggle.addEventListener("click",()=>{
    const hideItemsNavbar =document.getElementsByClassName("block-nav-menu")[0];
    console.log(window.getComputedStyle(hideItemsNavbar).display)
    if( window.getComputedStyle(hideItemsNavbar).display==="none"){
        hideItemsNavbar.style.display="block"
    }else {
        hideItemsNavbar.style.display="none"
    }
})

