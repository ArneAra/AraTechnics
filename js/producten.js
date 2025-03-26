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








//------------------filter----------------------

function filterProducts(category) {
  let products = document.querySelectorAll('.product-card');
  let buttons = document.querySelectorAll('.category-btn');

  // Verwijder 'active' klasse van alle knoppen
  buttons.forEach(btn => btn.classList.remove('active'));

  // Voeg 'active' klasse toe aan de geklikte knop
  event.target.classList.add('active');

  // Loop door alle producten en toon/verberg ze op basis van de categorie
  products.forEach(product => {
      if (category === 'all') {
          product.classList.remove('hidden');
      } else {
          if (product.classList.contains(category)) {
              product.classList.remove('hidden');
          } else {
              product.classList.add('hidden');
          }
      }
  });
}



//---------------item count------------------
// Functie om het aantal producten per categorie te tellen
function updateProductCounts() {
  let allProducts = document.querySelectorAll('.product-card').length;
  let sleutelhangers = document.querySelectorAll('.product-card.sleutelhangers').length;
  let ander = document.querySelectorAll('.product-card.ander').length;

  // Aantallen weergeven in de knoppen
  document.getElementById("count-all").textContent = allProducts;
  document.getElementById("count-sleutelhangers").textContent = sleutelhangers;
  document.getElementById("count-vazen").textContent = vazen;
  document.getElementById("count-ander").textContent = ander;
}

// Roep de functie aan bij het laden van de pagina
document.addEventListener("DOMContentLoaded", updateProductCounts);

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