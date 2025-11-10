/* =====================================================
   ARA TECHNICS - INTERACTIEVE FUNCTIES
   Auteur: Arne (Ara Technics)
   ===================================================== */

/* === "Toon meer" functie (herbruikbaar) === */
function initAboutToggle() {
  const toggleLink = document.getElementById("toggle-about");
  if (!toggleLink) return;

  const extraProducts = [
    "kleding zoals T-shirts, hoodies, truien, petten en mutsen",
    "linnen zakken en rugzakken",
    "mokken, drinkflessen en glazen",
    "stickers, posters, vlaggen en eventueel meer op aanvraag"
  ];

  function createExtraText() {
    const p = document.createElement("p");
    p.id = "extra-text";
    p.innerHTML = `
      Naast tassen, flessen en sleutelhangers bied ik ook custom 
      ${extraProducts.join(", ")}.
      <br><br>
      Heb je een idee of wil je iets unieks laten maken met je eigen logo of ontwerp? 
      <a href="#contact">Neem contact op</a> en ik kijk wat mogelijk is!
    `;
    return p;
  }

  let expanded = false;
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    const existing = document.getElementById("extra-text");

    if (!expanded) {
      const aboutSection = document.getElementById("about");
      const referenceParagraph = toggleLink.closest("p");
      const extra = createExtraText();
      referenceParagraph.insertAdjacentElement("afterend", extra);
      toggleLink.textContent = toggleLink.dataset.lang === "aboutToggle" ? "Toon minder" : "Show less";
    } else if (existing) {
      existing.remove();
      toggleLink.textContent = toggleLink.dataset.lang === "aboutToggle" ? "Toon meer" : "Show more";
    }
    expanded = !expanded;
  });
}

/* === Init functie bij laden === */
document.addEventListener("DOMContentLoaded", () => {
  initAboutToggle();
});

/* === COPY-TO-CLIPBOARD === */
const copyText = document.querySelector(".copy-text");
const copyPopup = document.getElementById("copy-popup");

if (copyText) {
  copyText.addEventListener("click", () => {
    const email = copyText.getAttribute("data-copy");
    navigator.clipboard.writeText(email);
    copyPopup.style.display = "block";
    setTimeout(() => {
      copyPopup.style.display = "none";
    }, 1500);
  });
}

/* === LOAD MORE / SHOW LESS PORTFOLIO === */
const loadMoreBtn = document.getElementById("load-more");
const showLessBtn = document.getElementById("show-less");
const extraCards = document.getElementById("portfolio-extra");

if (loadMoreBtn && showLessBtn && extraCards) {
  loadMoreBtn.addEventListener("click", function () {
    extraCards.style.display = "grid";
    loadMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn.addEventListener("click", function () {
    extraCards.style.display = "none";
    loadMoreBtn.style.display = "inline-block";
    showLessBtn.style.display = "none";
  });
}

/* === PORTFOLIO "Toon meer" met animatie === */
if (loadMoreBtn && showLessBtn && extraCards) {
  loadMoreBtn.addEventListener("click", function () {
    extraCards.style.display = "grid";
    gsap.fromTo(
      "#portfolio-extra .card",
      { opacity: 0, y: 50, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      }
    );

    loadMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn.addEventListener("click", function () {
    gsap.to("#portfolio-extra .card", {
      opacity: 0,
      y: 40,
      rotateX: 15,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.in",
      onComplete: () => {
        extraCards.style.display = "none";
        loadMoreBtn.style.display = "inline-block";
        showLessBtn.style.display = "none";
      }
    });
  });
}

// ✅ iPhone-vriendelijke versie van de observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // voorkomt dubbele triggers
      }
    });
  },
  {
    root: null,
    // iets ruimere marge helpt iOS Safari beter detecteren
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  }
);

// observeer alle elementen die moeten binnenfaden
document.querySelectorAll('.fade-in, [data-aos], .reveal, .scroll-animate')
  .forEach(el => observer.observe(el));




/* === PORTFOLIO bigger images === */
// --- Image modal logic ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal .close");

// Als op een afbeelding wordt geklikt
document.querySelectorAll(".portfolio img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex"; 
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

// Sluiten met het kruisje
closeBtn.addEventListener("click", () => modal.style.display = "none");

// Sluiten door buiten de afbeelding te klikken
modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// Sluiten met ESC
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.style.display = "none"; });





/* === FORMULIER: MAILTO KNOP === */
const btnMailto = document.getElementById("btn-mailto");
const form = document.getElementById("contact-form");

if (btnMailto && form) {
  btnMailto.addEventListener("click", () => {
    const name = form.name.value;
    const email = form.email.value;
    const topic = form.topic.value;
    const message = form.message.value;

    const subject = encodeURIComponent("Contact via AraTechnics.be");
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\nOnderwerp: ${topic}\n\n${message}`
    );

    window.location.href = `mailto:info@aratechnics.be?subject=${subject}&body=${body}`;
  });
}

/* === THROTLESHOP BUTTON === */
const shopBtn = document.getElementById("cta-shop");
if (shopBtn) {
  shopBtn.addEventListener("click", () => {
    window.open("https://www.etsy.com/shop/ThrotleShop", "_blank");
  });
}



/* === SCROLL-ANIMATIES EN 3D EFFECTEN === */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Detecteer of het scherm mobiel is
  const isMobile = window.innerWidth < 768;

  // Hero-tekst fade + slide in
  gsap.from(".hero h1", {
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out"
  });
  gsap.from(".hero p", {
    y: 50,
    opacity: 0,
    delay: 0.2,
    duration: 1.2,
    ease: "power3.out"
  });
  gsap.from(".hero .btn", {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 0.4,
    duration: 1,
    ease: "power3.out"
  });

  // 3D scroll-effect op hero (licht parallax)
  gsap.to(".hero", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true
    },
    yPercent: 5,
    scale: 1.03,
    transformOrigin: "center center",
    ease: "none"
  });

  // Sectie-titels swipe/fade bij scroll
  gsap.utils.toArray("section h2").forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        // 👇 iets eerder starten op desktop dan eerst
        start: isMobile ? "top 95%" : "top 88%",
        toggleActions: "play none none reverse"
      },
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  });

  // Tekst-paragrafen in secties
  gsap.utils.toArray("section p").forEach(p => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        // 👇 eerder starten op zowel mobiel als desktop
        start: isMobile ? "top 100%" : "top 92%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Kaarten (diensten en portfolio) met stagger-in
  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: isMobile ? "top 100%" : "top 93%", // iets eerder op desktop
        toggleActions: "play none none reverse"
      },
      y: 60,
      opacity: 0,
      rotateX: -15,
      transformOrigin: "top center",
      duration: 0.8,
      delay: (i % 3) * 0.15,
      ease: "power3.out"
    });
  });
});


/* === HERO MOUSE PARALLAX + 3D SERVICE ICONS === */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const heroContent = hero.querySelector(".container");

  // Alleen op desktop
  if (window.innerWidth >= 768 && hero && heroContent) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(heroContent, {
        rotationY: x * 10,
        rotationX: -y * 10,
        transformPerspective: 800,
        ease: "power2.out",
        duration: 0.4
      });
    });

    hero.addEventListener("mouseleave", () => {
      gsap.to(heroContent, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.6
      });
    });
  }

  // 3D hover-effect op de icoontjes van de diensten
  const icons = document.querySelectorAll(".service-icon");
  icons.forEach(icon => {
    icon.style.display = "inline-block";
    icon.style.transition = "transform 0.4s ease, text-shadow 0.4s ease";
    icon.style.willChange = "transform";
    icon.style.transformOrigin = "center center";

    // Hover in
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        rotationY: 15,
        rotationX: -10,
        scale: 1.15,
        duration: 0.5,
        ease: "power3.out"
      });
      icon.style.textShadow = "0 0 20px rgba(122,230,145,0.6)";
    });

    // Hover uit
    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      });
      icon.style.textShadow = "none";
    });
  });

});
