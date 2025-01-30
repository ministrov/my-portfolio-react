// const Direction = {
//     LEFT: 'left',
//     RIGHT: 'right',
//     UP: 'up',
//     DOWN: 'down'
// };

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

// function getDirection(direction) {
//     switch (direction) {
//         case Direction.LEFT:
//             return 1;
//         case Direction.RIGHT:
//             return 2;
//         case Direction.UP:
//             return 3;
//         case Direction.DOWN:
//             return 4;
//         default:
//             return -1;
//     }
// }

const sumTwo = (nums, target) => {
    let result = [];

    for (let i = 0; i < nums.length; i++) {
        if ((nums[i] + nums[i + 1]) === target) {
            result.push(nums[i].indexOf());
        }
    }

    return result;
};

// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1];

export {
    debounce,
    onResize,
    sumTwo
}

