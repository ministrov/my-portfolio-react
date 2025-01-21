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
        case 'left':
            return 1;
        case 'right':
            return 2;
        case 'up':
            return 3;
        case 'down':
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

