```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");

    // Automatically update the footer year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the mobile menu after clicking a navigation link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close the menu when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });

        // Close the mobile menu when switching to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }
});
```
