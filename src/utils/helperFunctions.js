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

export {
    debounce,
    onResize
}

