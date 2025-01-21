const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';

function debounce(func, delay) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }
}

function onResize() {
    console.log('Window screen size was changed');
}

function getDirection(direction) {
    switch (direction) {
        case LEFT:
            return 1;
        case RIGHT:
            return 2;
        case UP:
            return 3;
        case DOWN:
            return 4;
        default:
            return -1;
    }
}

console.log(getDirection('left'));

export {
    debounce,
    onResize
}

