```javascript
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");


    // AUTOMATIC COPYRIGHT YEAR

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // MOBILE NAVIGATION MENU

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        // CLOSE MENU AFTER CLICKING A NAVIGATION LINK

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });


        // CLOSE MENU WHEN CLICKING OUTSIDE IT

        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });


        // CLOSE MENU WITH ESCAPE KEY

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });


        // CLOSE MENU IF SCREEN BECOMES DESKTOP SIZE

        window.addEventListener("resize", function () {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        });

    }


    // HIGHLIGHT ACTIVE NAVIGATION SECTION

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach(function (link) {

                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);

                    });

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );


        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }

});
```
