// w3schools: "A closure is a function having a access to the parent scope, even after the parent function has closed";

// A closure is created when we define a function, not when a function is executed;

let x = 1;

// function parentFunction() {
//     // local scope
//     let myValue = 2;
//     console.log(x);
//     console.log(myValue);

//     function childFunction() {
//         console.log(x += 5);
//         console.log(myValue += 1);
//     }

//     childFunction();
// }   

// parentFunction();

function parentFunction() {
    // local scope
    let myValue = 2;
    console.log(x);
    console.log(myValue);

    function childFunction() {
        console.log(x += 5);
        console.log(myValue += 1);
    }

    return childFunction;
}   

const result = parentFunction();
// This function result have the access to the value of parentFunction after the parent function was closed;
result();

export default parentFunction;