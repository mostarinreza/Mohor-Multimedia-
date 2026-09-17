/* =========================================
   MOHOR MULTIMEDIA
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuToggle.textContent =
                navMenu.classList.contains("active")
                    ? "✕"
                    : "☰";

        });


        // Close menu after clicking a link

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================
       BACK TO TOP
    ===================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-text, .about-card, .service-card, .tool-card, .contact-box"
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


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

        revealObserver.observe(element);

    });


    /* =====================================
       SERVICE CARD DELAY
    ===================================== */

    const cards = document.querySelectorAll(
        ".service-card, .tool-card"
    );

    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 3) * 0.08}s`;

    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks =
        document.querySelectorAll(
            "nav a"
        );


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================
       SMOOTH ANCHOR SCROLL
    ===================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            const target =
                document.querySelector(targetId);

            const navbarHeight = 75;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================
       IMAGE ERROR HANDLING
    ===================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.background =
                "#ede9fe";

            image.style.objectFit =
                "contain";

        });

    });


    /* =====================================
       SMALL HERO PARALLAX
    ===================================== */

    const heroImage =
        document.querySelector(".hero-image");


    if (heroImage && window.innerWidth > 900) {

        document.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 70;

            const y =
                (window.innerHeight / 2 - event.clientY) / 70;


            heroImage.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =====================================
       PREVENT FLASH ON LOAD
    ===================================== */

    document.body.classList.add("loaded");

});
