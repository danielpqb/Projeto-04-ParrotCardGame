class Card {
    constructor({
        id,
        type,
        backImageSrc,
        flipped = false
    }) {
        this.id = id
        this.type = type
        this.backImageSrc = backImageSrc
        this.flipped = flipped
    }

    getType() {
        this.type = (this.id + rnd) % 7 + 1
        switch (this.type) {
            case 1:
                this.backImageSrc = 'img/bobrossparrot.gif'
                break;
            case 2:
                this.backImageSrc = 'img/explodyparrot.gif'
                break
            case 3:
                this.backImageSrc = 'img/fiestaparrot.gif'
                break
            case 4:
                this.backImageSrc = 'img/metalparrot.gif'
                break
            case 5:
                this.backImageSrc = 'img/revertitparrot.gif'
                break
            case 6:
                this.backImageSrc = 'img/tripletsparrot.gif'
                break
            case 7:
                this.backImageSrc = 'img/unicornparrot.gif'
                break
        }
    }

    createHTML() {
        //Create frontImage as <img>
        const front = document.createElement('img')
        front.src = 'img/front.png'
        front.className = 'frontImage'
        front.dataset.identifier = 'front-face'


        //Create backImage as <img>
        const back = document.createElement('img')
        back.src = this.backImageSrc
        back.className = 'backImage hide'
        back.dataset.identifier = 'back-face'

        //Create cardBox as <div>
        const card = document.createElement('div');
        card.id = this.id
        card.className = 'cardBox'
        card.onclick = selectCard
        card.dataset.identifier = 'card'

        //Put frontImage inside cardBox
        card.appendChild(front)

        //Put backImage inside cardBox
        card.appendChild(back)

        //Put cardBox inside board
        board.appendChild(card)
    }

    flip() {
        //Flip the card selected and add one to the flips counter
        nFlips++
        document.getElementById(this.id).classList.toggle('flip')

        //Is first choice?
        if (isSecond === false) {
            this.flipped = true
            document.getElementById(this.id).querySelectorAll('img').forEach((img) => { img.classList.toggle('hide') })
            isSecond = true
        }
        //Is second choice?
        else {
            //Chose same type (cards match)
            if (this.type === lastCardsFlipped[1].type) {
                this.flipped = true
                document.getElementById(this.id).querySelectorAll('img').forEach((img) => { img.classList.toggle('hide') })

                //Did player match all cards on the board?
                gameOver = true
                cards.forEach((card) => {
                    if (card.flipped === false) {
                        gameOver = false
                    }
                })

                //If game is over, congratulate player
                setTimeout(() => { //Alert should be delayed because it was executing before flipping card
                    if (gameOver === true) {
                        clearInterval(tickInterval) //Stop timer
                        alert('Parabéns, você ganhou em ' + nFlips + ' jogadas!!\nDificuldade: ' + cardsRequested + ' cartas.\nTempo: ' + tick + ' segundos\n\nAtualize a página para jogar novamente.')
                        let r
                        while (r != 'sim' && r != 'não') {
                            switch (r = prompt("Gostaria de jogar novamente? Digite 'sim' ou 'não'.")) {
                                case 'sim':
                                    location.reload()
                                    break;
                                case 'não':
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }, 300);
            }
            //Chose different types (cards do not match)
            else {
                //Flip card so the player can see what's inside
                document.getElementById(this.id).querySelectorAll('img').forEach((img) => { img.classList.toggle('hide') })

                //Unflip cards that didn't match after 1 second
                this.flipped = false //First card clicked
                lastCardsFlipped[1].flipped = false //Second card clicked
                waitingCardsUnflip = true
                setTimeout(() => {
                    document.getElementById(this.id).classList.toggle('flip')
                    document.getElementById(lastCardsFlipped[1].id).classList.toggle('flip')
                    document.getElementById(this.id).querySelectorAll('img').forEach((img) => { img.classList.toggle('hide') })
                    document.getElementById(lastCardsFlipped[1].id).querySelectorAll('img').forEach((img) => { img.classList.toggle('hide') })
                    waitingCardsUnflip = false
                }, 1500);
            }
            isSecond = false
        }
    }
}

function askCardsQnty() {
    let n = prompt('Com quantas cartas você quer jogar?')
    while (isNaN(n) || n % 2 != 0 || n < 4 || n > 200) {
        if (n === null) { return 4 }
        alert('| Regras do Jogo |\nO número de cartas deve ser:\n1) Um número múltiplo de 2.\n2) No mínimo 4.\n3) No máximo 200.')
        n = prompt('Com quantas cartas você quer jogar?')
    }
    return n
}

function selectCard() {
    cards.forEach((card) => {
        if (this.id == card.id && card.flipped === false && waitingCardsUnflip === false) {
            lastCardsFlipped.unshift(card)
            card.flip()
        }
    })
}

function timer() {
    document.querySelector(".clock").innerHTML = `${tick} s`;
    tickInterval = setInterval(() => {
        tick++;
        document.querySelector(".clock").innerHTML = `${tick} s`;
    }, 1000);
}

//Boolean that tells if player is flipping the second card
let isSecond = false

//Boolean that tells if player is waiting for game to unflip the 2 cards selected
let waitingCardsUnflip = false

//Boolean that tells if player matched all cards on the board
let gameOver = false

//Get the number of times that the player flipped a card
let nFlips = 0

//Get a random number to initiate a count that will represent the type of the card
const rnd = Math.floor(Math.random() * 7)

//Store the last cards flipped
const lastCardsFlipped = []

//Ask how many cards will be instanciated
const cardsRequested = askCardsQnty()

//Get board <main> element, where cards will be played
const board = document.querySelector('main')

//Create an empty array where cards will be stored
const cards = []

//Instanciate half qnty of cards
for (let i = 1; i <= cardsRequested / 2; i++) {
    cards.push(new Card({ id: i }))
}

//Give a type to each card
cards.forEach((card) => {
    card.getType()
})

//Instanciate alias cards
cards.forEach((card) => {
    cards.push(new Card({
        id: card.id + cardsRequested / 2,
        type: card.type,
        backImageSrc: card.backImageSrc
    }))
})

//Randomize order of cards
cards.sort(() => { return Math.random() - 0.5 })
cards.sort(() => { return Math.random() - 0.5 })

//Create cards as HTML objects
cards.forEach((card) => {
    card.createHTML()
})

//Start clock timer
let tick = 0
let tickInterval
timer()