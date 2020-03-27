var playDeck = [];
var i, j, k, l;
var suits = ['diamond', 'clubs', 'hearts', 'spades'];
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var deck = document.getElementById('deck')
var player = true;
var board = [];
var player1 = [];
var player2 = [];
//var random4 = (Math.floor(Math.random() * 3)) + 1;

var startGame = document.createElement("button");
startGame.id = 'start-game';
startGame.innerText = 'Begin';
startGame.class = 'btn btn-primary'
var header = document.getElementById('body')
header.appendChild(startGame);

var createDeck = function () {
    header.removeChild(header.lastChild);
    //diamond suit
    for (i = 0; i < cards.length; i++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${i+1}-D`;
        deckCards.className = 'D';
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
        deckCards.className = 'C';
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
    //hearts suit
    for (k = 0; k < cards.length; k++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${k+1}-H`;
        deckCards.className = 'H';
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
    //spades suit
    for (l = 0; l < cards.length; l++) {
        var deckCards = document.createElement("div");
        deckCards.id = `${l+1}-S`;
        deckCards.className = 'S';
        deck.appendChild(deckCards);
        playDeck.push(deckCards.id)
    }
    console.log(playDeck)
    boardFlop();
}

startGame = addEventListener('click', createDeck);

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
    flopCards();
}

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

// need to read card values now asdasufasdjasd

checkWin = function () {

}

var flopCards = function () {
    // for (i = 0; i < player1.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${player1[i]}.png`;
    //     document.body.appendChild(image);
    // }
    var card1 = player1[0].split('-');
    var card2 = player1[1].split('-');
    console.log(card1)
    console.log(card2)
    // for (i = 0; i < player2.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${player2[i]}.png`;
    //     document.body.appendChild(image);
    // }
    var card3 = player2[0].split('-');
    var card4 = player2[1].split('-');
    console.log(card3)
    console.log(card4)
    // for (i = 0; i < board.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${board[i]}.png`;
    //     document.body.appendChild(image);
    // }
    var card5 = board[0].split('-');
    var card6 = board[1].split('-');
    var card7 = board[2].split('-');
    console.log(card5)
    console.log(card6)
    console.log(card7)
}


//win conditions nightmare nightmare