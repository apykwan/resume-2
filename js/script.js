import { skillList } from './data/skillList.js';
import { sendButton, js_send, js_form } from './sendMail.js';

function runTypingEffect() {
  const text = 'Andy P. Kwan';
  const typingElement = document.getElementById('typing-text');
  const typingDelay = 200;

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

// render skill set
function renderSkillList() {
  const rootDiv = document.getElementById('skill-list');

  const skills = skillList.map(function(skill) {
    const skillContainer = document.createElement('h5');
    const skillIcon = document.createElement('i');
    const skillName = document.createElement('span');

    skillContainer.classList = 'p-1';
    skillIcon.classList = `${skill.icon} me-3 text-primary`;
    skillName.textContent = skill.name;
    skillContainer.append(skillIcon);
    skillContainer.append(skillName);

    return skillContainer;
  });

  skills.forEach(skillElement => {
    rootDiv.appendChild(skillElement);
  });
}

sendButton.onclick = js_send;
js_form.addEventListener("submit", function (e) {
    e.preventDefault();   
});

document.addEventListener('DOMContentLoaded', function () {
  runTypingEffect();
  getCurrentYear();
  renderSkillList();
});