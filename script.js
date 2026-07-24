// 1. Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});

// 2. Sticky Header on Scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 50);
    }
});

// 3. Top Button Show/Hide & Smooth Scroll
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function() {
    if (topBtn) {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
});

if (topBtn) {
    topBtn.style.transition = ".3s";
    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 4. Counter Animation
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCounter();
});

// 5. Active Link Highlight on Scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// 6. FAQ Accordion Toggle
const faq = document.querySelectorAll(".faq-item");

faq.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

// 7. Page Loader Hide
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

// 8. Progress Bar on Scroll
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
});

// 9. Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(item => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

// 10. Dark Theme Toggle
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

// 11. Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinksMenu = document.querySelector(".nav-links");

if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener("click", () => {
        navLinksMenu.classList.toggle("show");
    });
}

// 12. Typing Animation Effect
const text = "Modern Websites For Your Business";
let index = 0;

function typing() {
    const typingElement = document.getElementById("typing");
    if (typingElement) {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typing, 80);
        }
    }
}

typing();

// 13. Dynamic Year Set
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
}

// 14. Contact Form Submission (Backend API Integration)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
        const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
        const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
        const message = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

        const formMessage = document.getElementById("formMessage");

        if (name === "" || email === "" || phone === "" || message === "") {
            if (formMessage) {
                formMessage.innerHTML = "Please fill all fields.";
                formMessage.style.color = "red";
            }
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, message })
            });

            const result = await response.json();

            if (formMessage) {
                formMessage.innerHTML = result.message || "Message sent successfully!";
                formMessage.style.color = "green";
            }

            contactForm.reset();
        } catch (error) {
            console.log(error);
            if (formMessage) {
                formMessage.innerHTML = "Failed to send message.";
                formMessage.style.color = "red";
            }
        }
    });
}