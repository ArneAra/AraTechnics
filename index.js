<<<<<<< HEAD
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
document.querySelectorAll(".copy-text").forEach(el => {
  el.addEventListener("click", () => {
    const text = el.getAttribute("data-copy");
    navigator.clipboard.writeText(text).then(() => {
      const popup = document.getElementById("copy-popup");
      popup.classList.add("show");
      setTimeout(() => popup.classList.remove("show"), 2000);
    });
  });
});
=======
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
document.querySelectorAll(".copy-text").forEach(el => {
  el.addEventListener("click", () => {
    const text = el.getAttribute("data-copy");
    navigator.clipboard.writeText(text).then(() => {
      const popup = document.getElementById("copy-popup");
      popup.classList.add("show");
      setTimeout(() => popup.classList.remove("show"), 2000);
    });
  });
});
>>>>>>> 7093c8d730d1cbcc9e49558ef921e2721694729e
