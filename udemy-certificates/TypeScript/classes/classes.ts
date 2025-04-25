class Player {
   readonly first: string;
   public last: string;
    private score:number=0;

    constructor(first: string, last: string) {
        this.first = first;
        this.last = last;
        eltan.secreatemethod()
    }
    private secreatemethod(){
        console.log("I am secreate")
    }
}

const eltan = new Player("Eltan", "Strvw");
console.log(eltan);
// eltan.score get error trying to access private outside the class
eltan.first



// public and private modifiears in typescript 
// by default modifirier is public
// public properties are access anywhere in the code 
// private properties can be access only withnin class
// we can use # to make properities private

// shortend of class
class Playernew {
    private score: number = 0; // Private variable
    constructor(public first: string, public last: string) {}
}


const eltan1 = new Playernew("Eltan", "Strvw");
console.log(eltan1);

// Accessing public properties
console.log(eltan1.first);

//  protected 
// The protected keyword in TypeScript is used to define
//  class members (properties or methods) that can be
//  accessed within the class and its subclasses, 
// but not outside the class.
// abstract classes

abstract class Employee {
    constructor(public first: string, public last: string) {}

    abstract getPay(): number; 

    greet() {
        console.log("Hello");
    }
}

class FullTimeEmployee extends Employee {
    getPay(): number { 
        return 13;
    }
}

class PartTimeEmployee extends Employee { 
    getPay(): number {
        return 121121;
    }
}


const fullTimeEmp = new FullTimeEmployee("John", "Doe");
console.log(fullTimeEmp.getPay());

const partTimeEmp = new PartTimeEmployee("Jane", "Smith");
console.log(partTimeEmp.getPay()); 
