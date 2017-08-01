const documentBody = document.body;
const items = document.querySelectorAll('.grid-item');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalExitButton = document.querySelector('.modal-exit-button');
const modalBanner = document.querySelector('.modal-banner');

var itemInitialDimensions = {};
var itemRef = {};

items.forEach(item => item.addEventListener('click', () => expand(item)));
modalExitButton.addEventListener('click', reset);

modal.onscroll = function(ev) {
  const activeGrideItem = document.querySelector('.grid-item.active');
  const newPosition = (parseInt(activeGrideItem.style.top.replace('px', '')) - modal.scrollTop) + 'px';
  console.log(modal.scrollTop);
  console.log(activeGrideItem.style.top);
  console.log(newPosition);
  // activeGrideItem.style.top = newPosition;
  if (modal.scrollTop < 400) {
  }
};

function expand(item) {
  if (item.className.search('active') > 0) return;
  modalContent.innerHTML = articles.one;
  modal.className = 'modal active';
  item.className += ' active';

  const { innerHeight, innerWidth } = window;
  const { clientHeight, clientWidth } = item;
  const { top, left } = item.getBoundingClientRect();

  itemInitialDimensions = { clientHeight, clientWidth };
  itemRef = item;

  item.style.width = clientWidth + 'px';
  item.style.height = clientHeight + 'px';

  setTimeout(() => {
    documentBody.className = 'container modal-open';
    item.style.left = -left + 'px';
    item.style.top = -top + 'px';
    item.style.width = innerWidth + 'px';
    item.style.height = '400px';
  }, 0)
}

function reset() {
  const { clientHeight, clientWidth } = itemInitialDimensions;

  itemRef.style.left = '0px';
  itemRef.style.top = '0px';
  itemRef.style.width = clientWidth + 'px';
  itemRef.style.height = clientHeight + 'px';
  modal.className = 'modal';
  documentBody.className = 'container';
  setTimeout(() => {
    itemRef.className = itemRef.className.replace(' active', '');
    itemRef.style.width = 'auto';
    itemRef.style.height = 'auto';
  }, 500);
}

(function() {
  const throttle = function(type, name, obj) {
    obj = obj || window;
    let running = false;
    const func = function() {
      if (running) { return; }
      running = true;
       requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle('resize', 'optimizedResize');
})();

window.addEventListener('optimizedResize', function() {
  console.log('resize');
  const activeGrideItem = document.querySelector('.grid-item.active');
  if (activeGrideItem) {
  }
});
