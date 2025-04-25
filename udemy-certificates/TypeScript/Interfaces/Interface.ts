// Interface serves almost the exact same purpose as type alias with slightly different syntax
// we can use them to create reusable , modular types that describe the shapes of the objects 

interface Person {
    name :string;
    age:number
};
const sayHappyBirthDay=(person:Person)=>{
    return console.log(`my name is ${person.name} and my age is ${person.age}`)
}
sayHappyBirthDay({name:"jerry",age:22})

// adding methods to interface 
interface dog{
    name:string;
    age:number
}

interface dog {
    breed:string;
    bark():string

}
const elton:dog={
    name:"elton",
    age:.5, 
    breed :"australian shefard",
    bark(){
          return "woof woof"
    },
  

}
interface servceDog extends dog{
    job:"drug snipper "|"BOMB SQAUD"|"Guide dog"
}
const chewy :servceDog={
    name:"chewy",
    age:4.5,
    breed:"lab",
    bark(){
        return "bark!"
    },
    job:"Guide dog"
}

// Interface Vs type Alias
// interface syntax
interface User {
    name: string;
    age: number;
  }
// Type allis syntax  
type user={
    name:string;
    age:number
}

//  Prefer interface when defining object shapes and extending them.
//  Use type for union types, primitive types, or function types.

