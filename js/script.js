import { skillList } from './data/skillList.js';
import { projectList } from './data/projectList.js';

function runTypingEffect() {
  let text = `I am Andy P. Kwan`; 
  if (window.innerWidth < 720) text = 'Andy Kwan';

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
  const getCurYear = new Date().getFullYear();

  // render current year
  const curYearEl = document.getElementById('cur-year');
  curYearEl.textContent = getCurYear;

  // render year of expereince
  const experienceYearEl = document.querySelector('.my-experience');
  experienceYearEl.textContent = getCurYear - 2018;
}

// render skills
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

// render projects
function renderProjectList() {
  const rootDiv = document.getElementById('project-list');

  projectList.forEach(function(proj) {
    // create card container
    const projectEl = document.createElement('div');
    projectEl.classList.add('card', 'rounded-3', 'shadow-sm', 'mb-3', 'bg-light');
    rootDiv.append(projectEl);

     // create card body
    const projectBodyEl = document.createElement('div');
    projectBodyEl.classList.add('card-body');
    projectEl.append(projectBodyEl);

    // create card body h4
    const bodyH4 = document.createElement('h4');
    bodyH4.classList.add('card-title', 'mb-3', 'text-center', 'text-lg-left', 'bg-primary', 'text-light', 'p-3', 'rounded-2');
    bodyH4.textContent = proj.name;
    // create icon for h4
    const h4Icon = document.createElement('i');
    h4Icon.className = `${proj.icon} me-4`;
    bodyH4.insertAdjacentElement('afterbegin', h4Icon);
    projectBodyEl.append(bodyH4);
    
    // create project link
    const projLinkEl = document.createElement('p');
    projLinkEl.classList.add('p-2', 'mb-3');
    const projLink = document.createElement('a');
    projLink.className = ('text-secondary');
    projLink.setAttribute('href', proj.link);
    projLink.setAttribute('target', '_blank');
    projLink.textContent = proj.link;
    projLinkEl.append(projLink);
    projectBodyEl.append(projLinkEl);

    // create highlight container
    const projectHighlightEl = document.createElement('div');
    projectHighlightEl.classList.add('p-2', 'mb-3');
    const h6Highlight = document.createElement('h6');
    h6Highlight.textContent = 'Highlights'

    // create highlight list
    const ulHighlight = document.createElement('ul');
    proj.highlights.forEach(highlight => {
        const list = document.createElement('li');
        list.textContent = highlight;
        ulHighlight.append(list);
    });

    // append both h6 and ul to card body
    projectHighlightEl.append(h6Highlight);
    projectHighlightEl.append(ulHighlight);
    projectBodyEl.append(projectHighlightEl);

    // create card footer
    const projectFooterEl = document.createElement('div');
    projectFooterEl.classList.add('card-footer', 'bg-light');
    const footer =  document.createElement('p');
    footer.classList.add('text-lead');
    footer.textContent = proj.description;
    projectFooterEl.append(footer);
    projectBodyEl.append(projectFooterEl);
  });
}

// dynamically render phone number and resume according to the current location
async function checkLocation() {
  const data = await fetch('https://ipapi.co/json/');
  const location = await data.json();

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
  document.querySelectorAll('.my-resume').forEach(function(element) {
    element.setAttribute('href', myResume);
  });
  document.querySelector('.my-authorization').textContent = myAuthorization;
}

// Bootstrap tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

document.addEventListener('DOMContentLoaded', function () {
  runTypingEffect();
  getCurrentYear();
  renderSkillList();
  renderProjectList();
  checkLocation();
});