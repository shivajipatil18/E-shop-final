// Union Types
// Union Type allow us to give a value a few differnet possible types  if the eventual values type is included
// In TypeScript, union types allow a variable to hold multiple types. You can use the | (pipe) symbol to define a union type.
let age: number | string | boolean = 22;
age = 23;
age = "24";
age = true;

type Point = {
  x: number;
  long: number;
};

type Loc = {
  lat: number;
  long: number;
};

let coordinates: Point | Loc = { x: 1, long: 34 };
coordinates = { lat: 1, long: 34 };

// Type Narrowing use union along with funtions
function printAge(age: number | string): void {
  console.log(`  My age is ${age}years old `);
}
// ===============================================
// Execise
// create a varaible called highschore that can be number or boolian

const highScore: number | boolean = 10;

// 2 create an array called stuffs it can be array of numbers or an array of string and cannot be an array of numbers and string

const stuff: number[] | string[] = [];
// create a literal type skill level there are 4 allowed values beginer intermadiate advanced and expert
const skillLevel: ("Beginner" | "Intermediate" | "Advanced" | "Expert")[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

// 3 create  type called skischoolstudent  name must be string age must be number
// sports must be ski or snowboard
// level must be a value from the skill level type
type skischoolstudent = {
  name: "string";
  number: number;
  sports: "ski" | "snwboard";
  level: "skillLevel";
};

// 4  define a type to represent an an RGB color r shoulbe be number g should be number b should be a number  create an array ccalled color that can be hold a mixture of RGB HSL color type
type RGB = {
  R: number;
  G: number;
  B: number;
};
type HSL = {
  H: number;
  S: number;
  L: number;
};
const colors: (RGB | HSL)[] = [];
// write a  function called greet that accept a single string or an array of string
// it  should print hello <name> for that single person or greet each person in the array with the same foramt

const greet = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello,${person}`);
  } else {
    for (let p of person) {
      console.log(`Hello,${p}`);
    }
  }
};
