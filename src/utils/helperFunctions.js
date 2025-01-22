const Direction = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down'
};

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
        case Direction.LEFT:
            return 1;
        case Direction.RIGHT:
            return 2;
        case Direction.UP:
            return 3;
        case Direction.DOWN:
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

