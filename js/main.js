// ---------
// LOADER

window.addEventListener("load", () => {
    const navEntries = performance.getEntriesByType("navigation");
    const loadTime = navEntries.length
        ? navEntries[0].loadEventEnd - navEntries[0].startTime
        : performance.now();

    const minimumTime = 1000; // 1s 
    const remainingTime = Math.max(0, minimumTime - loadTime);

    setTimeout(() => {
        document.querySelector(".loading")?.remove();
    }, remainingTime);
});



// -------------------------------
// LENIS INITIALIZATION (Corrected)
// -------------------------------

// 1. Initialize Lenis with optimized settings
const lenis = new Lenis({
    // VITAL CHANGE: Lower the duration for a snappier, less laggy feel. 
    // The official site is very responsive.
    // 1.5s is quite long and makes it feel heavy/laggy.
    duration: 1.2,

    // OPTIONAL: Use 'lerp' instead of 'duration' for more natural physics-based smoothness.
    // lenis.darkroom.engineering likely uses a low 'lerp'.
    // NOTE: 'duration' will be ignored if 'lerp' is defined.
    // Try uncommenting 'lerp' and commenting 'duration' to test a super-smooth feel.
    // lerp: 0.07, 

    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,

    // OPTIMIZED: Adjusted multiplier down. A wheelMultiplier of 1.5 or 2 can feel too fast.
    wheelMultiplier: 1.5,

    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,

    // CRITICAL FIX: Set autoRaf to false and manually implement the loop. 
    // This is the standard, most reliable method, ensuring the instance is globally available.
    autoRaf: false,
});


// 2. The CRITICAL requestAnimationFrame (RAF) loop
// This function must be outside your initialization wrapper to work correctly.
function raf(time) {
    lenis.raf(time); // Tell Lenis the current time to calculate the scroll position
    requestAnimationFrame(raf); // Recursively call itself on the next frame
}

// 3. Start the loop
requestAnimationFrame(raf);

// (Optional) Add a listener to log scroll events for debugging
lenis.on('scroll', (e) => {
    console.log(e);
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

