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
