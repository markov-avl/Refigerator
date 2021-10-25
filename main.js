const SIGNBOARD = document.getElementById('signboard')
const COMPARTMENT = document.getElementById('compartment')
const LATTICE = document.getElementById('lattice')
const SIZE = 4


COMPARTMENT.style.gridTemplate = `
    repeat(${SIZE}, ${(window.outerHeight * 0.7 - (SIZE * 10)) / SIZE}px) / 
    repeat(${SIZE}, ${(window.outerHeight * 0.7 - (SIZE * 10)) / SIZE}px)`

LATTICE.style.gridTemplate = `repeat(${SIZE}, 1fr) / repeat(${SIZE}, 1fr)`


function isWon() {
    let beer = document.getElementsByClassName("beer vertical")
    if (beer.length === 0 || beer.length === SIZE ** 2) {
        alert("You won!")
        return true
    }
    return false
}

function generateCompartment() {
    for (let i = 0; i < SIZE ** 2; ++i) {
        COMPARTMENT.innerHTML += `<div class="beer ${Math.floor(Math.random() * 2) ? 'vertical' : 'horizontal'}" 
                                       data-i="${Math.floor(i / SIZE)}" 
                                       data-j="${i % SIZE}">
                                       <img src="images/beer.png" alt="">
                                  </div>`
    }
    if (isWon()) {
        generateCompartment()
    }
}

function regenerateCompartment() {
    COMPARTMENT.innerHTML = ''
    generateCompartment()
    addListeners()
}

function generateLattice() {
    for (let i = 0; i < SIZE ** 2; ++i) {
        LATTICE.innerHTML += '<div class="ventilation"></div>'
    }
}

function addListeners() {
    for (let k = 0; k < SIZE ** 2; ++k) {
        let i = Math.floor(k / SIZE)
        let j = k % SIZE
        document.querySelector(`[data-i="${i}"][data-j="${j}"]`).addEventListener('click',
            reverse.bind(null, i, j))
    }
}

function reverseBeer(row, column) {
    let beer = document.querySelector(`[data-i="${row}"][data-j="${column}"]`)
    if (beer.classList.contains('vertical')) {
        beer.classList.remove('vertical')
        beer.classList.add('horizontal')
    } else if (beer.classList.contains('horizontal')) {
        beer.classList.remove('horizontal')
        beer.classList.add('vertical')
    }
}

function reverse(row, column) {
    for (let i = 0; i < SIZE; ++i) {
        reverseBeer(i, column)
        reverseBeer(row, i)
    }
    reverseBeer(row, column)
    isWon()
}

generateCompartment()
generateLattice()
addListeners()
SIGNBOARD.addEventListener('click', regenerateCompartment)