/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    setTimeout(function () {

        preloader.classList.add("hide");

    }, 800);

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("mainNavbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   CLOSE MOBILE NAVBAR AFTER CLICK
========================================================= */

const navItems = document.querySelectorAll(".nav-link");

const navbarMenu = document.getElementById("navbarMenu");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        if (window.innerWidth < 992) {

            const collapse =
                bootstrap.Collapse.getInstance(navbarMenu);

            if (collapse) {

                collapse.hide();

            }

        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

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


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    formMessage.textContent =
        "Thanks! Your message has been prepared.";

    contactForm.reset();

});


/* =========================================================
   HERO CODE TYPING EFFECT
========================================================= */

const cursor =
    document.querySelector(".typing-cursor");

let cursorVisible = true;

setInterval(function () {

    if (cursor) {

        cursorVisible = !cursorVisible;

        cursor.style.opacity =
            cursorVisible ? "1" : "0";

    }

}, 500);


/* =========================================================
   PROJECT HOVER EFFECT
========================================================= */

const projectItems =
    document.querySelectorAll(".project-item");

projectItems.forEach(function (project) {

    project.addEventListener("mouseenter", function () {

        const image =
            project.querySelector(".project-image");

        if (image) {

            image.style.transition =
                "transform 0.5s ease";

        }

    });

});


/* =========================================================
   MOUSE PARALLAX HERO
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 991) {

    heroVisual.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 6;

            const rotateX =
                ((y / rect.height) - 0.5) * -6;


            const codeWindow =
                heroVisual.querySelector(".code-window");

            if (codeWindow) {

                codeWindow.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        function () {

            const codeWindow =
                heroVisual.querySelector(".code-window");

            if (codeWindow) {

                codeWindow.style.transform =
                    "perspective(1000px) rotateY(-5deg)";

            }

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.querySelector(".footer-bottom span");

if (currentYear) {

    const year =
        new Date().getFullYear();

    currentYear.innerHTML =
        `© ${year} Ragul B. All rights reserved.`;

}