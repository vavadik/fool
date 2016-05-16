(function () {
  var app = angular.module("fool", []);

  app.controller('GameController', function () {
    this.gameStarted = false;
    this.playerTurn = true;

    this.player = new Player();
    this.enemy = new Enemy();
    this.cardSet = new CardSet();
    this.desk = new CardDesk();
    this.trump = '';
    this.showButton = true;

    this.trumpText = {
      hearts: 'Черва',
      diamonds: 'Бубна',
      clubs: 'Пика',
      spades: 'Креста'
    }

    this.buttonText = "Ход";

    this.statusText = 'Нажмите "Старт"';

    this.playerTakeCards = function (player, n) {
      if(!this.gameStarted) {
        return;
      }
      player.addCard(this.cardSet.getCard(n));
    };

    this.playerFillCards = function (player) {
      if(!this.gameStarted) {
        return;
      }
      this.playerTakeCards(player, 6 - player.cards.length);
    }

    this.playerMoveCard = function ($event, cardKey, card) {
      if(!this.gameStarted) {
        return;
      }
      if(!this.playerTurn) {
        return;
      }

      if(this.desk.move(card)) {
        this.player.cards.splice(cardKey, 1);
        this.statusText = 'Нажмите "Ход" для завершения хода';
        this.buttonText = 'Ход';
        this.buttonAction = this.playerFinishMove;
      }
    };

    this.playerFinishMove = function () {
      if(!this.gameStarted) {
        return;
      }
      if(!this.playerTurn || !this.desk.cards.length) {
        return;
      }
      this.playerTurn = false;
      this.enemyStrike();
    };

    this.enemyStrike = function () {
      if(!this.gameStarted) {
        return;
      }
      this.enemy.strike(this.desk, this.trump);
      if(this.desk.checkTurnEnd()) {
        this.statusText = 'Отбился! Подкинешь?'
      } else {
        this.statusText = 'Беру! Подкинешь?'
      }
      this.buttonText = 'Завершить ход';
      this.playerTurn = true;
      this.buttonAction = this.finishTurn;
    };

    this.finishTurn = function () {
      if(this.desk.checkTurnEnd()) {
        this.playerTurn = false;
      }
    };

    this.buttonAction = this.playerFinishMove;

    this.startNewGame = function () {
      this.gameStarted = true;
      this.cardSet.generateCardSet();
      this.cardSet.shuffle();
      this.trump = this.cardSet.getTrump();
      this.player.cards = [];
      this.enemy.cards = [];
      this.playerFillCards(this.player);
      this.playerFillCards(this.enemy);
      this.statusText = 'Выберите карты для хода';
    };
  });
})();
