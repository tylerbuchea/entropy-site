const items = document.querySelectorAll('.grid__item');

items.forEach(item => {
  item.addEventListener('click', function() {

    document.querySelector('.modal').style.display = 'block';
    // const { innerWidth, innerHeight } = window;
    // const { top, left } = item.getBoundingClientRect();

    // item.className += ' active';
    // item.style.width = innerWidth + 'px';
    // item.style.height = innerHeight + 'px';
    // item.style.top = `${-top}px`;
    // item.style.left = `${-left}px`;
  });
});

document.querySelector('.modal-exit').addEventListener('click', function() {
  document.querySelector('.modal').style.display = 'none';
});
