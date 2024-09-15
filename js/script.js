import { skillList } from './data/skillList.js';

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

async function checkLocation() {
  const data = await fetch('https://ipapi.co/json/');
  const location = await data.json();

  console.log(location.country);
  let phoneNumber = '(857) 234-1527';
  let myResume = 'file/andypkwanResume.docx';
  let myAuthorization = 'USA and Canada'

  if(location.country === 'CA') {
    phoneNumber = '(778) 984-6017';
    myResume = 'file/andypkwanResume_Van.docx';
    myAuthorization = 'Canada and USA';
  } 

  document.querySelectorAll('.my-phone').forEach(function(element) {
    element.textContent = phoneNumber;
  });
  document.querySelector('.my-resume').setAttribute('href', myResume);
  document.querySelector('.my-authorization').textContent = myAuthorization;
}

document.addEventListener('DOMContentLoaded', async function () {
  runTypingEffect();
  getCurrentYear();
  renderSkillList();
  await checkLocation();
});