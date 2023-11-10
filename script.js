const hideItemsNavbar =document.getElementsByClassName("block-nav-menu")[0];

const navToggle  = document.getElementById("nav-toggle");

navToggle.addEventListener("click",()=>{
    console.log(hideItemsNavbar.style.display)
    if( hideItemsNavbar.style.display==="none"){
        hideItemsNavbar.style.display = "block"
    }else if(hideItemsNavbar.style.display==="block"){
        hideItemsNavbar.style.display ="none"
    }
})

