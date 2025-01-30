// w3schools: "A closure is a function having a access to the parent scope, event after the parent function has closed";

let x = 1;

function parentFunction() {
    // local scope
    let myValue = 2;
    console.log(x);
    console.log(myValue);

    function childFunction() {
        console.log(x += 5);
        console.log(myValue += 1);
    }

    childFunction();
}   

parentFunction();

export default parentFunction;