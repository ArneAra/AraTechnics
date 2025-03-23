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
