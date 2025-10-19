/* =====================================================
   ARA TECHNICS - LANGUAGE FILE (privacy & contact)
   Auteur: Arne
   Doel: EN translations + toggle (NL static in HTML)
   ===================================================== */

const translations = {
  en: {
    logo: "Ara Technics",
    btnBackHome: "← Back to home",
    title: "Privacy & Contact",
    intro:
      "This page explains what data I collect, why, how long it’s kept, and your rights. Ara Technics (hobby name: Arne) only processes information you voluntarily send via email or contact requests.",
    controllerTitle: "Controller & hosting",
    controllerText:
      "Controller: Arne — Ara Technics (hobby). For analytical purposes, I use Google Analytics (basic configuration).",
    whatTitle: "What data and why",
    whatText:
      "• When you send an email: your address and message content — to reply to your request. <br> • Analytics: anonymous usage data collected by Google Analytics for statistics (no data selling). <br>• External links (Instagram/Facebook/Etsy) lead to my own accounts — they don’t transmit data to third parties by themselves.",
    legalTitle: "Legal basis & retention",
    legalText:
      "Legal basis: your consent when sending an email, or my legitimate interest for analytics and website management. Retention policy: emails are kept for at least one month unless you request deletion earlier. Google Analytics data is stored according to Google’s default retention settings. You may object or request access via email.",
    rightsTitle: "Your rights",
    rightsText:
      "You have the right to access, rectify, erase, restrict processing, object, and data portability. To exercise any of these rights, email info@aratechnics.be. You can also file a complaint with the Belgian Data Protection Authority.",
    ownershipTitle: "Ownership of designs & work",
    ownershipText:
      "Unless otherwise agreed in a written contract, all digital designs (websites, 3D models, laser cut files, and graphic designs) remain the intellectual property of Ara Technics. Physical products (3D prints, laser cuts, clothing) are delivered to the client and become their physical property. Designs may only be reused, sold, or transferred with explicit permission or a contract.",
    securityTitle: "Security",
    securityText:
      "Emails are stored in my personal mailbox. I take reasonable precautions, but for sensitive or confidential data I recommend not sending personal details by email.",
    thirdPartyTitle: "External services",
    thirdPartyText:
      "Analytics: Google Analytics. Social profiles: Instagram and Facebook. For further details, please check their respective privacy policies.",
    contactTitle: "Contact",
    contactText:
      "Have questions about privacy, want your data removed, or wish to purchase or license a design? Use the button below to send an email directly.",
    btnEmail: "✉️ Send an email",
    socialTitle: "Follow & contact via",
    hobbyTitle: "Hobby project",
    hobbyText:
      "Ara Technics is a personal hobby project by Arne. This page describes how I handle data and is not a formal business policy. For professional collaborations, formal contracts may be arranged.",
    changesTitle: "Changes",
    changesText:
      "This privacy and contact document may be updated occasionally. Significant updates will be announced on this page.",
  },
};

/* Apply English translations when requested; NL text remains in HTML by default */
(function(){
  const langToggle = document.getElementById('lang-toggle');
  // Save original (NL) texts so we can restore them when toggling back
  const original = {};
  document.querySelectorAll('[data-lang]').forEach(el => {
    original[el.getAttribute('data-lang')] = el.innerHTML;
  });

  let currentLang = 'nl'; // default

  function applyLang(lang) {
    if (lang === 'en') {
      document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations.en[key]) {
          el.innerHTML = translations.en[key];
        }
      });
    } else {
      // restore original NL content
      document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (original[key]) el.innerHTML = original[key];
      });
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = (currentLang === 'nl') ? 'en' : 'nl';
      langToggle.textContent = (currentLang === 'nl') ? 'EN' : 'NL';
      applyLang(currentLang);
    });
  }

  // Optional: keep initial state consistent (show NL)
  applyLang(currentLang);
})();
