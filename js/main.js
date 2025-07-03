const darkModeCheckbox = document.querySelector("input[type='checkbox']#dark");

if (darkModeCheckbox) {
    // Initialize checkbox state from localStorage
    const isActive = JSON.parse(localStorage.getItem("active") || "false");
    darkModeCheckbox.checked = isActive;

    // Listen for changes and update localStorage
    darkModeCheckbox.addEventListener("change", e => {
        localStorage.setItem("active", JSON.stringify(e.target.checked));
    });
}


