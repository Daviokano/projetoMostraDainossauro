const list = document.querySelector('.slider .list');
const items = document.querySelectorAll('.slider .item');
const prevBtn = document.querySelector('.buttons #prev');
const nextBtn = document.querySelector('.buttons #next');

let active = 0;
const lengthItems = items.length;

nextBtn.addEventListener('click', () => {
    active = (active + 1) % lengthItems;
    reloadSlider();
});

prevBtn.addEventListener('click', () => {
    active = (active - 1 + lengthItems) % lengthItems;
    reloadSlider();
});

function reloadSlider() {
    const offset = items[active].offsetLeft;
    list.style.transform = `translateX(-${offset}px)`;
}

reloadSlider();