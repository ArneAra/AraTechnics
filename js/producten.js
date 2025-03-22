//nav bar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//banner
let slideIndex = 0;
showSlides();

function showSlides() {
let i;
let slides = document.getElementsByClassName("mySlides");
for (i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
}
slideIndex++;
if (slideIndex > slides.length) {slideIndex = 1}
slides[slideIndex-1].style.display = "block";
setTimeout(showSlides, 2000); // Change image every 2 seconds
}





      function toggleDarkMode() {
          document.body.classList.toggle('dark-mode');
          let icon = document.getElementById('toggle-icon');

          if (document.body.classList.contains('dark-mode')) {
              icon.src = "sun.png"; // Verander naar zonnetje
              localStorage.setItem('darkMode', 'enabled');
          } else {
              icon.src = "moon.png"; // Verander naar maantje
              localStorage.setItem('darkMode', 'disabled');
          }
      }

      // Controleer of de gebruiker eerder de donkere modus heeft ingeschakeld
      if (localStorage.getItem('darkMode') === 'enabled') {
          document.body.classList.add('dark-mode');
          document.getElementById('toggle-icon').src = "sun.png"; // Zonnetje als dark mode aan staat
      }