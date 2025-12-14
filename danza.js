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



// === Custom melding (met 3 sec wachttijd & countdown) ===
const meldingBox = document.getElementById('meldingBox');
const meldingContent = document.getElementById('meldingContent');

function showMessage(tekst, callback, wachttijd = 0) {
  meldingContent.innerHTML = `<p>${tekst}</p><button id="meldingOk">Oké</button>`;
  meldingBox.style.display = 'flex';
  const okButton = document.getElementById('meldingOk');

  if (wachttijd > 0) {
    okButton.disabled = true;
    let tijd = wachttijd;
    okButton.textContent = `Oké (${tijd})`;
    const countdown = setInterval(() => {
      tijd--;
      okButton.textContent = tijd > 0 ? `Oké (${tijd})` : 'Oké';
      if (tijd <= 0) {
        clearInterval(countdown);
        okButton.disabled = false;
      }
    }, 1000);
  }

  okButton.addEventListener('click', () => {
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



// === Bestelling verzenden ===
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const voornaam = document.getElementById('voornaam').value.trim();
  const achternaam = document.getElementById('achternaam').value.trim();
  const telefoon = document.getElementById('telefoon').value.trim();
  const email = document.getElementById('email').value.trim();

  const truffels = {
    melk: document.getElementById('truffel-melk').value,
    mix: document.getElementById('truffel-mix').value
  };
  const wijnen = {
    rood: document.getElementById('wijn-rood').value,
    wit: document.getElementById('wijn-wit').value,
    rose: document.getElementById('wijn-rose').value
  };


  const leveringRadio = document.querySelector('input[name="levering"]:checked');
  const levering = leveringRadio ? leveringRadio.value : '';
  const danserNaam = danserNaamInput.value.trim();

  if (!voornaam || !achternaam || !telefoon || !email || !levering) {
    showMessage("Vul alle verplichte velden correct in.");
    return;
  }

  const totaalTruffels = Object.values(truffels).reduce((a,b)=>a+Number(b),0);
  const totaalWijn = Object.values(wijnen).reduce((a,b)=>a+Number(b),0);
  const prijsTruffels = totaalTruffels * 7;
  const prijsWijn = totaalWijn * 9;
  const vrijegift = Number(document.getElementById('vrije-gift').value);
  const totaalPrijs = prijsTruffels + prijsWijn + vrijegift;

  const leveringTekst = levering === 'danser'
    ? `Door danser: ${danserNaam || '(geen naam opgegeven)'}` 
    : 'Zelf ophalen';

  const beheerEmail = "b.one.inzamelacties@gmail.com";
  const bccEmail = "ingeborg.coeck@telenet.be";

  const subject = encodeURIComponent(`Nieuwe bestelling van ${voornaam} ${achternaam}`);
  const body = encodeURIComponent(
    `Naam: ${voornaam} ${achternaam}\n` +
    `Telefoon: ${telefoon}\n` +
    `E-mail: ${email}\n\n` +
    `🍫 Chocolade Truffels (€7/doos):\n` +
    `- Melk: ${truffels.melk}\n` +
    `- mix: ${truffels.mix}\n` +
    `🍷 Wijnen (€9/fles):\n` +
    `- Rood: ${wijnen.rood}\n` +
    `- Wit: ${wijnen.wit}\n` +
    `- Rosé: ${wijnen.rose}\n\n` +
    `Vrijegift: ${vrijegift}\n\n` +
    `Levering: ${leveringTekst}\n\n` +
    `💰 Totaalprijs: €${totaalPrijs}\n\n` +
    `U ontvangt een bevestiging per e-mail met een betalingsverzoek, gelieve te betalen om uw bestelling definitief te bevestigen.`
  );

  // toont melding met 3 sec wachttijd op de "Oké"-knop
  showMessage(
    `Als jij op oké drukt verschijnt een e-mail met je bestelling. <br>
    Vergeet niet om daarna op ‘Verzenden’ te klikken! <br>
    Binnen de 48 uur ontvangt je een e-mail met een betalingsverzoek. <br>


    <br><br><strong>Totale prijs:</strong> €${totaalPrijs}`,
    () => {
      const mailtoLink = `mailto:${beheerEmail}?bcc=${bccEmail}&subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      popupForm.style.display = 'none';
      orderForm.reset();
      stap1.style.display = 'block';
      stap2.style.display = 'none';
    },
    3 // ← wachttijd in seconden
  );
});



// === Afbeelding popup ===
document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const closeBtn = document.querySelector(".close-popup");

  document.querySelectorAll(".actie-img-links, .actie-img-rechts").forEach(img => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.style.display = "none";
    }
  });
});


// === TIMER FUNCTIONALITEIT ===
// Doeldatum: 15 december 2025 om 23:59:59
var countDownDate = new Date("Dec 15, 2025 23:59:59").getTime();

var timerInterval = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  // Berekeningen voor dagen, uren, minuten en seconden
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Elementen ophalen
  var timerElement = document.getElementById("countdown-timer");
  var bestelKnop = document.getElementById("openFormBtn");

  if (timerElement) {
    timerElement.innerHTML = "NOG: " + days + "d " + hours + "u "
    + minutes + "m " + seconds + "s ";

    // Als de tijd op is
    if (distance < 0) {
      clearInterval(timerInterval);
      
      // Timer tekst aanpassen
      timerElement.innerHTML = "ACTIE AFGELOPEN";
      timerElement.style.color = "grey";

      // Knop uitschakelen
      if (bestelKnop) {
        bestelKnop.disabled = true;
        bestelKnop.textContent = "Gesloten";
      }
    }
  }
}, 1000);