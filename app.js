// ********************** To Do***********************
// cascade new windows as they open

import projectList from './js/projectList.js';
import myProfile from './js/myProfile.js';
import { createNewWindow, HandleWindow } from './js/utils.js';
import { Content } from './js/lib.js';

const aboutMeIcon = document.querySelector('.aboutMeIcon');
const projectsIcon = document.querySelector('.projectsIcon');

// generate icons for each of the portfolio projects
const createProjectsIcons = () => {
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
  return iconHTML.join(' ');
};

// generate new project window
const projectWindowContent = new Content(
  createProjectsIcons(),
  'projectIconWindow'
);

// generate about me window
const aboutMeWindowContent = new Content(myProfile.content, 'indent');

// event handlers

// handler for about me window
aboutMeIcon.addEventListener('click', (e) => {
  const { content, classlist } = aboutMeWindowContent;
  createNewWindow(e, content, classlist);
});

// project window event handler
projectsIcon.addEventListener('click', (e) => {
  const { content, classlist } = projectWindowContent;
  createNewWindow(e, content, classlist);
  const individualProjectIcons = document.querySelectorAll('.project');
  individualProjectIcons.forEach((icon) =>
    icon.addEventListener('click', (e) => createNewWindow(e, '<p>Test</p>'))
  );
});
