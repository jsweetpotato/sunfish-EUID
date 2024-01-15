const scrollableElement = document.querySelector('.scrollable');

let isMouseDown = false;
let startX;
let scrollLeft;

const onMouseDown = (e) => {
  isMouseDown = true;
  startX = e.pageX - scrollableElement.offsetLeft;
  scrollLeft = scrollableElement.scrollLeft;
};

const onMouseLeave = () => {
  isMouseDown = false;
};

const onMouseUp = () => {
  isMouseDown = false;
};

const onMouseMove = (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - scrollableElement.offsetLeft;
  const walk = x - startX;
  scrollableElement.scrollLeft = scrollLeft - walk;
};

scrollableElement.addEventListener('mousedown', onMouseDown);
scrollableElement.addEventListener('mouseleave', onMouseLeave);
scrollableElement.addEventListener('mouseup', onMouseUp);
scrollableElement.addEventListener('mousemove', onMouseMove);
