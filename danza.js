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
  const truffelPrijs = 8;
  const wijnPrijs = 12;

  const totaalTruffels = 
    Number(document.getElementById('truffel-melk').value) +
    Number(document.getElementById('truffel-puur').value) +
    Number(document.getElementById('truffel-wit').value);

  const totaalWijn = 
    Number(document.getElementById('wijn-rood').value) +
    Number(document.getElementById('wijn-wit').value) +
    Number(document.getElementById('wijn-rose').value);

  const totaal = (totaalTruffels * truffelPrijs) + (totaalWijn * wijnPrijs);
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
    puur: document.getElementById('truffel-puur').value,
    wit: document.getElementById('truffel-wit').value
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
  const prijsTruffels = totaalTruffels * 8;
  const prijsWijn = totaalWijn * 12;
  const totaalPrijs = prijsTruffels + prijsWijn;

  const leveringTekst = levering === 'danser'
    ? `Door danser: ${danserNaam || '(geen naam opgegeven)'}`
    : 'Zelf ophalen';

  const beheerEmail = "b.one.inzamelacties@gmail.com";

  const subject = encodeURIComponent(`Nieuwe bestelling van ${voornaam} ${achternaam}`);
  const body = encodeURIComponent(
    `Naam: ${voornaam} ${achternaam}\n` +
    `Telefoon: ${telefoon}\n` +
    `E-mail: ${email}\n\n` +
    `🍫 Chocolade Truffels (€8/doos):\n` +
    `- Melk: ${truffels.melk}\n` +
    `- Puur: ${truffels.puur}\n` +
    `- Wit: ${truffels.wit}\n\n` +
    `🍷 Wijnen (€12/fles):\n` +
    `- Rood: ${wijnen.rood}\n` +
    `- Wit: ${wijnen.wit}\n` +
    `- Rosé: ${wijnen.rose}\n\n` +
    `Levering: ${leveringTekst}\n\n` +
    `💰 Totaalprijs: €${totaalPrijs}\n\n` +
    `U ontvangt een bevestiging per e-mail met een betalingsverzoek, gelieve te betalen om uw bestelling definitief te bevestigen.`
  );

  showMessage(`Je bestelling wordt klaargemaakt in je e-mailprogramma.<br><br><strong>Totale prijs:</strong> €${totaalPrijs}<br><br>Vergeet niet om daarna op ‘Verzenden’ te klikken!`, () => {
    const mailtoLink = `mailto:${beheerEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    popupForm.style.display = 'none';
    orderForm.reset();
    stap1.style.display = 'block';
    stap2.style.display = 'none';
  });
});
