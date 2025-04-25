// Arrays can be typed using a type anotation followed by an empy array brackets line numbers for an array of numbers
// these array only allow data of that one type inside them more on that letter.

const activeUses:string[]=[]
activeUses.push("Tony")

const ageList:number[]=[2,3,5,6,7]

ageList[0]=99
// ageList[0]="dsdads"

const bools:boolean[]=[]
// const bools:Array<boolean>=[]
type Pointnew = { x: number; y: number };

const cords: Pointnew[] = [];
cords.push({ x: 23, y: 8 });

console.log(cords);


// ==================================================================
// 1) create an emty array of numbers called ages
const ages:number[]=[]

//2)  create an array varialbe called gameboard that starts as an emty array 
// It should be typed to hold a 2 dymensional array of strings 
const gameBoard:string[][]=[]
// 3) create a product type that contains a name and price  an example of product could be ("name":"coffee mug",price :11.50)
type  Product={
    name:string,
    price:number
}
// 4) write a function called getTotal that accepts an array of products types
// it should return the sum of all the products  amd price
function getTotal(products: Product[]): number {
    let total = 0;
    for (let product of products) {
        total += product.price;
    }
    return total;
}
