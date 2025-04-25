// objects can be typed by declaring what the objects should be look like in the anotation
// accessing a property that is't define or performing operations without keeping types in mind will throuh errors
function printName(person) {
    console.log("".concat(person.first, " ").concat(person.last));
}
printName({ first: "shivaji", last: "patil" });
