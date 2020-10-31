const closeWindow = (element, icon) => {
  // element.style.display = 'none';
  element.remove();
  icon.classList.remove('fa-folder-open');
  icon.classList.add('fa-folder');
};

const openWindow = (element, icon) => {
  element.style.display = '';
  icon.classList.remove('fa-folder');
  icon.classList.add('fa-folder-open');
};

export { closeWindow, openWindow };
