document.getElementById('year').textContent = new Date().getFullYear();


// CTA to shop: open Etsy (replace with jouw shop URL)
document.getElementById('cta-shop').addEventListener('click', function(){
window.open('https://throtleshop.etsy.com','_blank');
});









// portfolio

const loadMoreBtn = document.getElementById('load-more');
const showLessBtn = document.getElementById('show-less');
const extraCards = document.getElementById('portfolio-extra');

loadMoreBtn.addEventListener('click', function() {
  extraCards.style.display = 'grid'; // toon extra kaarten
  loadMoreBtn.style.display = 'none';
  showLessBtn.style.display = 'inline-block';
});

showLessBtn.addEventListener('click', function() {
  extraCards.style.display = 'none'; // verberg extra kaarten
  loadMoreBtn.style.display = 'inline-block';
  showLessBtn.style.display = 'none';
});








// custom aanvraag
document.querySelectorAll(".copy-text").forEach(el => {
  el.addEventListener("click", () => {
    const text = el.getAttribute("data-copy");
    navigator.clipboard.writeText(text).then(() => {
      const popup = document.getElementById("copy-popup");
      popup.classList.add("show");
      setTimeout(() => popup.classList.remove("show"), 2000);
    });
  });
});



// translation
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = 'nl'; // standaard Nederlands

  // Sla de originele NL-teksten op
  const originalTexts = {};
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    originalTexts[key] = el.innerText;
  });

  function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if(lang === 'en') {
        el.innerText = translations.en[key] || el.innerText;
      } else {
        // terug naar NL
        el.innerText = originalTexts[key];
      }
    });

    langToggle.textContent = lang === 'nl' ? 'EN' : 'NL';
    currentLang = lang;
  }

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'nl' ? 'en' : 'nl');
  });
});

