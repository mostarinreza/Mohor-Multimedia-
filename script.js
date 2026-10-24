```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const progressBar = document.getElementById("pageProgress");
    const yearElement = document.getElementById("currentYear");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = [...document.querySelectorAll("main section[id]")];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Automatically update the copyright year.
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Reveal content smoothly as it enters the viewport.
    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // Close the mobile navigation menu.
    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        document.body.classList.remove("menu-open");
    }

    // Toggle the mobile menu.
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        // Close the menu after a navigation link is selected.
        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", (event) => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Escape closes the mobile menu.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Reset navigation when switching back to desktop.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }

    // Header shadow and reading progress.
    let ticking = false;

    function updateScrollEffects() {
        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (header) {
            header.classList.toggle("scrolled", scrollTop > 15);
        }

        if (progressBar) {
            const progress = scrollableHeight > 0
                ? (scrollTop / scrollableHeight) * 100
                : 0;

            progressBar.style.width = `${progress}%`;
        }

        ticking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        },
        { passive: true }
    );

    updateScrollEffects();

    // Highlight the navigation link for the current section.
    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length === 0) return;

                const activeId = visibleSections[0].target.id;

                navLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${activeId}`;

                    link.classList.toggle("active", isActive);
                });
            },
            {
                rootMargin: "-25% 0px -55% 0px",
                threshold: [0, 0.15, 0.35, 0.6]
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Prevent empty placeholder email links from navigating.
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const email = link.getAttribute("href");

            if (
                email === "mailto:YOUR_EMAIL@example.com" ||
                email === "mailto:"
            ) {
                event.preventDefault();

                alert(
                    "Please add your real email address in index.html " +
                    "before using the contact button."
                );
            }
        });
    });
});
```
