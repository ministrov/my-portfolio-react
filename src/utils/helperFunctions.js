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

function replaceSubstringImperativeWay(str, search, replace) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (str.substring(i, i + search.length) === search) {
            result += replace;
            i += search.length - 1;
        } else {
            result += str[i];
        }
    }

    return result;
}

console.log(replaceSubstringImperativeWay('hello world', 'world', 'there'))

function replateSubstring(str, search, replace) {
    return str.split(search).join(replace);
}

console.log(replateSubstring('hello world', 'world', 'there'));

function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome('hello'));

function isPalindromeImperativeWay(str) {
    let cleanedStr = str.replace(/[^a-z0-9]/g, '').toLowerCase();

    for (let i = 0; i < Math.floor(cleanedStr.length / 2); i++) {
        if (cleanedStr[i] !== cleanedStr[cleanedStr.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

console.log(isPalindromeImperativeWay('hello'));

export {
    debounce,
    onResize,
    sumTwo
}

