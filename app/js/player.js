function Player() {}

Player.prototype.cards = [];

Player.prototype.addCard = function (card) {
  if( Object.prototype.toString.call( card ) === '[object Array]' ) {
    this.cards = this.cards.concat(card);
  } else {
    this.cards.push(card);
  }
};

function Enemy() {
  this.strike = function (desk, trump) {
    for(var i in desk.cards) {
      if(!desk.cards[i].strike) {
        var smallestIndex = false,
          smallestValue = 14
          isTrump = true;
        for(var j in this.cards) {
          if(desk.checkStrike(desk.cards[i].move, this.cards[j], trump) && smallestValue >= this.cards[j].value) {
            if(this.cards[j].type != trump) {
              isTrump = false;
            }
            if(this.cards[j].type == trump && !isTrump) {
              continue;
            }
            smallestIndex = j;
            smallestValue = this.cards[j].value;
          }
        }
        if(smallestIndex !== false && desk.strike(this.cards[smallestIndex], i, trump)) {
          this.cards.splice(smallestIndex, 1);
        }
      }
    }
  }
}

Enemy.prototype = Object.create(Player.prototype);
Enemy.prototype.constructor = Enemy;
