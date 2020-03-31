var playDeck = [];
var i, j, k, l;
var suits = ['D', 'C', 'H', 'S'];
var cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
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
var userChips = 100000;
var prizePool = 0;
var flopPrinted = false;
var playerHigh;
var winCondition = '';

var inputHappened = function (currentInput) {
    console.log(currentInput)
    var userInput = parseInt(currentInput);
    if (isNaN(userInput)) {
        alert('Please enter valid amount!')
    } else {
        if (!flopPrinted) {
            if (userInput < userChips) {
                printFlop();
                flopPrinted = true;
                prizePool = prizePool + (userInput * 2)
                userChips -= userInput;
                var userChipsLeft = document.getElementById('chips')
                userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
                return userChips;
            } else if (userInput === userChips) {
                printFlop();
                flopPrinted = true;
                var cardsRemaining = 5 - board.length;
                for (i = 0; i < cardsRemaining; i++) {
                    dealCards();
                }
                alert('You have gone all in! Good luck!')
                prizePool = prizePool + (userInput * 2)
                userChips -= userInput;
                var userChipsLeft = document.getElementById('chips')
                userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
                return userChips;
            } else {
                alert('Not enough chips!')
            }

        } else {
            if (userInput < userChips) {
                dealCards();
                prizePool = prizePool + (userInput * 2)
                userChips -= userInput;
                var userChipsLeft = document.getElementById('chips')
                userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
                return userChips;
            } else if (userInput === userChips) {
                var cardsRemaining = 5 - board.length;
                for (i = 0; i < cardsRemaining; i++) {
                    dealCards();
                }
                alert('You have gone all in! Good luck!')
                prizePool = prizePool + (userInput * 2)
                userChips -= userInput;
                var userChipsLeft = document.getElementById('chips')
                userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
                return userChips;
            } else {
                alert('Not enough chips!')
            }
        }
    }
}

var nextGame = function () {
    if(userChips > 0){
        playDeck = [];
        board = [];
        player1 = [];
        player2 = [];
        player = [];
        prizePool = 0;
        flopPrinted = false;
        var clearBoard = document.getElementById('board')
        clearBoard.innerText = '';
        var clearPlayer1 = document.getElementById('player1')
        clearPlayer1.innerText = '';
        var clearPlayer2 = document.getElementById('player2')
        clearPlayer2.innerText = '';
        var nextHand = document.getElementById('nextHand')
        nextHand.style.display = 'none';
        createDeck();
    }
    else{
        alert('Sorry you are out of chips!')
    }
}

var createDeck = function () {
    header = document.getElementById('body')
    header.style.display = 'none';
    var startGame = document.getElementById('start')
    var userBet = document.getElementById('input')
    userBet.style.display = 'block';
    var playerChips = document.getElementById('chips')
    playerChips.style.display = 'block'
    var dealButton = document.getElementById('check');
    dealButton.style.display = 'block';
    var allInButton = document.getElementById('allIn');
    allInButton.style.display = 'block';
    var foldButton = document.getElementById('fold');
    foldButton.style.display = 'block';

    //diamond suit
    for (i = 0; i < cards.length; i++) {
        var deckCards = `${i+1}-D`;
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
    preFlop();
}

// deals both players 2 cards and sets up the flop;
var preFlop = function () {
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
    printCards();
}

var printCards = function () {
    var boardText = document.getElementById('board')
    var player1Text = document.getElementById('player1')
    var player2Text = document.getElementById('player2')
    boardText.style = 'color : white; font-size:50px;';
    player1Text.style = 'color : white; font-size:50px;';
    player2Text.style = 'color : white; font-size:50px;';
    boardText.innerText = 'Board : '
    player1Text.innerText = 'Player 1 : '
    player2Text.innerText = 'Player 2 : '
    for (i = 0; i < player1.length; i++) {
        var image = document.createElement('img');
        image.id = `image${i}`
        image.src = `images/${player1[i]}.png`;
        image.className = "col-md-3"
        var printPlayer1 = document.getElementById('player1')
        printPlayer1.appendChild(image);
    }
    for (i = 0; i < player2.length; i++) {
        var image = document.createElement('img');
        image.id = `image2${i}`
        //image.src = `images/${player2[i]}.png`;
        image.src = `images/red_back.png`;
        image.className = "col-md-3"
        var printPlayer2 = document.getElementById('player2')
        printPlayer2.appendChild(image);
    }
}

var printFlop = function () {
    while (board.length < 3) {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        board.push(dealtCard[0]);
        console.log(board + ' ==== board cards')
    }
    for (i = 0; i < board.length; i++) {
        var image = document.createElement('img');
        image.src = `images/${board[i]}.png`;
        image.className = "col-md-2"
        var printBoard = document.getElementById('board')
        printBoard.appendChild(image);
    }
}

var dealCards = function () {
    if (!flopPrinted) {
        flopPrinted = true;
        printFlop();
    } else {
        var random = (Math.floor(Math.random() * playDeck.length)) - 1;
        var dealtCard = playDeck.splice(random, 1);
        var image = document.createElement('img');
        image.src = `images/${dealtCard}.png`;
        image.className = "col-sm-2"
        var printBoard = document.getElementById('board')
        printBoard.appendChild(image);
        board.push(dealtCard[0]);
        console.log(board + ' ===== board cards')
        if (board.length === 5) {
            player2Card = document.getElementById('image20')
            player2Card.src = `images/${player2[0]}.png`;
            player2Card2 = document.getElementById('image21')
            player2Card2.src = `images/${player2[1]}.png`;
            dealButton = document.getElementById('check');
            betInput = document.getElementById('input')
            dealButton.style.display = 'none';
            betInput.style.display = 'none';
            foldButton = document.getElementById('fold');
            foldButton.style.display = 'none';
            allInButton = document.getElementById('allIn');
            allInButton.style.display = 'none';
            betInput = document.getElementById('input')
            betInput.style.display = 'none';
            setTimeout(checkWin, 3000);
        }
    }
}

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
    playerHand.sort(function (a, b) {
        return (a - b)
    });
    console.log(playerHand + 'with dupes')
    // to remove duplicates
    for (i = 0; i < playerHand.length; i++) {
        if (sortDuplicate[playerHand[i]] > 0) {
            sortDuplicate[playerHand[i]]++;
        } else {
            sortDuplicate[playerHand[i]] = 1;
        }
    }
    for (j = 1; j < 14; j++) {
        if (parseInt(sortDuplicate[j])) {
            sortedPlayerHand.push(j);
        }
    }
    console.log(sortedPlayerHand + '==== without dupes')
    if (sortedPlayerHand.length >= 5) {
        for (k = 0; k < sortedPlayerHand.length; k++) {
            // !!! need to check that straight is 5 consecutive and not split up
            if ((sortedPlayerHand[k] + 1) === sortedPlayerHand[k + 1]) {
                isStraight++;
                console.log(isStraight)
            } else if (isStraight >= 4) {
                playerResult = straight + sortedPlayerHand[k]
                console.log(playerResult)
                console.log('result straight')
                winCondition = 'Straight'
                return playerResult;
            }
            // reset the count the moment it is not consecutive;
            else {
                playerResult = 0;
                isStraight = 0;
            }
        }
        return playerResult;
    }
}

var checkFlush = function () {
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var sortSuits = {};
    var playerHand = [card1[1], card2[1], card3[1], card4[1], card5[1], card6[1], card7[1]];
    console.log(playerHand)
    for (i = 0; i < playerHand.length; i++) {
        if (sortSuits[playerHand[i]] > 0) {
            sortSuits[playerHand[i]]++;
        } else {
            sortSuits[playerHand[i]] = 1;
        }
    }
    for (j = 0; j < suits.length; j++) {
        if (sortSuits[suits[j]] >= 5) {
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
            playerResult = flush;
            console.log(playerResult)
            winCondition = 'Flush'
            return playerResult;
        } else {
            console.log(suits[j])
            console.log(sortSuits[suits[j]])
            playerResult = 0;
        }
    }
}

var checkCount = function () {
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
    var playerHand = [card1[0], card2[0], card3[0], card4[0], card5[0], card6[0], card7[0]];
    playerHand.sort(function (a, b) {
        return (a - b)
    });
    console.log(playerHand)
    for (i = 0; i < playerHand.length; i++) {
        if (countDuplicates[playerHand[i]] > 0) {
            countDuplicates[playerHand[i]]++;
        } else {
            countDuplicates[playerHand[i]] = 1;
        }
    }
    console.log(countDuplicates)
    for (j = 0; j < cards.length; j++) {
        if (countDuplicates[cards[j]] == 4) {
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            fourValue = (parseInt(cards[j]))
            fourOfKind++;
        } else if (countDuplicates[cards[j]] == 3) {
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            tripleValue.push(parseInt(cards[j]))
            threeKind++;
        } else if (countDuplicates[cards[j]] == 2) {
            console.log(cards[j])
            console.log(countDuplicates[cards[j]])
            pairValue.push(parseInt(cards[j]))
            pair++;
        }
    }
    if (fourOfKind === 1) {
        playerResult = fourKind + fourValue
        winCondition = 'four of a kind'
        console.log(playerResult + '====> user got four of a kind')
    } else if (threeKind >= 1 && pair >= 1) {
        console.log('User got full house')
        winCondition = 'full house'
        playerResult = fullHouse + tripleValue[tripleValue.length - 1]
        return console.log(playerResult + '===> player got full house')
    } else if (threeKind === 1) {
        playerResult = triple + tripleValue[0]
        winCondition = 'three of a kind'
        return console.log(playerResult + '===> player got 1 triple')
    } else if (pair >= 2) {
        pairValue.sort(function (a, b) {
            return (a - b)
        });
        var highPair = pairValue[pairValue.length - 1];
        var lowPair = pairValue[pairValue.length - 2];
        console.log(highPair + ' =====> high pair ')
        console.log(lowPair + '====> low pair')
        winCondition = 'two pairs'
        playerResult = highPair + twoPair
        return console.log(playerResult + '===> player got 2 pair')
    } else if (pair == 1) {
        playerResult = pairValue[0] + onePair
        winCondition = 'pair'
        return console.log(playerResult + '===> player got 1 pair')
    } else {
        console.log(high + '==== user got high only')
        playerResult = high + parseInt(playerHand[6])
        winCondition = 'a high card'
        return console.log(playerResult + '===> player got high caard')
    }
}
// all possible 5 cards combinations from 7 cards
/*  a,b,c,d,e,f,g
    c,d,e,f,g       
    a,d,e,f,g       
    a,b,c,f,g
    a,b,c,d,g
    a,b,c,d,e
    b,d,e,f,g
    a,c,e,f,g
    a,b,d,f,g
    a,b,c,e,g
    a,b,c,d,f
    b,c,e,f,g
    a,c,d,f,g
    a,b,d,e,g
    a,b,c,e,f
    b,c,d,f,g
    a,c,d,e,g
    a,b,d,e,f
    b,c,d,e,g
    a,c,d,e,f
    b,c,d,e,f 
    a,b,e,f,g
    */
var checkStraightFlush = function () {
    var count = 0;
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var playerHand = [card1, card2, card3, card4, card5, card6, card7];
    //get all possible 5 card hands
    //loop through playerhand until second last card
    for (i = 0; i < playerHand.length - 1; i++) {
        //loop through all player cards that are next to first card unti last card
        for (j = i + 1; j < playerHand.length; j++) {
            var checkHand = [];
            /*first loop ignores cards 1(i) and 2(j)
            second loop ignores cards 1(i) and 3(j)
            goes on until it reaches card 1 and card7
            starts loop again starting with ignoring cards 2 and 3 etc. */
            for (k = 0; k < playerHand.length; k++) {
                if (k != i && k != j) {
                    checkHand.push(playerHand[k])
                }
            }
            if (checkHand.length >= 5) {
                //check for flush
                if (checkHand[0][1] === checkHand[1][1] && checkHand[0][1] === checkHand[2][1] && checkHand[0][1] === checkHand[3][1] && checkHand[0][1] === checkHand[4][1]) {
                    //check for straight
                    for (l = 0; l < checkHand.length - 1; l++) {
                        if ((parseInt(checkHand[l][0]) + 1) === parseInt(checkHand[l + 1][0])) {
                            highValue = parseInt(checkHand[l + 1]);
                            count++;
                        }
                    }
                    if (count === 4) {
                        console.log('Player got straight flush!')
                        return playerResult = highValue + straightFlush;
                    } else {
                        count = 0;
                        playerResult = 0;
                    }
                } else {
                    playerResult = 0;
                }
            }
        }
    }
}

var checkHigh = function (num) {
    var card1 = player[0].split('-');
    var card2 = player[1].split('-');
    var card3 = board[0].split('-');
    var card4 = board[1].split('-');
    var card5 = board[2].split('-');
    var card6 = board[3].split('-');
    var card7 = board[4].split('-');
    var playerHand = [parseInt(card1[0]), parseInt(card2[0]), parseInt(card3[0]), parseInt(card4[0]), parseInt(card5[0]), parseInt(card6[0]), parseInt(card7[0])];
    playerHand.sort(function (a, b) {
        return (a - b)
    });
    playerHigh = playerHand[playerHand.length - num];
    return playerHigh;
}

var checkWin = function () {
    player = player1;
    checkStraightFlush();
    player1Result = playerResult
    if (player1Result < 105) {
        checkCount();
        player1Result = playerResult
        if (player1Result < 92) {
            checkCount();
            player1Result = playerResult;
            if (player1Result < 79) {
                checkFlush();
                player1Result = playerResult;
                if (player1Result < 66) {
                    checkStraight();
                    player1Result = playerResult;
                    if (player1Result < 53) {
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
    if (player2Result < 105) {
        checkCount();
        player2Result = playerResult
        if (player2Result < 92) {
            checkCount();
            player2Result = playerResult;
            if (player2Result < 79) {
                checkFlush();
                player2Result = playerResult;
                if (player2Result === player1Result) {
                    player = player1
                    player1Result = checkHigh(1);
                    player = player2
                    player2Result = checkHigh(1);
                    if (player2Result === player1Result) {
                        player = player1
                        player1Result = checkHigh(2);
                        player = player2
                        player2Result = checkHigh(2);
                        if (player2Result === player1Result) {
                            player = player1
                            player1Result = checkHigh(3);
                            player = player2
                            player2Result = checkHigh(3);
                            if (player2Result === player1Result) {
                                player = player1
                                player1Result = checkHigh(4)
                                player = player2
                                player2Result = checkHigh(4)
                                if (player2Result === player1Result) {
                                    player = player1
                                    player1Result = checkHigh(5)
                                    player = player2
                                    player2Result = checkHigh(5)
                                }
                            }
                        }
                    }
                }
                if (player2Result < 66) {
                    checkStraight();
                    player2Result = playerResult;
                    if (player2Result < 53) {
                        checkCount();
                        player2Result = playerResult;
                        if (player2Result === player1Result) {
                            player = player1
                            player1Result = checkHigh(1);
                            player = player2
                            player2Result = checkHigh(1);
                            if (player2Result === player1Result) {
                                player = player1
                                player1Result = checkHigh(2);
                                player = player2
                                player2Result = checkHigh(2);
                                if (player2Result === player1Result) {
                                    player = player1
                                    player1Result = checkHigh(3);
                                    player = player2
                                    player2Result = checkHigh(3);
                                    if (player2Result === player1Result) {
                                        player = player1
                                        player1Result = checkHigh(4)
                                        player = player2
                                        player2Result = checkHigh(4)
                                        if (player2Result === player1Result) {
                                            player = player1
                                            player1Result = checkHigh(5)
                                            player = player2
                                            player2Result = checkHigh(5)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(player1Result)
    console.log(player2Result)
    if (player1Result > player2Result) {
        userChips += prizePool;
        var userChipsLeft = document.getElementById('chips')
        userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
        var nextHand = document.getElementById('nextHand')
        nextHand.style.display = 'block';
        console.log('Player 1 wins!')
        alert(`Player 1 wins with ${winCondition}!`)
    } else if (player2Result > player1Result) {
        var nextHand = document.getElementById('nextHand')
        nextHand.style.display = 'block';
        console.log('Player 2 wins!')
        alert(`Player 2 wins with ${winCondition}!`)
    } else {
        userChips = userChips + (prizePool / 2)
        var userChipsLeft = document.getElementById('chips')
        userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
        var nextHand = document.getElementById('nextHand')
        nextHand.style.display = 'block';
        console.log('Its a tie!')
        alert('Its a tie!')
    }
}

var fold = function () {
    var nextHand = document.getElementById('nextHand')
    nextHand.style.display = 'block';
    dealButton = document.getElementById('check');
    betInput = document.getElementById('input')
    dealButton.style.display = 'none';
    betInput.style.display = 'none';
    foldButton = document.getElementById('fold');
    betInput = document.getElementById('input')
    foldButton.style.display = 'none';
    betInput.style.display = 'none';
    allInButton = document.getElementById('allIn');
    allInButton.style.display = 'none';
    alert('Player 2 wins!')
}

var allIn = function () {
    if(!flopPrinted){
        printFlop();
        flopPrinted = true;
        while(board.length < 5) {
            dealCards();
        }
        prizePool = userChips * 2 ;
        userChips -= userChips;
        alert('You have gone all in! Best of luck!')
        var userChipsLeft = document.getElementById('chips')
        userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
        return userChips;
    }
    else{
        while(board.length < 5) {
            dealCards();
        }
        prizePool = userChips * 2 ;
        userChips -= userChips;
        alert('You have gone all in! Best of luck!')
        var userChipsLeft = document.getElementById('chips')
        userChipsLeft.innerText = `Total chips remaining : \n ${userChips}`
        return userChips;
    }
    
}

var userBet = document.createElement('input')
userBet.id = 'input';
userBet.style.display = 'none'
userBet.placeholder = 'Place your bets here.'
var playerBet = document.getElementById('betAmount')
playerBet.appendChild(userBet)
var playerChips = document.createElement('h4')
playerChips.class = 'col-sm-2'
playerChips.id = 'chips'
playerChips.style.color = 'white';
playerChips.style.display = 'none';
playerChips.innerText = `Total chips remaining : \n ${userChips}`
playerBet.appendChild(playerChips);
userBet.addEventListener('change', function (event) {
    var currentInput = event.target.value;
    inputHappened(currentInput)
});

var dealButton = document.createElement('button')
dealButton.className = 'btn';
dealButton.className = 'btn-primary';
dealButton.type = 'submit';
dealButton.id = 'check';
dealButton.style.display = 'none';
dealButton.innerText = 'Check';
var printDeal = document.getElementById('players');
printDeal.appendChild(dealButton);
dealButton.addEventListener('click', dealCards)

var foldButton = document.createElement('button')
foldButton.className = 'btn';
foldButton.className = 'btn-primary';
foldButton.type = 'submit';
foldButton.id = 'fold';
foldButton.style.display = 'none';
foldButton.innerText = 'Fold';
var printDeal = document.getElementById('players');
printDeal.appendChild(foldButton);
foldButton.addEventListener('click', fold)

var allInButton = document.createElement('button')
allInButton.className = 'btn';
allInButton.className = 'btn-primary';
allInButton.type = 'submit';
allInButton.id = 'allIn';
allInButton.style.display = 'none';
allInButton.innerText = 'All In';
var printDeal = document.getElementById('players');
printDeal.appendChild(allInButton);
allInButton.addEventListener('click', allIn)

var startGame = document.getElementById('start');
startGame.addEventListener('click', createDeck);
var temp = document.getElementById('playerBet')
var nextHand = document.createElement('button')
nextHand.className = 'btn';
nextHand.className = 'btn-primary'
nextHand.id = 'nextHand';
nextHand.innerText = 'Next Hand'
nextHand.addEventListener('click', nextGame)
nextHand.style.display = 'none';
temp.appendChild(nextHand)