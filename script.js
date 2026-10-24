```javascript
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const backToTop = document.getElementById("backToTop");
    const year = document.getElementById("year");

    /* CURRENT YEAR */

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* MOBILE MENU */

    if (menuToggle && navMenu) {

        function closeMenu() {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("click", event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        });

    }

    /* BACK TO TOP */

    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 350
        );

    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* SCROLL REVEAL */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-text, .about-card, " +
        ".service-card, .tool-card, .contact-box"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");
            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }

    /* STAGGERED CARD ANIMATION */

    document.querySelectorAll(
        ".service-card, .tool-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 3) * 0.08}s`;

    });

    /* ACTIVE NAVIGATION */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        "#navMenu a"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navigationLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }

                        link.classList.toggle("active", isActive);

                    });

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }

    /* PREVENT FLASH ON LOAD */

    document.body.classList.add("loaded");

});
```
