// Tupeles are the special Type exlusive to typescript they dos not exist in ks 
// Tupes are array of fixed lengths and ordered with specific types like super rigid array 
// example 
const color:[number,number,number]=[222,0,225]


let user: [string, number] = ["John Doe", 30];
console.log(user)


// Enums
// An Enum (Enumeration)
//  is a special type in TypeScript that allows you to define a set 
// of named constants, making the code more readable and maintainable.

enum orderStatus{
    PENDING,
    SHIPPED,
    DELIVERED,
    RETURNED
}
const myStatus=orderStatus.DELIVERED;

function isDelivered(status:orderStatus){
    return status=orderStatus.DELIVERED
}
isDelivered(orderStatus.RETURNED)



enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
  }
  
  console.log(Role.Admin); // Output