/* =====================================================
   ARA TECHNICS - INTERACTIEVE FUNCTIES
   Auteur: Arne (Ara Technics)
   ===================================================== */
   

// === Popup tonen/sluiten ===
const openFormBtn = document.getElementById('openFormBtn');
const popupForm = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');
const orderForm = document.getElementById('orderForm');


const stap1 = document.getElementById('stap1');
const stap2 = document.getElementById('orderForm');
const naarStap2Btn = document.getElementById('naarStap2');
const terugStap1Btn = document.getElementById('terugStap1');
const totaalPrijsTekst = document.getElementById('totaalPrijs');

openFormBtn.addEventListener('click', () => {
  popupForm.style.display = 'flex';
  stap1.style.display = 'block';
  stap2.style.display = 'none';
});

closePopup.addEventListener('click', () => {
  popupForm.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === popupForm) popupForm.style.display = 'none';
});

// === Popup sluiten met Escape ===
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popupForm.style.display = 'none';
    meldingBox.style.display = 'none';
  }
});



// === Custom melding ===
const meldingBox = document.getElementById('meldingBox');
const meldingContent = document.getElementById('meldingContent');

function showMessage(tekst, callback) {
  meldingContent.innerHTML = `<p>${tekst}</p><button id="meldingOk">Oké</button>`;
  meldingBox.style.display = 'flex';
  document.getElementById('meldingOk').addEventListener('click', () => {
    meldingBox.style.display = 'none';
    if (callback) callback();
  });
}

// === Prijsberekening + limietcontrole ===
const prijsInputs = document.querySelectorAll('#stap1 input[type="number"]');
prijsInputs.forEach(input => {
  input.addEventListener('input', () => {

    // Controleer of dit het vrije-gift veld is, en pas de limiet toe
    if (input.id === "vrije-gift" && Number(input.value) > 1000000) {
      input.value = 1000000;
      showMessage("Je kunt maximaal €1.000.000 doneren. Voor hogere bedragen gelieve een mail te sturen naar b.one.inzamelacties@gmail.com.");
    }

    if (input.id === "vrije-gift") {
      if (Number(input.value) < 0) input.value = 0; 
      berekenTotaal();
      return;
    }

    if (Number(input.value) > 99) {
      input.value = 99;
      showMessage("Je kunt maximaal 99 stuks per product bestellen.");
    } else if (Number(input.value) < 0) {
      input.value = 0;
    }

    berekenTotaal();
  });
});


function berekenTotaal() {
  const truffelPrijs = 7;
  const wijnPrijs = 9;

  const totaalTruffels = 
    Number(document.getElementById('truffel-melk').value) +
    Number(document.getElementById('truffel-mix').value);

  const totaalWijn = 
    Number(document.getElementById('wijn-rood').value) +
    Number(document.getElementById('wijn-wit').value) +
    Number(document.getElementById('wijn-rose').value);

  const totaalvrijegift =
    Number(document.getElementById('vrije-gift').value)

  const totaal = (totaalTruffels * truffelPrijs) + (totaalWijn * wijnPrijs) + totaalvrijegift;
  totaalPrijsTekst.textContent = `Totaal: €${totaal}`;
}



// === Stap 1 -> Stap 2 ===
naarStap2Btn.addEventListener('click', () => {
  berekenTotaal();
  const totaalTekst = totaalPrijsTekst.textContent;
  if (totaalTekst === "Totaal: €0") {
    showMessage("Kies minstens één product om verder te gaan.");
    return;
  }
  stap1.style.display = 'none';
  stap2.style.display = 'block';
});

// === Terug naar stap 1 ===
terugStap1Btn.addEventListener('click', () => {
  stap2.style.display = 'none';
  stap1.style.display = 'block';
});



// === Levering-opties ===
const leveringRadios = document.querySelectorAll('input[name="levering"]');
const danserNaamContainer = document.getElementById('danserNaamContainer');
const danserNaamInput = document.getElementById('danserNaam');

leveringRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'danser' && radio.checked) {
      danserNaamContainer.style.display = 'block';
      danserNaamInput.required = true;
    } else {
      danserNaamContainer.style.display = 'none';
      danserNaamInput.required = false;
      danserNaamInput.value = '';
    }
  });
});



// === Bestelling verzenden (gefixt) ===
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const voornaam = document.getElementById('voornaam').value.trim();
  const achternaam = document.getElementById('achternaam').value.trim();
  const telefoon = document.getElementById('telefoon').value.trim();
  const email = document.getElementById('email').value.trim();

  const truffels = {
    melk: Number(document.getElementById('truffel-melk').value),
    mix: Number(document.getElementById('truffel-mix').value)
  };
  const wijnen = {
    rood: Number(document.getElementById('wijn-rood').value),
    wit: Number(document.getElementById('wijn-wit').value),
    rose: Number(document.getElementById('wijn-rose').value)
  };

  const leveringRadio = document.querySelector('input[name="levering"]:checked');
  const levering = leveringRadio ? leveringRadio.value : '';
  const danserNaam = danserNaamInput.value.trim();

  if (!voornaam || !achternaam || !telefoon || !email || !levering) {
    showMessage("Vul alle verplichte velden correct in.");
    return;
  }

  const totaalTruffels = Object.values(truffels).reduce((a, b) => a + b, 0);
  const totaalWijn = Object.values(wijnen).reduce((a, b) => a + b, 0);
  const prijsTruffels = totaalTruffels * 7;
  const prijsWijn = totaalWijn * 9;
  const totaalvrijegift = Number(document.getElementById('vrije-gift').value);
  const totaalPrijs = prijsTruffels + prijsWijn + totaalvrijegift;

  if (totaalPrijs === 0) {
    showMessage("Kies minstens één product of vrije gift om verder te gaan.");
    return;
  }

  const leveringTekst = levering === 'danser'
    ? `Door danser: ${danserNaam || '(geen naam opgegeven)'}`
    : 'Zelf ophalen';

  const beheerEmail = "b.one.inzamelacties@gmail.com";

  const subject = encodeURIComponent(`Nieuwe bestelling van ${voornaam} ${achternaam}`);
  const body = encodeURIComponent(
    `Naam: ${voornaam} ${achternaam}\n` +
    `Telefoon: ${telefoon}\n` +
    `E-mail: ${email}\n\n` +
    `🍫 Chocolade Truffels (€7/doos):\n` +
    `- Melk: ${truffels.melk}\n` +
    `- Mix: ${truffels.mix}\n` +
    `🍷 Wijnen (€9/fles):\n` +
    `- Rood: ${wijnen.rood}\n` +
    `- Wit: ${wijnen.wit}\n` +
    `- Rosé: ${wijnen.rose}\n\n` +
    `Vrije gift: €${totaalvrijegift}\n\n` +
    `Levering: ${leveringTekst}\n\n` +
    `💰 Totaalprijs: €${totaalPrijs}\n\n` +
    `U ontvangt een bevestiging per e-mail met een betalingsverzoek. Gelieve te betalen om uw bestelling definitief te bevestigen.`
  );

  showMessage(
    `Je bestelling wordt klaargemaakt in je e-mailprogramma.<br><br><strong>Totale prijs:</strong> €${totaalPrijs}<br><br>Vergeet niet om daarna op ‘Verzenden’ te klikken!`,
    () => {
      try {
        const mailtoLink = `mailto:${beheerEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
      } catch (err) {
        console.error("Fout bij openen van mailprogramma:", err);
        showMessage("Er ging iets mis bij het openen van je e-mailprogramma. Probeer opnieuw of stuur een mail naar b.one.inzamelacties@gmail.com.");
      }
      popupForm.style.display = 'none';
      orderForm.reset();
      stap1.style.display = 'block';
      stap2.style.display = 'none';
      berekenTotaal();
    }
  );
});





// === Afbeelding popup (links) ===
document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const closeBtn = document.querySelector(".close-popup");

  // Wanneer op een afbeelding wordt geklikt
  document.querySelectorAll(".actie-img-links").forEach(img => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src;
    });
  });

  // Klik op sluitknop
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Klik buiten de afbeelding
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // ESC toets om te sluiten
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.style.display = "none";
    }
  });
});

// === Afbeelding popup (rechts) ===
document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const closeBtn = document.querySelector(".close-popup");

  // Wanneer op een afbeelding wordt geklikt
  document.querySelectorAll(".actie-img-rechts").forEach(img => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src;
    });
  });

  // Klik op sluitknop
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Klik buiten de afbeelding
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // ESC toets om te sluiten
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.style.display = "none";
    }
  });
});