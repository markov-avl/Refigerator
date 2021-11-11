const SIGNBOARD = document.getElementById('signboard')
const COMPARTMENT = document.getElementById('compartment')
const LATTICE = document.getElementById('lattice')
const SIZE = 4

let listeners = []
for (let i = 1; i <= SIZE; i++) {
    listeners.push(null);
}


COMPARTMENT.style.gridTemplate = `
    repeat(${SIZE}, ${(window.outerHeight * 0.7 - (SIZE * 10)) / SIZE}px) / 
    repeat(${SIZE}, ${(window.outerHeight * 0.7 - (SIZE * 10)) / SIZE}px)`

LATTICE.style.gridTemplate = `repeat(${SIZE}, 1fr) / repeat(${SIZE}, 1fr)`


function isWon() {
    console.log('isWon')
    let beer = document.getElementsByClassName("beer vertical")
    if (beer.length === 0 || beer.length === SIZE ** 2) {
        removeListeners()
        setTimeout('alert("You won!"); regenerateCompartment()', 500);
        return true
    }
    return false
}

function generateCompartment() {
    console.log('generateCompartment')
    for (let i = 0; i < SIZE ** 2; ++i) {
        COMPARTMENT.innerHTML += `<div class="beer ${Math.floor(Math.random() * 2) ? 'vertical' : 'horizontal'}" 
                                       data-i="${Math.floor(i / SIZE)}" 
                                       data-j="${i % SIZE}">
                                       <img src="images/beer.png" alt="">
                                  </div>`
    }
    addListeners()
}

function regenerateCompartment() {
    console.log('regenerateCompartment')
    COMPARTMENT.innerHTML = ''
    generateCompartment()
}

function generateLattice() {
    console.log('generateLattice')
    for (let i = 0; i < SIZE ** 2; ++i) {
        LATTICE.innerHTML += '<div class="ventilation"></div>'
    }
}

function addListeners() {
    console.log('addListeners')
    for (let k = 0; k < SIZE ** 2; ++k) {
        let i = Math.floor(k / SIZE)
        let j = k % SIZE
        listeners[k] = () => { reverse(i, j) }
        document.querySelector(`[data-i="${i}"][data-j="${j}"]`).addEventListener('click', listeners[k])
    }
}

function removeListeners() {
    console.log('removeListeners')
    for (let k = 0; k < SIZE ** 2; ++k) {
        let i = Math.floor(k / SIZE)
        let j = k % SIZE
        document.querySelector(`[data-i="${i}"][data-j="${j}"]`).removeEventListener('click', listeners[k])
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
SIGNBOARD.addEventListener('click', regenerateCompartment)