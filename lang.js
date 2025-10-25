/* =====================================================
   ARA TECHNICS - TAALBESTAND (EN)
   Auteur: Arne (Ara Technics)
   ===================================================== */

const translations = {
  en: {
    logo: "Ara Technics",
    navHome: "Home",
    navAbout: "About me",
    navServices: "Services",
    navPortfolio: "Portfolio",
    navContact: "Contact",
    shopBtn: "ThrotleShop",
    homeTitle: "Hi, I’m Arne <br> maker, designer and car enthusiast.",
    homeText:
      "I design and create custom <strong>Websites, 3D prints and Laser cuts</strong>. I also run an <a href='http://www.throtleshop.etsy.com/' target='_blank' rel='noopener noreferrer'>Etsy shop</a> where I sell clothing, bags, posters and other fun items for petrolheads and car enthusiasts.",
    btnServices: "View services",
    btnContact: "Contact me",
    aboutTitle: "About me",
    aboutText1: "Hi, I’m Arne — the creator behind <strong>Ara Technics</strong> and <strong>ThrotleShop</strong>.",
    aboutText2:
      "I enjoy building custom websites for friends and acquaintances. I also make <strong>3D prints, laser cut projects</strong> and personalized products such as bags, bottles and keychains, <a href='#' id='toggle-about' class='more-link'>Show more</a>.",
    aboutText3:
      "ThrotleShop is my side project, where I sell automotive-inspired clothing and accessories on Etsy. <a href='https://throtleshop.etsy.com' target='_blank' rel='noopener noreferrer'>Visit ThrotleShop</a>",
    aboutText4:
      "Thanks for stopping by and checking out my work — I love programming, designing and creating with passion.",
    servicesTitle: "What I offer",
    webTitle: "Websites",
    webText:
      "Simple websites and portfolios, with plans to expand in the future. I focus on speed, usability and clean, modern design.",
    "3dTitle": "3D printing & Laser",
    "3dText":
      "Custom 3D prints, laser engravings and small productions. Perfect for prototypes, gifts or product personalization.",
    customTitle: "Personalized products",
    customText: "Design and production of personalized bags, T-shirts, bottles and more.",
    portfolioTitle: "Portfolio",
    portfolioCard1Title: "Fundraiser website",
    portfolioCard1Text:
      "A modern website for a dance competition team, designed to clearly present their fundraising projects.",
    portfolioCard2Title: "ThrotleShop – clothing for car enthusiasts",
    portfolioCard2Text:
      "My Etsy shop where I sell apparel, bags and accessories for car lovers. I handle everything myself — from product pages to branding.",
    portfolioCard3Title: "This website",
    portfolioCard3Text:
      "The website you’re viewing now — fully designed and coded by myself, built with a modern layout to showcase my projects and hobbies.",
    portfolioExtraTitle1: "Coming soon",
    portfolioExtraText1: "...",
    portfolioExtraTitle2: "Coming soon",
    portfolioExtraText2: "...",
    portfolioExtraTitle3: "Coming soon",
    portfolioExtraText3: "...",
    btnMore: "Show more",
    btnLess: "Show less",
    contactTitle: "Contact",
    contactText: "Have a question or want to collaborate? Feel free to send me an email below.",
    contactBtn: "✉️ Send an email",
    socialTitle: "Follow me on social media",
    cookieText: "This website uses only essential cookies to analyse usage.",
    cookieAccept: "Okay, got it"

  }
};
/* === APPLY ENGLISH TRANSLATIONS === */
function applyEnglish() {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations.en[key]) {
      el.innerHTML = translations.en[key];
    }
  });
}

/* === LANGUAGE TOGGLE BUTTON === */
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  let isEnglish = false;
  langToggle.addEventListener("click", () => {
    isEnglish = !isEnglish;
    langToggle.textContent = isEnglish ? "NL" : "EN";
    if (isEnglish) applyEnglish();
    else location.reload();
    document.dispatchEvent(new Event("languageChanged"));
  });
}


document.addEventListener("languageChanged", () => {
  initAboutToggle(); // heractiveer de toon meer knop na taalwissel
});
