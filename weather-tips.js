// Scroll Reveal Animation
const tipCards = document.querySelectorAll('.tip-card');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  tipCards.forEach(card => {
    const boxTop = card.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      card.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Voice Assistant
document.querySelectorAll('.speak-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const tips = tipCards[index].querySelectorAll('ul li');
    const message = Array.from(tips).map(li => li.textContent).join('. ');
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  });
});

// Seasonal background
const month = new Date().getMonth();
if ([5, 6, 7].includes(month)) {
  document.body.style.background = "linear-gradient(to right, #2b5876, #4e4376)"; // Rainy
} else if ([11, 0, 1].includes(month)) {
  document.body.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)"; // Winter
} else {
  document.body.style.background = "linear-gradient(to right, #ffefba, #ffffff)"; // Summer
}
