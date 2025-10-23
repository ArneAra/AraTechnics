/* =====================================================
   ARA TECHNICS - PRIVACY & CONTACT INTERACTIONS
   Auteur: Arne
   ===================================================== */

/* --- Jaar automatisch in footer --- */
(function(){
  const elYear = document.getElementById('year');
  if (elYear) elYear.textContent = new Date().getFullYear();
})();

/* --- Mailto button: open default mail client (already done by href),
       we add an accessible focus/aria feedback and a tiny subject template --- */
(function(){
  const mailBtn = document.getElementById('mailto-btn');
  if (!mailBtn) return;

  // ensure mailto includes a useful subject
  const baseMail = 'info@aratechnics.be';
  const defaultSubject = encodeURIComponent('Vraag via Ara Technics website');
  mailBtn.setAttribute('href', `mailto:${baseMail}?subject=${defaultSubject}`);

  // small keyboard accessibility helper
  mailBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // native anchor mailto will open; just prevent double behavior
      e.preventDefault();
      window.location.href = mailBtn.href;
    }
  });
})();
