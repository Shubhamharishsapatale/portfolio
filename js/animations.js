document.addEventListener("DOMContentLoaded", function () {
  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorElements = document.querySelectorAll(
    "a, button, .social-link, .nav-link"
  );

  if (cursor && cursorDot) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    cursorElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(0)";
      });

      element.addEventListener("mouseleave", function () {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.backgroundColor = "transparent";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("cursor-pulse");
      setTimeout(() => {
        cursor.classList.remove("cursor-pulse");
      }, 600);
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        const siblingElements =
          entry.target.parentNode.querySelectorAll(".animate-on-scroll");
        siblingElements.forEach((sibling, index) => {
          if (sibling.classList.contains("is-visible")) {
            sibling.style.animationDelay = `${index * 0.1}s`;
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".fadeInUp, .slideInLeft, .slideInRight, .scaleIn, .animate-on-scroll"
  );
  animatedElements.forEach((element) => {
    element.classList.add("animate-on-scroll");
    observer.observe(element);
  });

  // Parallax Scrolling Effect
  function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
      const yPos = scrolled * 0.3;
      heroBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", function () {
    requestTick();
    ticking = false;
  });

  // Text Animation Effects
  function initTextAnimations() {
    const textElements = document.querySelectorAll(".animate-text");

    textElements.forEach((element) => {
      const text = element.textContent;
      element.innerHTML = "";

      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.animationDelay = `${index * 0.05}s`;
        span.classList.add("char-animate");
        element.appendChild(span);
      });
    });
  }

  // Magnetic Effect for Interactive Elements
  function initMagneticEffect() {
    const magneticElements = document.querySelectorAll(".magnetic");

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      element.addEventListener("mouseleave", function () {
        element.style.transform = "translate(0, 0)";
      });
    });
  }

  // Gradient Animation
  function initGradientAnimation() {
    const gradientElements = document.querySelectorAll(".animated-gradient");

    gradientElements.forEach((element) => {
      let angle = 0;

      function animateGradient() {
        angle += 1;
        element.style.background = `linear-gradient(${angle}deg, #000000, #111111, #222222)`;

        if (angle >= 360) angle = 0;
        requestAnimationFrame(animateGradient);
      }

      animateGradient();
    });
  }

  // Typing Animation
  function initTypingAnimation() {
    const typingElements = document.querySelectorAll(".typing-animation");

    typingElements.forEach((element) => {
      const text = element.dataset.text || element.textContent;
      element.textContent = "";

      let index = 0;
      function typeChar() {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
          setTimeout(typeChar, 100);
        }
      }

      const typingObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeChar, 500);
            typingObserver.unobserve(entry.target);
          }
        });
      });

      typingObserver.observe(element);
    });
  }

  // Smooth Page Transitions
  function initPageTransitions() {
    const pageLinks = document.querySelectorAll('a[href$=".html"]');

    pageLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (this.hostname === window.location.hostname) {
          e.preventDefault();

          const overlay = document.createElement("div");
          overlay.className = "page-transition-overlay";
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #000000;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s ease;
          `;

          document.body.appendChild(overlay);

          setTimeout(() => {
            overlay.style.opacity = "1";
          }, 10);

          setTimeout(() => {
            window.location.href = this.href;
          }, 500);
        }
      });
    });
  }

  // 3D Tilt Effect
  function init3DTilt() {
    const tiltElements = document.querySelectorAll(".tilt-3d");

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      element.addEventListener("mouseleave", function () {
        element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      });
    });
  }

  // Particle System
  function initParticleSystem() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Smooth Scrolling for Anchor Links
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const targetPosition = targetElement.offsetTop;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1000;
          let start = null;

          function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          }

          function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          }

          requestAnimationFrame(animation);
        }
      });
    });
  }

  // Loading Animation
  function initLoadingAnimation() {
    const loadingScreen = document.querySelector(".loading-screen");

    if (loadingScreen) {
      window.addEventListener("load", function () {
        setTimeout(() => {
          loadingScreen.style.opacity = "0";
          setTimeout(() => {
            loadingScreen.style.display = "none";
          }, 500);
        }, 1000);
      });
    }
  }

  // Ripple Effect for Buttons
  function initRippleEffect() {
    const buttons = document.querySelectorAll(".ripple-effect, button");

    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Image Lazy Loading with Fade In
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("fade-in");
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Performance Monitor
  function initPerformanceMonitor() {
    let fps = 0;
    let lastTime = performance.now();

    function calculateFPS() {
      const now = performance.now();
      fps = Math.round(1000 / (now - lastTime));
      lastTime = now;

      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps}fps`);
      }

      requestAnimationFrame(calculateFPS);
    }

    calculateFPS();
  }

  // Initialize all animations
  initTextAnimations();
  initMagneticEffect();
  initGradientAnimation();
  initTypingAnimation();
  initPageTransitions();
  init3DTilt();
  initParticleSystem();
  initSmoothScrolling();
  initLoadingAnimation();
  initRippleEffect();
  initLazyLoading();
  initPerformanceMonitor();

  // Add required CSS animations dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes cursor-pulse {
      0% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }

    .cursor-pulse {
      animation: cursor-pulse 0.6s ease-out;
    }

    .fade-in {
      opacity: 0;
      animation: fadeIn 0.5s ease-in forwards;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }

    .char-animate {
      display: inline-block;
      opacity: 0;
      animation: charFadeIn 0.5s ease forwards;
    }

    @keyframes charFadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }

    .animate-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  console.log("Advanced animations initialized successfully!");
});
