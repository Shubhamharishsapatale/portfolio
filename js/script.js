document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenuBtn.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      document.body.style.overflow = mobileMenuOverlay.classList.contains(
        "active"
      )
        ? "hidden"
        : "";
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".mobile-menu-item").forEach((item) => {
      item.addEventListener("click", function () {
        mobileMenuBtn.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu when clicking outside
    mobileMenuOverlay.addEventListener("click", function (e) {
      if (e.target === mobileMenuOverlay) {
        mobileMenuBtn.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      if (scrollTop > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Hide/show navbar on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
    }

    lastScrollTop = scrollTop;
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active Navigation Link
  const navLinks = document.querySelectorAll(".nav-link, .mobile-menu-item");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Form Validation (for contact forms)
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const formElements = form.querySelectorAll("input, textarea");
      let isValid = true;

      // Clear previous error states
      formElements.forEach((element) => {
        element.classList.remove("error");
      });

      // Basic validation
      formElements.forEach((element) => {
        if (element.hasAttribute("required") && !element.value.trim()) {
          element.classList.add("error");
          isValid = false;
        }

        // Email validation
        if (element.type === "email" && element.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(element.value.trim())) {
            element.classList.add("error");
            isValid = false;
          }
        }
      });

      if (isValid) {
        // Form is valid, you can submit it here
        console.log("Form submitted successfully");

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message fadeInUp";
        successMessage.textContent = "Message sent successfully!";
        form.appendChild(successMessage);

        // Reset form
        form.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  });

  // Lazy Loading for Images
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Preloader
  const preloader = document.getElementById("preloader");

  if (preloader) {
    window.addEventListener("load", function () {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Dynamic Copyright Year
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Keyboard Navigation
  document.addEventListener("keydown", function (e) {
    // Escape key to close mobile menu
    if (
      e.key === "Escape" &&
      mobileMenuOverlay &&
      mobileMenuOverlay.classList.contains("active")
    ) {
      mobileMenuBtn.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    // Tab navigation accessibility
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  // Remove keyboard navigation class on mouse use
  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Performance: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debounced scroll handler for better performance
  const debouncedScrollHandler = debounce(function () {
    // Handle scroll-dependent animations or effects here
    const scrollY = window.scrollY;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler);

  // Console message for developers
  console.log(`
    ╔══════════════════════════════════════╗
    ║          Portfolio Website           ║
    ║      Built with❤️ for Shubham       ║
    ║                                      ║
    ║  Robotics Engineer & Problem Solver  ║
    ╚══════════════════════════════════════╝
    `);
});
