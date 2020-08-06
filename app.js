const aboutMeWindow = document.querySelector('.aboutMe');
const aboutMeIcon = document.querySelector('.aboutMeIcon');

// handles the opening and closing and movement of windows
function HandleWindow(selectedWindow, icon) {
  const exitButton = selectedWindow.querySelector('.exit');
  const windowHeader = selectedWindow.querySelector('.windowHeader');

  const handleMouseDown = (element) => {
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
}

const aboutWindow = HandleWindow(aboutMeWindow, aboutMeIcon);
