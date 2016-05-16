function Card(type, value) {
  this.type = type;
  this.value = value;
  this.class = this.type + ' value' + this.value;
}

function CardSet(startVal, endVal) {
  var startVal = startVal || 6; // default fool start
  var endVal = endVal || 14; // default fool end
  var set = [];

  this.generateCardSet = function () {
    set = [];
    for(var i = startVal; i <= endVal; i++) {
      set.push(new Card('hearts', i));
      set.push(new Card('spades', i));
      set.push(new Card('diamonds', i));
      set.push(new Card('clubs', i));
    }
  };

  this.shuffle = function () {
    set.sort(function() { return 0.5 - Math.random() });
  };

  this.getCard = function (n) {
    var cards = [];
    for(var i = 0; i < n; i++) {
      cards.push(set.shift());
    }
    return cards;
  };

  this.getTrump = function () {
    return set[set.length - 1].type;
  };
}

function CardDesk() {
  this.cards = [];

  this.move = function (card) {
    var avail = this.checkMove(card);
    if(avail) {
      this.cards.push({move: card, strike: null});
    }
    return avail;
  };

  this.checkMove = function (card) {
    if(this.cards.length) {
      for(var i in this.cards) {
        if(this.cards[i].move.value == card.value || this.cards[i].strike && this.cards[i].strike.value == card.value) {
          return true;
        }
      }
    } else {
      return true;
    }
    return false;
  };

  this.checkStrike = function (moveCard, strikeCard, trump) {
    if(strikeCard && moveCard.type == strikeCard.type) {
      return strikeCard.value > moveCard.value;
    } else if(strikeCard && strikeCard.type == trump) {
      return true;
    }
    return false;
  };

  this.strike = function (card, index, trump) {
    var avail = this.checkStrike(this.cards[index].move, card, trump);
    if(avail) {
      this.cards[index].strike = card;
    }
    return avail;
  };

  this.checkTurnEnd = function () {
    var check = true;
    for(var i in this.cards) {
      if(!this.cards[i].strike) {
        check = false;
        break;
      }
    }
    return check;
  }

  this.turnEnd = function () {
    this.cards = [];
  };
}