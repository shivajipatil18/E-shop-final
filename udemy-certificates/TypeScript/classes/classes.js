var Player = /** @class */ (function () {
    function Player(first, last) {
        this.score = 0;
        this.first = first;
        this.last = last;
    }
    Player.prototype.secreatemethod = function () {
        console.log("I am secreate");
    };
    return Player;
}());
var eltan = new Player("Eltan", "Strvw");
console.log(eltan);
// eltan.score get error trying to access private outside the class
eltan.first;
eltan.secreatemethod();
// public and private modifiears in typescript 
// by default modifirier is public
// public properties are access anywhere in the code 
// private properties can be access only withnin class
// we can use # to make properities private
