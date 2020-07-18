const aboutMeWindow = document.querySelector('.aboutMe');
const aboutMeHeader = document.querySelector('.windowHeader');
const aboutMeExitButton = document.querySelector('.aboutExit');

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

// about me drag event listener
aboutMeHeader.addEventListener('mousedown', () =>
  handleMouseDown(aboutMeWindow)
);

// about me exit button event listener
aboutMeExitButton.addEventListener(
  'click',
  () => (aboutMeWindow.style.display = 'none')
);
