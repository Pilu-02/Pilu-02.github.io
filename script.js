// Smooth scrolling + active link highlight + small interactions

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const yearSpan = document.getElementById("year");
  const backToTopBtn = document.getElementById("back-to-top");
  const showMoreBtn = document.getElementById("show-more-pubs");
  const pubItems = document.querySelectorAll(".pub-item.hidden");
  const chips = document.querySelectorAll(".chip");
  const pubAllItems = document.querySelectorAll(".pub-item");
  const form = document.querySelector(".contact-form");
  const formStatus = document.getElementById("form-status");

  // Current year in footer
  yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.pageYOffset - 72;

      window.scrollTo({ top, behavior: "smooth" });

      // Close mobile nav
      nav.classList.remove("open");
    });
  });

  // IntersectionObserver for sections & fade-in elements
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Scrollspy for nav
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Back to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Show more publications
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      pubItems.forEach((item) => item.classList.remove("hidden"));
      showMoreBtn.style.display = "none";
    });
  }

  // Filter publications by type
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      chips.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");

      pubAllItems.forEach((item) => {
        const type = item.dataset.type;
        if (filter === "all" || filter === type) {
          item.style.display = "grid";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Fake contact-form behaviour (front-end only)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent =
      "Thank you for your message. This demo form is not yet connected to email.";
    form.reset();
  });
});
