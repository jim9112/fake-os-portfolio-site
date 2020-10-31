// ********************** To Do***********************
// dynamically generate all windows
// cascade new windows as they open

import projectList from './js/projectList.js';
import { createNewWindow, HandleWindow } from './js/utils.js';

const aboutMeWindow = document.querySelector('.aboutMe');
const projectsWindow = document.querySelector('.projects');
const aboutMeIcon = document.querySelector('.aboutMeIcon');
const projectsIcon = document.querySelector('.projectsIcon');

const createProjectsIcons = () => {
  const projectIconWindow = document.querySelector('.projectIconWindow');
  const iconHTML = [];
  projectList.forEach((icon) => {
    iconHTML.push(`
    <i data-name=${icon.name
      .split(' ')
      .join('_')} class="fas fa-folder project">
    <br />
    <p>${icon.name}</p>
    </i>
    `);
  });
  projectIconWindow.innerHTML = iconHTML.join(' ');
};

// on page load functions
createProjectsIcons();

const individualProjectIcons = document.querySelectorAll('.project');

const aboutWindow = HandleWindow(aboutMeWindow, aboutMeIcon);
const myProjectsWindow = HandleWindow(projectsWindow, projectsIcon);
// event handlers
individualProjectIcons.forEach((icon) =>
  icon.addEventListener('click', (e) => createNewWindow(e))
);
