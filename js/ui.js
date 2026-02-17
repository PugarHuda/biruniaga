/* ===================================
   UI.JS - UI Interactions
   =================================== */

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navbar.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768) {
      if (
        !event.target.closest(".navbar") &&
        !event.target.closest(".menu-toggle")
      ) {
        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
      }
    }
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      } else {
        header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      }
    });
  }
});

// Animate product cards on scroll — called after dynamic content loads
function animateProductCards() {
  var cards = document.querySelectorAll(".product-card");
  if (!cards.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  cards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
}
