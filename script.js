var playDeck = [];
var i, j, k, l;
var suits = ['D', 'C', 'H', 'S'];
var cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
var deck = document.getElementById('deck')
var board = [];
var player1 = [];
var player2 = [];
var player = [];
var straightFlush = 105;
var fourKind = 92;
var fullHouse = 79;
var flush = 66;
var straight = 53;
var triple = 40;
var twoPair = 27;
var onePair = 14;
var high = 1;
var playerResult, player1Result, player2Result;
var winner;

// var startGame = document.createElement("button");
// startGame.id = 'start-game';
// startGame.type = 'submit';
// startGame.innerText = 'Begin';
// startGame.class = 'btn btn-primary'
// var header = document.getElementById('body')
// header.appendChild(startGame);

var createDeck = function () {
    header = document.getElementById('body')
    header.style.display = 'none';
    var startGame = document.getElementById('start')
    startGame.disabled = true

    //diamond suit
    for (i = 0; i < cards.length; i++) {
        var deckCards =  `${i+1}-D`;
        playDeck.push(deckCards)

    }
    //clubs suit
    for (j = 0; j < cards.length; j++) {
        var deckCards = `${j+1}-C`;
        playDeck.push(deckCards)
    }
    //hearts suit
    for (k = 0; k < cards.length; k++) {
        var deckCards = `${k+1}-H`;
        playDeck.push(deckCards)
    }
    //spades suit
    for (l = 0; l < cards.length; l++) {
        var deckCards = `${l+1}-S`;
        playDeck.push(deckCards)
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
    while (board.length < 3) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        board.push(dealtCard[0]);
        console.log(board + ' ==== board cards')
    }
    printCards();
}

var printCards = function () {
    var boardText = document.getElementById('board')
    var player1Text = document.getElementById('player1')
    var player2Text = document.getElementById('player2')
    boardText.style = 'color : white; font-size:50px;';
    player1Text.style = 'color : white; font-size:50px;';
    player2Text.style = 'color : white; font-size:50px;';
    boardText.innerText= 'Board : '
    player1Text.innerText= 'Player 1 : '
    player2Text.innerText= 'Player 2 : '
    var dealButton = document.createElement('button')
    dealButton.className = 'btn';
    dealButton.className = 'btn-primary';
    dealButton.type = 'submit';
    dealButton.id = 'deal';
    dealButton.innerText = 'Deal Cards';
    var printDeal = document.getElementById('players');
    printDeal.appendChild(dealButton);
    dealButton.addEventListener('click',dealCards)
    for (i = 0; i < board.length; i++) {
        var image = document.createElement('img');
        image.src = `images/${board[i]}.png`;
        image.className = "col-md-2"
        var printBoard = document.getElementById('board')
        printBoard.appendChild(image);
    }
    for (i = 0; i < player1.length; i++) {
        var image = document.createElement('img');
        image.src = `images/${player1[i]}.png`;
        image.className = "col-md-3"
        var printPlayer1 = document.getElementById('player1')
        printPlayer1.appendChild(image);
    }
    for (i = 0; i < player2.length; i++) {
        var image = document.createElement('img');
        image.src = `images/${player2[i]}.png`;
        image.className = "col-md-3"
        var printPlayer2 = document.getElementById('player2')
        printPlayer2.appendChild(image);
    }
}

var dealCards = function () {
    var random = (Math.floor(Math.random() * playDeck.length)) - 1;
    var dealtCard = playDeck.splice(random, 1);
    var image = document.createElement('img');
    image.src = `images/${dealtCard}.png`;
    image.className = "col-sm-2"
    var printBoard = document.getElementById('board')
    printBoard.appendChild(image);
    board.push(dealtCard[0]);
    console.log(board + ' ===== board cards')
    if(board.length === 5){
        dealButton = document.getElementById('deal');
        dealButton.disabled = true;
        dealButton.style.display = 'none';
        setTimeout(checkWin,3000);
    }
}

// var dealCard = document.createElement("button");
//     dealCard.id = 'deal-card';
//     dealCard.innerText = 'Deal Card';
//     dealCard.class = 'btn btn-primary'
//     header.appendChild(dealCard);
//     dealCard = addEventListener('click', dealCards);
var startGame = document.getElementById('start');
startGame.addEventListener('click', createDeck);

var checkStraight = function () {
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var isStraight = 0;
    var playerHand = [parseInt(card1[0]), parseInt(card2[0]), parseInt(card3[0]), parseInt(card4[0]), parseInt(card5[0]), parseInt(card6[0]), parseInt(card7[0])];
    var sortDuplicate = {};
    var sortedPlayerHand = [];
    playerHand.sort(function (a, b) {return (a - b)});
    console.log(playerHand + 'with dupes')
    // to remove duplicates
    for( i = 0; i < playerHand.length; i++){
        if(sortDuplicate[playerHand[i]] > 0){
            sortDuplicate[playerHand[i]]++;
        }
        else{
            sortDuplicate[playerHand[i]] = 1;
        }
    }
    for( j = 1; j < 14; j++){
        if(parseInt(sortDuplicate[j])){
            sortedPlayerHand.push(j);
        }
    }
    console.log(sortedPlayerHand + '==== without dupes')
    if(sortedPlayerHand >= 5){
        for (k = 0; k < sortedPlayerHand.length; k++) {
            // !!! need to check that straight is 5 consecutive and not split up
            if ((sortedPlayerHand[k] + 1) === sortedPlayerHand[k + 1]) {
                isStraight++;
                console.log(isStraight)
            }
            else if (isStraight >= 4){
                playerResult = straight + sortedPlayerHand[k]
                console.log(playerResult)
                console.log('result straight')
                return playerResult;
            }
            // reset the count the moment it is not consecutive;
            else{
                playerResult=0;
                isStraight = 0;
            }
            return playerResult;
        }
    }
}

var checkFlush = function(){
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var sortSuits = {};
    var playerHand = [card1[1],card2[1],card3[1],card4[1],card5[1],card6[1],card7[1]];
    console.log(playerHand)
    for( i = 0; i < playerHand.length; i++){
        if(sortSuits[playerHand[i]] > 0){
            sortSuits[playerHand[i]]++;
        }
        else{
            sortSuits[playerHand[i]] = 1;
        }
    }
    for( j = 0; j < suits.length; j++){
        if(sortSuits[suits[j]] >= 5){
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
            playerResult = flush;
            console.log(playerResult)
            return playerResult;
        }
        else {
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
            return playerResult = 0;
        }
    }
}

var checkCount = function(){
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var countDuplicates = {};
    var pair = 0;
    var threeKind = 0;
    var fourOfKind = 0;
    var pairValue = [];
    var tripleValue = [];
    var fourValue;
    var playerHand = [card1[0],card2[0],card3[0],card4[0],card5[0],card6[0],card7[0]];
    playerHand.sort(function (a, b) {return (a - b)});
    console.log(playerHand)
    for( i = 0; i < playerHand.length; i++){
        if(countDuplicates[playerHand[i]] > 0){
            countDuplicates[playerHand[i]]++;
        }
        else{
            countDuplicates[playerHand[i]] = 1;
        }
    }
    console.log(countDuplicates)
    for( j = 0; j < cards.length; j++){
        if (countDuplicates[cards[j]] == 4){
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            fourValue = (parseInt(cards[j]))
            fourOfKind++;
        }
        else if (countDuplicates[cards[j]] == 3){
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            tripleValue.push(parseInt(cards[j]))
            threeKind++;
        }
        else if(countDuplicates[cards[j]] == 2){
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            pairValue.push(parseInt(cards[j]))
            pair++;
        }
    }
    if(fourOfKind === 1){
        playerResult = fourKind + fourValue
        console.log(playerResult + '====> user got four of a kind')
    }
    else if (threeKind >= 1 && pair >= 1){
        console.log('User got full house')
        playerResult = fullHouse + tripleValue[tripleValue.length-1]
        return console.log(playerResult + '===> player got full house')
    }
    else if (threeKind === 1){
        playerResult = triple + tripleValue[0]
        return console.log(playerResult + '===> player got 1 triple')
    }
    else if (pair >= 2){
        pairValue.sort(function (a, b) {return (a - b)});
        var highPair = pairValue[pairValue.length-1];
        var lowPair = pairValue[pairValue.length-2];
        console.log( highPair + ' =====> high pair ')
        console.log( lowPair + '====> low pair')
        playerResult = highPair + twoPair
        return console.log(playerResult + '===> player got 2 pair')
    }
    else if (pair == 1){
        playerResult = pairValue[0] + onePair
        return console.log(playerResult + '===> player got 1 pair')
    }
    else {
        console.log(high + '==== user got high only')
        playerResult = high + parseInt(playerHand[6])
        return console.log(playerResult + '===> player got high caard')
    }
}

var checkStraightFlush = function(){
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var playerHand = [parseInt(card1[0]), parseInt(card2[0]), parseInt(card3[0]), parseInt(card4[0]), parseInt(card5[0]), parseInt(card6[0]), parseInt(card7[0])];
    var sortDuplicate = {};
    var sortedPlayerHand = [];
    var highcard;
    var isStraight=0;
    playerHand.sort(function (a, b) {return (a - b)});
    console.log(playerHand + 'with dupes')
    // to remove duplicates
    for( i = 0; i < playerHand.length; i++){
        if(sortDuplicate[playerHand[i]] > 0){
            sortDuplicate[playerHand[i]]++;
        }
        else{
            sortDuplicate[playerHand[i]] = 1;
        }
    }
    for( j = 1; j < 14; j++){
        if(parseInt(sortDuplicate[j])){
            sortedPlayerHand.push(j);
        }
    }
    console.log(sortedPlayerHand + '==== without dupes')
    for (k = 0; k < sortedPlayerHand.length; k++) {
        if ((sortedPlayerHand[k] + 1) === sortedPlayerHand[k + 1]) {
            highcard = sortedPlayerHand[k+1]
            isStraight++;
            console.log(isStraight)
        }
        else if (isStraight >= 4){
            playerResult = straight + highcard
            console.log(playerResult)
            console.log('result straight')
        }
        else{
            playerResult =0;
            isStraight = 0;
        }
    }
    if(playerResult >=53){
        var sortSuits = {};
        var playerHand = [card1[1],card2[1],card3[1],card4[1],card5[1],card6[1],card7[1]];
        console.log(playerHand)
        for( i = 0; i < playerHand.length; i++){
            if(sortSuits[playerHand[i]] > 0){
                sortSuits[playerHand[i]]++;
            }
            else{
                sortSuits[playerHand[i]] = 1;
            }
        }
        for( j = 0; j < suits.length; j++){
            if(sortSuits[suits[j]] >= 5){
                console.log(suits[j])
                console.log(sortSuits[suits[j]])
                playerResult = flush;
                console.log(playerResult)
            }
        }
        if(playerResult == flush){
            playerResult = straightFlush + highcard;
            console.log(playerResult)
        }
    }
    return playerResult;
}
    //check for straight first
    //remove duplicates
    //if straight true
    //then check for flush.

var checkWin = function(){
    player = player1;
    checkStraightFlush();
    player1Result = playerResult
    if(player1Result < 105){
        checkCount();
        player1Result = playerResult
        if(player1Result < 92){
            checkCount();
            player1Result = playerResult;
            if(player1Result <79){
                checkFlush();
                player1Result = playerResult;
                if(player1Result < 66){
                    checkStraight();
                    player1Result=playerResult;
                    if(player1Result<53){
                        checkCount();
                        player1Result = playerResult;
                    }
                }
            }
        }
    }
    player = player2;
    checkStraightFlush();
    player2Result = playerResult;
    if(player2Result < 105){
        checkCount();
        player2Result = playerResult
        if(player2Result < 92){
            checkCount();
            player2Result = playerResult;
            if(player2Result <79){
                checkFlush();
                player2Result = playerResult;
                if(player2Result < 66){
                    checkStraight();
                    player2Result=playerResult;
                    if(player2Result<53){
                        checkCount();
                        player2Result = playerResult;
                    }
                }
            }
        }
    }
    if(player1Result > player2Result){
        console.log('Player 1 wins!')
        alert('Player 1 wins!')
    }
    else if (player2Result > player1Result){
        console.log('Player 2 wins!')
        alert('Player 2 wins!')
    }
    else{
        console.log('Its a tie!')
        alert('Its a tie!')
    }
}