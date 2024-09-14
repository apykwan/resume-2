function runTypingEffect() {
  const text = 'I am Andy P. Kwan';
  const typingElement = document.getElementById('typing-text');
  const typingDelay = 150;

  typeText(text, typingElement, typingDelay);
}

function typeText(text, typingElement, delay) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      typingElement.textContent += text.charAt(i);
    }, delay * i);
  }
}

function getCurrentYear() {
  const curYear =  document.getElementById('cur-year');
  curYear.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', function () {
  runTypingEffect();
  getCurrentYear();
});