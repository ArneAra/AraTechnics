document.getElementById('year').textContent = new Date().getFullYear();


// CTA to shop: open Etsy (replace with jouw shop URL)
document.getElementById('cta-shop').addEventListener('click', function(){
window.open('https://throtleshop.etsy.com','_blank');
});







// portfolio

const loadMoreBtn = document.getElementById('load-more');
const showLessBtn = document.getElementById('show-less');
const extraCards = document.getElementById('portfolio-extra');

loadMoreBtn.addEventListener('click', function() {
  extraCards.style.display = 'grid'; // toon extra kaarten
  loadMoreBtn.style.display = 'none';
  showLessBtn.style.display = 'inline-block';
});

showLessBtn.addEventListener('click', function() {
  extraCards.style.display = 'none'; // verberg extra kaarten
  loadMoreBtn.style.display = 'inline-block';
  showLessBtn.style.display = 'none';
});








// custom aanvraag
const form = document.getElementById('request-form');
const result = document.getElementById('form-result');
const resetBtn = document.getElementById('reset-btn');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const type = document.getElementById('project-type').value;
  const desc = document.getElementById('description').value.trim();
  const attach = document.getElementById('attachments').value.trim();

  if(!name || !email || !desc){
    result.innerHTML = '<p style="color:#ffb4b4;">Vul alstublieft naam, e-mail en omschrijving in.</p>';
    return;
  }

  // maak mailto link
  const subject = encodeURIComponent(`Nieuwe projectaanvraag van ${name}`);
  let body = `Naam: ${name}%0D%0A`;
  body += `E-mail: ${email}%0D%0A`;
  body += `Type project: ${type}%0D%0A`;
  body += `Omschrijving:%0D%0A${desc}%0D%0A`;
  if(attach) body += `Bijlagen / voorbeelden: ${attach}%0D%0A`;

  const mailtoLink = `mailto:info@aratechnics.be?subject=${subject}&body=${body}`;

  // open mailprogramma
  window.location.href = mailtoLink;

  result.innerHTML = '<p style="color:#adf7b6;">Je e-mail wordt geopend in je mailprogramma. Controleer even of alles klopt en klik op verzenden. Ik probeer binnen 72 uur te reageren.</p>';
  form.reset();
});

resetBtn.addEventListener('click', function(){
  form.reset();
  result.innerHTML = '';
});