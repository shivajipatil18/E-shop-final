//  type of guards involve simply doing a type check before working with the  value 
// since union allows multiple types  for a value we can first check what come through before working with it
function triple(value: number|string){
    if(typeof value==="string"){
        return value.repeat(3)
    }else{
        return value*3
    }
}

// instance of narrowing
// instanceof is  a javascript operator that allows to check if one thing is an instance of another this can help us narrow types when working with thinngs like classes
function printFullDate(data: Date | string): string {
    if (data instanceof Date) {
        return data.toUTCString(); 
    } else {
        return new Date(data).toUTCString();
    }
}

console.log(printFullDate(new Date())); 
console.log(printFullDate("2025-03-25")); 
