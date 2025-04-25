// =======================================================
// function  parametet types 
// in typescript we can specify  the type of function parameters in a function definition
// this allow typescript typescript to enforce the type for the values being passeed into the functions 
// typing parametes are just like typing variables 

function sqare(num:number){
    return num*num;
}

function greet(person:string){
return `hi there ${person}`
}
function dosomething(person:string,age:number, isfunny:true){

}
sqare(3)
greet("shiva")
dosomething("shiva",22 ,true )
// =============================================================
// default parameters
function greetDefault(person:string ="stranger"){
return `Hi there ${person}`
}
greetDefault()
// ========================================================================
// function return types
// we can specify the type return by a function even though typescript can often infer this 
// Add the type annotation after  the function parameter list 
function sqarer(num:number):number{
    return num*num;
}

const add =(x:number,y:number):number=>{
    return x+y
}
// ========================================================================
// Annonymous function 
const colors =["red","orrange","yellow"]
colors.map(color=>{
    return color.toLocaleLowerCase()
})

// void type 
function printTwice(msg="string"):void{
    console.log(msg)
    console.log(msg)
}
// never 
// The never type represent value that never accur we might use it to anotate a function that always throgh an exception 
// or a function that never  finishes executing 
// void returns undefined or null which is technically still a type of value with never a function does not even finish executing 

function makeError(msg:string):never{
    throw new Error(msg)
}