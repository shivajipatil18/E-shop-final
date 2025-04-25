// objects can be typed by declaring what the objects should be look like in the anotation

// accessing a property that is't define or performing operations without keeping types in mind will throuh errors
function printName(person:{first :string,last:string}) :void {
console.log(`${person.first} ${person.last}`)
}
printName({first:"shivaji",last :"patil"})

const coordinates: { x: number; y: number } = { x: 34, y: 2 };

function randomcoordinates(x: number, y: number){
    return {x:Math.random(),y:Math.random()}
}
// type Alias
// instead of writing out object types in an anotation we can declare them saperatly in a type alias 
// which is simply the desire safe of the objects
// This allows us to make our code more readable and even reuse the types elsewhere in the code 

type Person={
    name :string;
    age :number
}
const sayHappyBirthday=(person:Person)=>{
return console.log(`Hey my name is ${person.name } and my age is ${person.age}`)   
}
sayHappyBirthday({name:"shiva",age:38})


// nested Objects

type Song = {
    title: string;
    artist: string;
    numstreams: number;
    credit: {
        producer: string;
        writer: string;
    };
};


function calculatePayout(song: Song): number {
    return song.numstreams * 0.5;
}


function printSong(song: Song): void {
    console.log(`Title: ${song.title}`);
    console.log(`Artist: ${song.artist}`);
    console.log(`Streams: ${song.numstreams}`);
    console.log(`Producer: ${song.credit.producer}`);
    console.log(`Writer: ${song.credit.writer}`);
}


const mySong: Song = {
    title: "Shape of You",
    artist: "Ed Sheeran",
    numstreams: 1000000,
    credit: {
        producer: "Steve Mac",
        writer: "Ed Sheeran"
    }
};

console.log(`Payout: $${calculatePayout(mySong)}`);
printSong(mySong);
// ==============================================================
// optional properities
type Point ={
    x:number
    y:number
    z?:number
}
const myPoint:Point= {x:5,y:4}
// =================================================================
// Intersection
type Circle={
    redius:number
}

type colorfull={
    color:string
}
type ColorFullCIrcle=Circle &colorfull

const happyface:ColorFullCIrcle={
    redius:4,
    color:"yellow"
}
// ===================================================
// Execise
// write the movie type alias to make the following two veriables property types
// make sure that  originalTitle is optional and tile is readonly

type Movie = {
    readonly title: string; // Readonly title
    originalTitle?: string; // Optional originalTitle
    director: string;
    releaseYear: number;
    boxOffice: {
        budget: number;
        grossUS: number;
        grossWorldwide: number;
    };
};
 
const dune:Movie={
    title:"Dune",
    originalTitle:"Dune part 1",
    director :"xyz",
    releaseYear:2021,
boxOffice:{
    budget:10000000000000,
    grossUS:121212,
    grossWorldwide:43444343
},
};

const cats:Movie={
    title:"Dune",
   
    director :"xyz",
    releaseYear:2021,
boxOffice:{
    budget:10000000000000,
    grossUS:121212,
    grossWorldwide:43444343
}
}

// write a function called getprofit that accepts a single moview object it should return a movies wordlwide gross minus its budget
// function getprofit(movie:Movie):number{
//     return movie.boxOffice.grossWorldwide-movie.boxOffice.budget
// }

// function getprofit(movie:Movie):number{
//     const {grossWorldwide,budget}=movie.boxOffice
//     return grossWorldwide-budget
// }

function getprofit({boxOffice:{grossWorldwide,budget}}:Movie):number{
      
        return grossWorldwide-budget
     }