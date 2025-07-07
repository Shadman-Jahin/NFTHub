// ---------
// LOADER

const loader = document.querySelector(".loading");
window.addEventListener("load", () => {
    loader.classList.add("active");
});



// -----------------
// CUSTOM SCROLLBAR
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = () => {
    let height = (window.pageYOffset / totalHeight) * 100;
    document.documentElement.style.setProperty("--scrollbar-height", height + "%");
}


// --------------
// CURSOR

const cursor = document.querySelector(".cursor");
document.addEventListener("pointermove", e => {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.translate = `-50% -50%`;

});

document.addEventListener("click", () => {
    cursor.style.boxShadow = `0 0 0 1.5rem #0000`;
    setTimeout(() => {
        cursor.style.transition = `none`;
        cursor.style.boxShadow = `0 0 0 0 #f07`
    }, 500);
    cursor.style.transition = `box-shadow .5s`;
});



// ---------------
// AOS INITIALIZE

AOS.init();



const darkModeCheckbox = document.querySelector("#dark");

if (darkModeCheckbox) {
    // Initialize checkbox state from localStorage
    const isActive = JSON.parse(localStorage.getItem("active") || "false");
    darkModeCheckbox.checked = isActive;

    // Listen for changes and update localStorage
    darkModeCheckbox.addEventListener("change", e => {
        localStorage.setItem("active", JSON.stringify(e.target.checked));
    });
}




// ===================
// INITIALIZE SWIPER

const swiper = new Swiper('.carousel-custom', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // RESPONSIVE
    watchOverflow: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    }


    // CSS COMMON STYLES

    //  .swiper-pagination-bullet 
    //  .swiper-pagination-bullet-active




});

