const app = document.getElementById('app');
let itemInitialDimensions = {};
let itemRef = {};
let prevState = {};
const initialState = {
  gridItems: [
    { fullImage: 'img/7.jpg', isFullImageLoaded: false },
    { fullImage: 'img/11.jpg', isFullImageLoaded: false },
    { fullImage: 'img/15.jpg', isFullImageLoaded: false },
    { fullImage: 'grid/drone0.png', isFullImageLoaded: false },
    { fullImage: 'grid/viz1.png', isFullImageLoaded: false },
    { fullImage: 'img/6.jpg', isFullImageLoaded: false },
  ],
};

window.onload = () => {
  setState(initialState);
  blurUp(initialState);
};

const loadImage = (src, callback) => {
  if (src) {
    let image = new Image();
    image.onload = () => callback ? callback.call(this) : null;
    image.src = src;
  }
};

const blurUp = state => {
  state.gridItems.forEach((item, index) => {
    loadImage(item.fullImage, () => sup(index, state));
  });
};

const sup = (index, state) => {
  console.log('hi')
  const nextGridItems = state.gridItems.slice();
  nextGridItems[index] = { ...nextGridItems[index], isFullImageLoaded: true };
  console.log(nextGridItems)
  setState({ gridItems: nextGridItems });
}

const setState = state => {
  const nextState = { ...prevState, ...state }
  const markup = renderApp(nextState);
  app.innerHTML = markup;
  assignEvents();
  return prevState = nextState;
};

const assignEvents = () => {
  const modal = document.querySelector('.modal');
  const modalExitButton = document.querySelector('.modal-exit-button');
  const items = document.querySelectorAll('.grid-item');
  items.forEach(item => item.addEventListener('click', () => modalOpen(item)));
  modalExitButton.addEventListener('click', modalClose);
  modal.onscroll = function(ev) {
    const activeGrideItem = document.querySelector('.grid-item.active');
    const newPosition = (parseInt(activeGrideItem.style.top.replace('px', '')) - modal.scrollTop) + 'px';
    // console.log(modal.scrollTop);
    // console.log(activeGrideItem.style.top);
    // console.log(newPosition);
    // activeGrideItem.style.top = newPosition;
    if (modal.scrollTop < 400) {
    }
  };
};

const renderApp = state => {
  return (
    `<div class="grid">

      ${state.gridItems.map((item, index) =>
        `<div data-article="one" class="grid-item grid-item-img ${item.isFullImageLoaded ? 'grid-item-full-img' : 'grid-item-preview-img'} grid-item--animateIn"></div>`
      ).join('\n')}

      <div data-article="one" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-prev">
        <div class="grid__link">CONTACT</div>
      </div>
      <div data-article="one" class="grid-item grid-item--animateIn grid-item--nav grid-item--nav-next">
        <div class="grid__link">ARTICLES</div>
      </div>
      <h2 data-article="one" class="grid-item grid-item--animateIn grid-item--name">
        OUR <br/>WORK
      </h2>
      <h3 data-article="one" class="grid-item grid-item--animateIn grid-item--title">
        BUCHEA
      </h3>

    </div>

    <div class="modal">
      <div class="modal-exit-button">X</div>
      <div class="modal-content"></div>
    </div>`
  );
}

function modalOpen(item) {
  if (item.className.search('active') > 0) return;
  const documentBody = document.body;
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const modalBanner = document.querySelector('.modal-banner');
  const { innerHeight, innerWidth } = window;
  const { clientHeight, clientWidth } = item;
  const { top, left } = item.getBoundingClientRect();

  modalContent.innerHTML = articles[item.getAttribute('data-article')];
  modal.className = 'modal active';
  item.className += ' active';
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

function modalClose() {
  const documentBody = document.body;
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const modalBanner = document.querySelector('.modal-banner');
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
