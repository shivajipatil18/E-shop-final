// generic allows aus to define reusable functions and classes that work wuth multiple types ration then a single type

const nums: Array<number> = [];
const color: Array<string> = [];

function identity<T>(value: T): T {
  return value;
}

console.log(identity<number>(42));
console.log(identity<string>("Hello"));
console.log(identity<boolean>(true));
// ========================================================================================

function identitynew(item: any): any {
  return item;
}
function identitynew1<Type>(item: Type): Type {
  return item;
}

// Generic function to get a random element from an array
function getRandomElement<T>(list: T[]): T {
  const randIndex = Math.floor(Math.random() * list.length);
  return list[randIndex]; 
}


const numbers = [10, 20, 30, 40];
const randomNumber = getRandomElement(numbers);
console.log("Random Number:", randomNumber); 

const words = ["apple", "banana", "cherry"];
const randomWord = getRandomElement(words);
console.log("Random Word:", randomWord); 


