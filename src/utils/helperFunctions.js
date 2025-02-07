const sumTwo = (nums, target) => {
    let targetFirstIndex, targetLastIndex;

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if ((nums[i] + nums[j]) === target) {
                targetFirstIndex = i;
                targetLastIndex = j;
            }
        }
    }

    return [targetFirstIndex, targetLastIndex];
}

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] === target - nums[i]) {
                return [i, j];
            }
        }
    }
    // Return an empty array if no solution is found
    return [];
};

console.log(twoSum);

const isPalindromeNum = function (num) {
    const s = String(num);
    let l = 0, reverse = s.length - 1;

    while (l <= reverse) {
        if (s[l] !== s[reverse]) {
            return false;
        }
        l++;
        reverse--;
    }

    return true;
}

console.log(isPalindromeNum(232));

// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1];

// function debounce(func, delay) {
//     let timeout;

//     return function (...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), delay);
//     }
// }

// const deb = debounce(() => { console.log('callback')}, 5000);

// function replaceSubstringImperativeWay(str, search, replace) {
//     let result = '';

//     for (let i = 0; i < str.length; i++) {
//         if (str.substring(i, i + search.length) === search) {
//             result += replace;
//             i += search.length - 1;
//         } else {
//             result += str[i];
//         }
//     }

//     return result;
// }

// console.log(replaceSubstringImperativeWay('hello world', 'world', 'there'))

// function replateSubstring(str, search, replace) {
//     return str.split(search).join(replace);
// }

// console.log(replateSubstring('hello world', 'world', 'there'));

// function isPalindrome(str) {
//     const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

//     return cleaned === cleaned.split('').reverse().join('');
// }

// console.log(isPalindrome('hello'));

// function isPalindromeImperativeWay(str) {
//     let cleanedStr = str.replace(/[^a-z0-9]/g, '').toLowerCase();

//     for (let i = 0; i < Math.floor(cleanedStr.length / 2); i++) {
//         if (cleanedStr[i] !== cleanedStr[cleanedStr.length - 1 - i]) {
//             return false;
//         }
//     }

//     return true;
// }

// console.log(isPalindromeImperativeWay('hello'));

// // eslint-disable-next-line no-extend-native
// Array.prototype.myFilter = function(callback) {
//     const result = [];

//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) {
//             result.push(this[i]);
//         }
//     }

//     return result;
// }

// const arr = [1, 2, 3, 4, 5];
// const filteredArr = arr.myFilter(x => x > 2);

// console.log(filteredArr);

export {
    // debounce,
    // deb,
    sumTwo
}

