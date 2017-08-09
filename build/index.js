'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var app = document.getElementById('app');
var itemInitialDimensions = {};
var itemRef = {};
var prevState = {};
var initialState = {
  gridItems: [{ fullImage: 'img/7.jpg', isFullImageLoaded: false }, { fullImage: 'img/11.jpg', isFullImageLoaded: false }, { fullImage: 'img/15.jpg', isFullImageLoaded: false }, { fullImage: 'grid/drone0.png', isFullImageLoaded: false }, { fullImage: 'grid/viz1.png', isFullImageLoaded: false }, { fullImage: 'img/6.jpg', isFullImageLoaded: false }]
};

window.onload = function () {
  setState(initialState);
  blurUp(initialState);
};

var loadImage = function loadImage(src) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = function () {
      return resolve(src);
    };
    image.onerror = function (err) {
      return reject(err);
    };
    image.src = src;
  });
};

var blurUp = function blurUp(state) {
  state.gridItems.forEach(function (item, index) {
    loadImage(item.fullImage).then(function () {
      var nextGridItems = prevState.gridItems.slice();
      nextGridItems[index] = _extends({}, nextGridItems[index], { isFullImageLoaded: true });
      setState({ gridItems: nextGridItems });
    });
  });
};

var setState = function setState(state) {
  var nextState = _extends({}, prevState, state);
  var markup = renderApp(nextState);
  app.innerHTML = markup;
  assignEvents();
  return prevState = nextState;
};

var assignEvents = function assignEvents() {
  var modal = document.querySelector('.modal');
  var modalExitButton = document.querySelector('.modal-exit-button');
  var items = document.querySelectorAll('.grid-item');
  items.forEach(function (item) {
    return item.addEventListener('click', function () {
      return modalOpen(item);
    });
  });
  modalExitButton.addEventListener('click', modalClose);
  modal.onscroll = function (ev) {
    var activeGrideItem = document.querySelector('.grid-item.active');
    var newPosition = parseInt(activeGrideItem.style.top.replace('px', '')) - modal.scrollTop + 'px';
    // console.log(modal.scrollTop);
    // console.log(activeGrideItem.style.top);
    // console.log(newPosition);
    // activeGrideItem.style.top = newPosition;
    if (modal.scrollTop < 400) {}
  };
};

var renderApp = function renderApp(state) {
  return '<div class="grid">\n\n      ' + state.gridItems.map(function (item, index) {
    return '<div data-article="one" class="grid-item grid-item-img ' + (item.isFullImageLoaded ? 'grid-item-full-img' : 'grid-item-preview-img') + ' grid-item--animateIn"></div>';
  }).join('\n') + '\n\n      <div data-article="one" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-prev">\n        <div class="grid__link">CONTACT</div>\n      </div>\n      <div data-article="one" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-next">\n        <div class="grid__link">ARTICLES</div>\n      </div>\n      <h2 data-article="one" class="grid-item grid-item--animateIn grid-item--name">\n        OUR <br/>WORK\n      </h2>\n      <h3 data-article="one" class="grid-item grid-item--animateIn grid-item--title">\n        STAR MASTER\n      </h3>\n\n    </div>\n\n    <div class="modal">\n      <div class="modal-exit-button">\n        <svg viewPort="0 0 0 0" version="1.1" xmlns="http://www.w3.org/2000/svg">\n          <line x1="1" y1="30" x2="30" y2="1" stroke="white" stroke-width="2" />\n          <line x1="1" y1="1" x2="30" y2="30" stroke="white" stroke-width="2" />\n        </svg>\n      </div>\n      <div class="modal-content"></div>\n    </div>';
};

function modalOpen(item) {
  if (item.className.search('active') > 0) return;
  var documentBody = document.body;
  var modal = document.querySelector('.modal');
  var modalContent = document.querySelector('.modal-content');
  var modalBanner = document.querySelector('.modal-banner');
  var _window = window,
      innerHeight = _window.innerHeight,
      innerWidth = _window.innerWidth;
  var clientHeight = item.clientHeight,
      clientWidth = item.clientWidth;

  var _item$getBoundingClie = item.getBoundingClientRect(),
      top = _item$getBoundingClie.top,
      left = _item$getBoundingClie.left;

  modalContent.innerHTML = articles[item.getAttribute('data-article')];
  modal.className = 'modal active';
  modal.scrollTop = 0;
  item.className += ' active';
  itemInitialDimensions = { clientHeight: clientHeight, clientWidth: clientWidth };
  itemRef = item;
  item.style.width = clientWidth + 'px';
  item.style.height = clientHeight + 'px';
  setTimeout(function () {
    documentBody.className = 'container modal-open';
    item.style.left = -left + 'px';
    item.style.top = -top + 'px';
    item.style.width = innerWidth + 'px';
    item.style.height = '400px';
  }, 0);
}

function modalClose() {
  var documentBody = document.body;
  var modal = document.querySelector('.modal');
  var modalContent = document.querySelector('.modal-content');
  var modalBanner = document.querySelector('.modal-banner');
  var _itemInitialDimension = itemInitialDimensions,
      clientHeight = _itemInitialDimension.clientHeight,
      clientWidth = _itemInitialDimension.clientWidth;

  var iframe = document.querySelector('iframe');
  iframe.src = '';

  itemRef.style.left = '0px';
  itemRef.style.top = '0px';
  itemRef.style.width = clientWidth + 'px';
  itemRef.style.height = clientHeight + 'px';
  modal.className = 'modal';
  documentBody.className = 'container';
  setTimeout(function () {
    itemRef.className = itemRef.className.replace(' active', '');
    itemRef.style.width = 'auto';
    itemRef.style.height = 'auto';
  }, 500);
}
