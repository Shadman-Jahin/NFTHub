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
        runAfterPageLoad();
    }, remainingTime);
});

// * ---------------
// * AOS INITIALIZE

const runAfterPageLoad = () => {
    AOS.init({ once: false, duration: 1000, offset: 250, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
}


// * -------------------------------
// * LENIS INITIALIZATION (Corrected)
// * -------------------------------

// 1. Initialize Lenis with optimized settings
const lenis = new Lenis({
    lerp: 0.07,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    autoRaf: false,
});


function raf(time) {
    lenis.raf(time); // Tell Lenis the current time to calculate the scroll position
    requestAnimationFrame(raf); // Recursively call itself on the next frame
}
requestAnimationFrame(raf);



// * ===========================
// * COUNTER INCREMENT ANIMATION
// * ===========================

const counters = document.querySelectorAll('[data-custom-counter]');

counters.forEach(counter => {
    const target = +counter.getAttribute('data-custom-counter');
    const parent = counter.getAttribute('data-counter-aos-parent');
    const selectParent = document.querySelector(`${parent}`);

    let count = 0;
    const speed = 50; // lower = faster

    const updateCount = () => {
        const increment = Math.ceil(target / 100); // adjust smoothness

        if (count < target) {
            count += increment;
            counter.innerText = count > target ? target : count;
            setTimeout(updateCount, speed);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (selectParent.classList.contains("aos-animate")) {
                updateCount();
                observer.disconnect();
            }
        });
    });

    observer.observe(selectParent, { attributes: true, attributeFilter: ['class'] });

});



// * -----------------
// * CUSTOM SCROLLBAR

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




// * =====================
// * DARK MODE
// * =====================
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

