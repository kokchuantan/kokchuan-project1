var playDeck = [];
var i, j, k, l;
var suits = ['D', 'C', 'H', 'S'];
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var deck = document.getElementById('deck')
var player = true;
var board = [];
var player1 = [];
var player2 = [];
var straightFlush = 105;
var fourKind = 92;
var fullHouse = 79;
var flush = 66;
var straight = 53;
var triple = 40;
var twoPair = 27;
var onePair = 14;
var high = 1;
var isStraight = 0;
var player1Result, player2Result;

var startGame = document.createElement("button");
startGame.id = 'start-game';
startGame.innerText = 'Begin';
startGame.class = 'btn btn-primary'
var header = document.getElementById('body')
header.appendChild(startGame);

var createDeck = function () {
    startGame = document.getElementById('start-game')
    //startGame.removeEventListener('click',createDeck)
    startGame.style.display = 'none';

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
    while (board.length < 5) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        board.push(dealtCard[0]);
        console.log(board + ' ==== board cards')
    }
    //flopCards();
    //checkStraight();
    checkFlush();
}
// need to read card values now asdasufasdjasd

var printCards = function () {
    // for (i = 0; i < player1.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${player1[i]}.png`;
    //     document.body.appendChild(image);
    // }
    // for (i = 0; i < player2.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${player2[i]}.png`;
    //     document.body.appendChild(image);
    // }
    // for (i = 0; i < board.length; i++) {
    //     var image = document.createElement('img');
    //     image.src = `images/${board[i]}.png`;
    //     document.body.appendChild(image);
    // }
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
    var image = document.createElement('img');
    image.src = `images/${dealtCard}.png`;
    document.body.appendChild(image);
    board.push(dealtCard);
    console.log(board + ' ===== board cards')
}

// var dealCard = document.createElement("button");
//     dealCard.id = 'deal-card';
//     dealCard.innerText = 'Deal Card';
//     dealCard.class = 'btn btn-primary'
//     header.appendChild(dealCard);
//     dealCard = addEventListener('click', dealCards);

startGame = addEventListener('click', createDeck);

//win conditions nightmare nightmare

//straight flush

//4 of a kind ===> count = 6

//full house ===> count = 4

//flush ===> class count >= 5

//straight ===> get values out; arrange in ascending; check if (value[x]+1) === value [x+1] straight++; if straight++ >=5;

//3 of a kind ===> count = 3

//2 pair ===> count = 2

//1 pair ===> with count++ count = 1

//high card

// var card3 = player2[0].split('-');
// var card4 = player2[1].split('-');

var checkStraight = function () {
    var card1 = player1[0].split('-');
    var card2 = player1[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var player1Hand = [parseInt(card1[0]), parseInt(card2[0]), parseInt(card3[0]), parseInt(card4[0]), parseInt(card5[0]), parseInt(card6[0]), parseInt(card7[0])];
    var sortDuplicate = {};
    var sortedPlayer1Hand = [];
    player1Hand.sort(function (a, b) {return (a - b)});
    console.log(player1Hand + 'with dupes')
    // to remove duplicates
    for( i = 0; i < player1Hand.length; i++){
        if(sortDuplicate[player1Hand[i]] > 0){
            sortDuplicate[player1Hand[i]]++;
        }
        else{
            sortDuplicate[player1Hand[i]] = 1;
        }
    }
    for( j = 1; j < 14; j++){
        if(parseInt(sortDuplicate[j])){
            sortedPlayer1Hand.push(j);
        }
    }
    console.log(sortedPlayer1Hand + '==== without dupes')
    for (k = 0; k < sortedPlayer1Hand.length; k++) {
        // !!! need to check that straight is 5 consecutive and not split up
        if ((sortedPlayer1Hand[k] + 1) === sortedPlayer1Hand[k + 1]) {
            isStraight++;
            console.log(isStraight)
        }
        else if (isStraight >= 4){
            player1Result = straight + sortedPlayer1Hand[k];
            console.log(player1Result)
            console.log('result straight')
        }
        // reset the count the moment it is not consecutive;
        else{
            isStraight = 0;
        }       
    }
    // isStraight = 0;
    // var card8 = player2[0].split('-');
    // var card9 = player2[1].split('-');
    // var player2Hand = [parseInt(card8[0]), parseInt(card9[0]), parseInt(card3[0]), parseInt(card4[0]), parseInt(card5[0]), parseInt(card6[0]), parseInt(card7[0])];
    // sortDuplicate = {};
    // var sortedPlayer2Hand = [];
    // player2Hand.sort(function (a, b) {return (a - b)});
    // console.log(player2Hand + 'with dupes')
    // // to remove duplicates
    // for( i = 0; i < player2Hand.length; i++){
    //     if(sortDuplicate[player2Hand[i]] > 0){
    //         sortDuplicate[player2Hand[i]]++;
    //     }
    //     else{
    //         sortDuplicate[player2Hand[i]] = 1;
    //     }
    // }
    // for( j = 1; j < 14; j++){
    //     if(parseInt(sortDuplicate[j])){
    //         sortedPlayer2Hand.push(j);
    //     }
    // }
    // console.log(sortedPlayer2Hand + '==== without dupes')
    // for (k = 0; k < sortedPlayer2Hand.length; k++) {
    //     if ((sortedPlayer2Hand[k] + 1) === sortedPlayer2Hand[k + 1]) {
    //         isStraight++;
    //         console.log(isStraight)
    //     }
    //     else if (isStraight >= 4){
    //         player2Result = straight + sortedPlayer2Hand[k];
    //         console.log(player2Result)
    //         console.log('result straight')
    //     }
    //     else{
    //         isStraight = 0;
    //     }       
    // }
}

var checkFlush = function(){
    var card1 = player1[0].split('-');
    var card2 = player1[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var sortSuits = {};
    var player1Hand = [card1[1],card2[1],card3[1],card4[1],card5[1],card6[1],card7[1]];
    console.log(player1Hand)
    for( i = 0; i < player1Hand.length; i++){
        if(sortSuits[player1Hand[i]] > 0){
            sortSuits[player1Hand[i]]++;
        }
        else{
            sortSuits[player1Hand[i]] = 1;
        }
    }
    for( j = 0; j < suits.length; j++){
        if(sortSuits[suits[j]] >= 5){
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
            player1Result = flush;
            console.log(player1Result)
        }
        else {
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
        }
    }
}