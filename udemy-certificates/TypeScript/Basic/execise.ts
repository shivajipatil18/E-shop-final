// write a function called twofer that accepts person name it should return a string in a format 
// one for <name> one for me  if no name is provideed it should default to u

 function twoFer(person:string="shiva"):string{
return `one for ${person} one for me `
 }
 console.log(twoFer())
//  const res=twofer("ajay")
//  console.log(res)
// write a isLeafYear function that accepts year and return true /false depending on if the year is leaf year 
// A year is a leaf year if year  is multiple of 4 and not a multiple of hundred or year  is multople of four hundred 
// const isLeafYear=(year :number):boolean=>{
//     if(year%4==0 && year%100!==0){
//         return true

//     }else if(year%400==0){
//         return true 
//     }
//     return false;
      
// }
var isLeapYear = (year: number): boolean => { 
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

console.log(isLeapYear(2023));