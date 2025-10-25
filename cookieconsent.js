/* =====================================================
   ARA TECHNICS - Cookie Consent
   Auteur: Arne
   Doel: Essentiële cookie popup (Analytics) + opslag
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("cookie-popup");
  const btnAccept = document.getElementById("cookie-accept");
  const consentKey = "ara_cookie_consent";

  // Alleen tonen als nog geen toestemming is opgeslagen
  if (!localStorage.getItem(consentKey)) {
    setTimeout(() => popup.classList.add("show"), 1000); // toon na 1s
  }

  // Klik op "Oké, begrepen"
  btnAccept.addEventListener("click", () => {
    localStorage.setItem(consentKey, "true");
    popup.classList.remove("show");
  });
});
