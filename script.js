```javascript
/* =========================================================
   MOHOR MULTIMEDIA STUDIO
   JAVASCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");

menu.addEventListener("click", () => {

    navbar.classList.toggle("active");

    menu.classList.toggle("bx-x");

});


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menu.classList.remove("bx-x");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* ================= HEADER SHADOW ================= */

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 30px rgba(0, 0, 0, 0.35)";

    } else {

        header.style.boxShadow = "none";

    }

});
```
