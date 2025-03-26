document.addEventListener("DOMContentLoaded", function () {
  checkDarkMode(); // Controleer dark mode bij het laden van de pagina
});

function toggleDarkMode() {
  let body = document.body;
  
  if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled"); // Opslaan in localStorage
  } else {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled"); // Opslaan in localStorage
  }
}

function checkDarkMode() {
  if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode"); // Zet dark mode aan als het is opgeslagen
  }
}



//----------------contact----------------------
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let mailtoLink = `mailto:info@aratechnics.be?subject=Contactformulier van ${name}&body=Naam: ${name}%0D%0ATelefoon: ${phone}%0D%0AE-mail: ${email}%0D%0ABericht: ${message}`;

  window.location.href = mailtoLink;

  document.getElementById("response-message").textContent = "Bericht verstuurd!";
});
