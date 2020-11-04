const desktop = document.querySelector('.desktop');
let highestZidex = 1;
let windowTop = 50;
let windowLeft = 50;

const closeWindow = (element, icon) => {
  // element.style.display = 'none';
  element.remove();
  icon.classList.remove('fa-folder-open');
  icon.classList.add('fa-folder');
};

const openWindow = (icon) => {
  icon.classList.remove('fa-folder');
  icon.classList.add('fa-folder-open');
};

const increaseZindex = (selectedWindow) => {
  highestZidex += 1;
  selectedWindow.style.zIndex = highestZidex;
};

const cascadeWindow = (newWindow) => {
  newWindow.style.top = windowTop + 'px';
  newWindow.style.left = windowLeft + 'px';
  windowTop += 10;
  windowLeft += 10;
};

// generates new window
const createNewWindow = (e, content, classlist) => {
  console.log(e.target);
  openWindow(e.target);
  // get name of new window from icon data set
  const elName = e.target.dataset.name.split('_').join(' ');
  // create new genaric window with icon name
  const newWindow = document.createElement('div');
  newWindow.innerHTML = `
  <div class="windowHeader header">
    <button class="exit "></button>
    <p>${elName}</p>
  </div>
  <div class="content ${classlist ? classlist : ''}">
  ${content}
  </div>
  `;
  newWindow.classList.add('window', 'newWindow');
  cascadeWindow(newWindow);
  desktop.append(newWindow);
  // add drag, open, and close functionality
  const newWindowHandler = HandleWindow(newWindow, e.target);
};

// handles the opening and closing and movement of windows
function HandleWindow(selectedWindow, icon) {
  const exitButton = selectedWindow.querySelector('.exit');
  const windowHeader = selectedWindow.querySelector('.windowHeader');
  // initially set z index 1 higher
  selectedWindow.style.zIndex = highestZidex + 1;

  const handleMouseDown = (element) => {
    increaseZindex(selectedWindow);

    let windowPosX = 0;
    let windowPosY = 0;
    let mousePosX = 0;
    let mousePosY = 0;

    // handles mouse down on window header
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
    // handles drag of window
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
    // closes drag element functionality
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
    dragMouseDown();
  };

  // ************* Event Listeners ***************
  // drag event listener
  windowHeader.addEventListener('mousedown', () =>
    handleMouseDown(selectedWindow)
  );
  // exit button event listener
  exitButton.addEventListener('click', () => closeWindow(selectedWindow, icon));
  // icon listener
  // icon.addEventListener('click', () => openWindow(selectedWindow, icon));
  // increase zindex once window is clicked
  selectedWindow.addEventListener('click', () =>
    increaseZindex(selectedWindow)
  );
}

export { closeWindow, openWindow, createNewWindow, HandleWindow };
