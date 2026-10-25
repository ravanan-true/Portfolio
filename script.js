document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.classList.add("hide");
            window.setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, { once: true });
        // Avoid leaving the page behind the loader if the load event already fired.
        if (document.readyState === "complete") {
            preloader.classList.add("hide");
            window.setTimeout(() => { preloader.style.display = "none"; }, 500);
        }
    }

    const navbar = document.getElementById("mainNavbar");
    const backToTop = document.getElementById("backToTop");
    const updateScrollUI = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (navbar) navbar.classList.toggle("scrolled", y > 40);
        if (backToTop) backToTop.classList.toggle("show", y > 450);
    };
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("active"));
    }

    // Close the mobile navigation after choosing a section.
    const navMenu = document.getElementById("navbarMenu");
    if (navMenu && window.bootstrap) {
        navMenu.querySelectorAll(".nav-link, .nav-contact").forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("show")) {
                    window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
                }
            });
        });
    }

    // Contact form: sends the form to FormSubmit via AJAX instead of showing a fake success.
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && formMessage && submitButton) {
        contactForm.addEventListener("submit", async event => {
            event.preventDefault();
            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            if (!name || !email || !message) {
                formMessage.textContent = "Please fill in all fields.";
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formMessage.textContent = "Please enter a valid email address.";
                return;
            }

            const originalButtonHTML = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            formMessage.textContent = "";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" }
                });
                let result = {};
                try { result = await response.json(); } catch (_) { /* response may be empty */ }
                if (!response.ok || result.success === false || result.success === "false") {
                    throw new Error(result.message || "The form service did not accept the message.");
                }
                formMessage.textContent = "Message submitted successfully! Thank you for contacting me.";
                contactForm.reset();
            } catch (error) {
                console.error("Contact form submission failed:", error);
                formMessage.textContent = "Sorry, your message could not be sent. Please email me directly at ragul12905@gmail.com.";
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML;
            }
        });
    }
});
