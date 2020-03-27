var playDeck = [];
var i, j, k, l;
var suits = ['diamond', 'clubs', 'hearts', 'spades'];
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var startGame = document.getElementById('start-button');
var deck = document.getElementById('deck')
var player = true;
var board = [];
var player1 = [];
var player2 = [];
//var random4 = (Math.floor(Math.random() * 3)) + 1;

var createDeck = function () {
    //diamond suit
    for (i = 0; i < cards.length; i++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${i+1}-D`;
        // var image = document.createElement('img')
        // image.src = `images/${i+1}-D.png`
        deck.appendChild(deckCards);
        //deckCards.appendChild(image);
        playDeck.push(deckCards.id)
        
    }
    //clubs suit
    for (j = 0; j < cards.length; j++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${j+1}-C`;
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
    //hearts suit
    for (k = 0; k < cards.length; k++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${k+1}-H`;
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
    //spades suit
    for (l = 0; l < cards.length; l++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${l+1}-S`;
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
}

startGame = addEventListener('click', createDeck);
createDeck();

// deals both players 2 cards and sets up the flop;
var boardFlop = function () {
    while (player1.length < 2) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        player1.push(dealtCard[0]);
        console.log(player1 + ' ===== player 1 cards')
    }
    while (player2.length < 2) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        player2.push(dealtCard[0]);
        console.log(player2 + ' ===== player 2 cards')
    }
    while (board.length < 3) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        board.push(dealtCard[0]);
        console.log(board + ' ==== board cards')
    }
}
boardFlop();

var dealCards = function () {
    //alternate player turns
    if (player) {
        player = false;
    } else if (!player) {
        player = true;
    }
    var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        board.push(dealtCard);
        console.log(board + ' ===== board cards')
}

dealCards();

// need to read card values now asdasufasdjasd
//win conditions nightmare nightmare