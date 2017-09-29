// import './styles/index.css';
import './styles/theme-green.css';
import './styles/normalize.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/logo.css';
import './styles/modal.css';
import './styles/grid.css';
import './styles/contact-list.css';

import './img/starmaster0.png';
import './img/starmaster1.png';
import './img/drone0.png';
import './img/drone1.png';
import './img/viz1.png';
import './img/viz5.png';
import './img/crew.gif';

import articles from './articles';

const app = document.getElementById('app');
let itemInitialDimensions = {};
let itemRef = {};
let prevState = {};
const initialState = {
  gridItems: [
    {
      fullImage: 'img/starmaster1.png',
      isFullImageLoaded: false,
      modalTemplate: 'two',
    },
    {
      fullImage: 'img/viz1.png',
      isFullImageLoaded: false,
      modalTemplate: 'three',
    },
    {
      fullImage: 'img/drone1.png',
      isFullImageLoaded: false,
      modalTemplate: 'one',
    },
    {
      fullImage: 'img/drone0.png',
      isFullImageLoaded: false,
      modalTemplate: 'one',
    },
    {
      fullImage: 'img/viz5.png',
      isFullImageLoaded: false,
      modalTemplate: 'three',
    },
    {
      fullImage: 'img/starmaster0.png',
      isFullImageLoaded: false,
      modalTemplate: 'two',
    },
  ],
};

const loadImage = src =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = err => reject(err);
    image.src = src;
  });

const blurUp = state => {
  Promise.all([
    ...state.gridItems.map((item, index) => loadImage(item.fullImage)),
  ]).then(() => {
    // const gridItems = state.gridItems.map(({ fullImage }) => ({ fullImage, isFullImageLoaded: true }));
    // setState({ gridItems });
    [].slice
      .call(document.querySelectorAll('.grid-item-img'))
      .forEach(item => (item.className += ' grid-item-full-img'));
  });
};

const setState = state => {
  const nextState = {
    ...prevState,
    ...state,
  };
  const markup = renderApp(nextState);
  app.innerHTML = markup;
  assignEvents();
  return (prevState = nextState);
};

const assignEvents = () => {
  const modal = document.querySelector('.modal');
  const modalExitButton = document.querySelector('.modal-exit-button');
  const items = document.querySelectorAll('.grid-item');
  items.forEach(item => item.addEventListener('click', () => modalOpen(item)));
  modalExitButton.addEventListener('click', modalClose);
  modal.onscroll = function(ev) {
    const activeGrideItem = document.querySelector('.grid-item.active');
    const newPosition =
      parseInt(activeGrideItem.style.top.replace('px', '')) -
      modal.scrollTop +
      'px';
    // console.log(modal.scrollTop);
    // console.log(activeGrideItem.style.top);
    // console.log(newPosition);
    // activeGrideItem.style.top = newPosition;
    if (modal.scrollTop < 400) {
    }
  };
};

const renderApp = state => {
  return `<div class="grid">

      ${state.gridItems
        .map(
          (item, index) =>
            `<div data-article="${item.modalTemplate}" class="grid-item grid-item-img ${item.isFullImageLoaded
              ? 'grid-item-full-img'
              : 'grid-item-preview-img'} grid-item--animateIn"></div>`
        )
        .join('\n')}

      <div data-article="contact" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-prev">
        <div class="grid__link">CONTACT</div>
      </div>
      <div data-link="http://articles.tensor.team" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-next">
        <div class="grid__link">ARTICLES</div>
      </div>
      <h2 data-article="one" class="grid-item grid-item--animateIn grid-item--name">
        OUR <br/>WORK
      </h2>
      <h3 data-article="one" class="grid-item grid-item--animateIn grid-item--title">
        &#x1F984;
      </h3>

    </div>

    <div class="modal">
      <div class="modal-exit-button">
        <svg viewPort="0 0 0 0" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="30" x2="30" y2="1" stroke="white" stroke-width="2" />
          <line x1="1" y1="1" x2="30" y2="30" stroke="white" stroke-width="2" />
        </svg>
      </div>
      <div class="modal-content"></div>
    </div>`;
};

function modalOpen(item) {
  if (item.className.search('active') > 0) return;
  const documentBody = document.body;
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const modalBanner = document.querySelector('.modal-banner');
  const { innerHeight, innerWidth } = window;
  const { clientHeight, clientWidth } = item;
  const { top, left } = item.getBoundingClientRect();
  const dataLink = item.getAttribute('data-link');
  const dataArticle = item.getAttribute('data-article');

  if (dataLink) return window.open(dataLink);
  modalContent.innerHTML = articles[dataArticle];
  modal.className = 'modal active';
  modal.scrollTop = 0;
  item.className += ' active';
  itemInitialDimensions = {
    clientHeight,
    clientWidth,
  };
  itemRef = item;
  item.style.width = clientWidth + 'px';
  item.style.height = clientHeight + 'px';
  setTimeout(() => {
    documentBody.className = 'container modal-open';
    item.style.left = -left + 'px';
    item.style.top = -top + 'px';
    item.style.width = innerWidth + 'px';
    item.style.height = '400px';
  }, 0);
}

function modalClose() {
  const documentBody = document.body;
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const modalBanner = document.querySelector('.modal-banner');
  const { clientHeight, clientWidth } = itemInitialDimensions;
  const iframe = document.querySelector('iframe');
  // iframe.src = '';

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
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) {
        return;
      }
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

window.addEventListener('optimizedResize', modalClose);

setState(initialState);
blurUp(initialState);
