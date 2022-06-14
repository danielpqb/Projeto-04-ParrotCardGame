class Card {
    constructor({
        id,
        type,
        backImageSrc
    }) {
        this.id = id
        this.type = type
        this.backImageSrc = backImageSrc
    }

    getRndType() {
        const rnd = Math.floor(Math.random() * 7) + 1
        switch (rnd) {
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
        this.type = rnd
    }

    createHTML() {
        //Create frontImage as <img>
        const front = document.createElement('img')
        front.src = 'img/front.png'
        front.className = 'frontImage'

        //Create backImage as <img>
        const back = document.createElement('img')
        back.src = this.backImageSrc
        back.className = 'backImage'

        //Create cardBox as <div>
        const card = document.createElement('div');
        card.id = this.id
        card.className = 'cardBox'
        card.onclick = selectCard

        //Put frontImage inside cardBox
        card.appendChild(front)

        //Put backImage inside cardBox
        card.appendChild(back)

        //Put cardBox inside board
        board.appendChild(card)
    }
}

function askCardsQnty() {
    let n = prompt('Com quantas cartas você quer jogar?')
    n = Number(n)
    while (isNaN(n) || n % 2 != 0 || n <= 0) {
        alert('O valor digitado deve ser um número múltiplo de 2 !!!')
        n = prompt('Com quantas cartas você quer jogar?')
    }
    return n
}

function selectCard() {
    //this.id
}

//Ask how many cards will be instanciated
const cardsRequested = askCardsQnty()

//Get board <main> element, where cards will be played
const board = document.querySelector('main')

//Create an empty array where cards will be stored
const cards = []

//Instanciate half qnty of cards
for (let i = 1; i <= cardsRequested / 2; i++) {
    cards.push(new Card({ id: i, }))
}

//Give a type to each card
cards.forEach((card) => {
    card.getRndType()
})

//Instanciate alias cards
cards.forEach((card) => {
    cards.push(new Card({
        id: card.id + cardsRequested / 2,
        type: card.type,
        backImageSrc: card.backImageSrc
    }))
})

//Create cards as HTML objects
cards.forEach((card) => {
    card.createHTML()
})