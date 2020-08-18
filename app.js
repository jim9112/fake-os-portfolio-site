// ********************** To Do***********************
// remove event listeners when not needed

const aboutMeWindow = document.querySelector('.aboutMe');
const projectsWindow = document.querySelector('.projects');
const aboutMeIcon = document.querySelector('.aboutMeIcon');
const projectsIcon = document.querySelector('.projectsIcon');

let highestZidex = 1;


// create icons in project window
const createProjectsIcons = () => {
  const projectIconWindow = document.querySelector('.projectIconWindow');
  const iconHTML = [];
  projectList.forEach(icon => {
    iconHTML.push(`
    <i class="fas fa-folder aboutMeIcon">
    <br />
    <p>${icon.name}</p>
    </i>
    `);
  });
  projectIconWindow.innerHTML = iconHTML.join(' ');
  console.log(iconHTML);
};



// handles the opening and closing and movement of windows
function HandleWindow(selectedWindow, icon) {
  const exitButton = selectedWindow.querySelector('.exit');
  const windowHeader = selectedWindow.querySelector('.windowHeader');
  selectedWindow.style.zIndex = highestZidex;

  const increaseZindex = () => {
    highestZidex += 1;
    selectedWindow.style.zIndex = highestZidex;
  };

  const handleMouseDown = (element) => {
    increaseZindex();

    let windowPosX = 0;
    let windowPosY = 0;
    let mousePosX = 0;
    let mousePosY = 0;

    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      // get mouse cursor position at start
      mousePosX = e.clientX;
      mousePosY = e.clientY;
      // close function on mouse up
      document.onmouseup = closeDragElement;
      // listen for mouse move
      document.onmousemove = elementDrag;
    };
    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      // calculate new cursor position
      windowPosX = mousePosX - e.clientX;
      windowPosY = mousePosY - e.clientY;
      mousePosX = e.clientX;
      mousePosY = e.clientY;
      // set elements new position
      element.style.top = element.offsetTop - windowPosY + 'px';
      element.style.left = element.offsetLeft - windowPosX + 'px';
    };
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
    dragMouseDown();
  };

  // handle close window
  const closeWindow = (element, icon) => {
    element.style.display = 'none';
    icon.classList.remove('fa-folder-open');
    icon.classList.add('fa-folder');
  };

  // handle open window
  const openWindow = (element, icon) => {
    element.style.display = '';
    icon.classList.remove('fa-folder');
    icon.classList.add('fa-folder-open');
  };
  // ************* Event Listeners ***************
  // drag event listener
  windowHeader.addEventListener('mousedown', () =>
    handleMouseDown(selectedWindow)
  );
  // exit button event listener
  exitButton.addEventListener('click', () => closeWindow(selectedWindow, icon));
  // icon listener
  icon.addEventListener('click', () => openWindow(selectedWindow, icon));
  // increase zindex once window is clicked
  selectedWindow.addEventListener('click', increaseZindex);
}

// on page load functions
createProjectsIcons();
const aboutWindow = HandleWindow(aboutMeWindow, aboutMeIcon);
const myProjectsWindow = HandleWindow(projectsWindow, projectsIcon);
