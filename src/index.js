import './index.scss'

// let colors = [
// 	"rgb(255, 0, 0)", 
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ]

let numSquares = 6
let colors = generateRandomColors(numSquares)
let pickedColor = pickColor()     // picked to guess color
let squares = document.querySelectorAll(".square")
let colorDisplay = document.getElementById("colorDisplay")
let messageDisplay = document.querySelector("#message")
let h1 = document.querySelector("h1")
let resetButton = document.querySelector("#reset")
let easyButton = document.querySelector("#easy")
let hardButton = document.querySelector("#hard")

easyButton.addEventListener("click", function() {
    easyButton.classList.add("selected")
    hardButton.classList.remove("selected")
    numSquares = 3
    colors = generateRandomColors(numSquares)
    // pick new picked color 
    pickedColor = pickColor()
    // change display to show new picked color
    colorDisplay.textContent = pickedColor
    // hide bottom 3 (easybutton mode)
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {    // if there is a next color
            squares[i].style.backgroundColor = colors[i]
        } else {
            squares[i].style.display = "none"
        }
    }
})

hardButton.addEventListener("click", function() {
    easyButton.classList.remove("selected")
    hardButton.classList.add("selected")
    numSquares = 6
    colors = generateRandomColors(numSquares)
    // pick new picked color
    pickedColor = pickColor()
    //change display to show new picked color
    colorDisplay.textContent = pickedColor
    for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i]
            squares[i].style.display = "block"
    }
})

resetButton.addEventListener("click", function () {
    // generate 6 new colors
    colors = generateRandomColors(numSquares)
    // pick new random color from array
    pickedColor = pickColor()
    // update colorDisplay to match picked color
    colorDisplay.textContent = pickedColor
    this.textContent = "New Colors"
    messageDisplay.textContent = ""
    // change colors of squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i]
    }
    h1.style.backgroundColor = "rgb(148, 190, 220)"
})

colorDisplay.textContent = pickedColor // index 3

for (let i = 0; i < squares.length; i++) {
    // add initial colors to squares 
    squares[i].style.backgroundColor = colors[i]
    // add click listener to squares
    squares[i].addEventListener("click", function() {
        // grab color of picked square
        let clickedColor = this.style.backgroundColor
        console.log("clicked:", clickedColor, "picked:", pickedColor )
        // compare color to pickedColor = index 3
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "CORRECT!"
            resetButton.textContent = "Play Again?"
            changeColors(clickedColor)
            h1.style.backgroundColor = clickedColor
        } else {
            this.style.backgroundColor = "rgb(237, 233, 233)"
            messageDisplay.textContent = "TRY AGAIN"
        }
    })
}

function changeColors(color) {
    // loop through all colors
    for (let i = 0; i < squares.length; i++) {
        // change each color to match the pickedColor = index 3
        squares[i].style.backgroundColor = color
    }
}

function pickColor() {
    // pick random color
    let random = Math.floor(Math.random() * colors.length)
    return colors[random]
}

function generateRandomColors(num) {
    // make an array
    let arr = []
    // repeat number of times
    for (let i = 0; i < num; i++) {
        // get random color & push it into array
        arr.push(randomColor())
    }
    // return that array
    return arr
}

function randomColor() {
    // pick red, green, blue from 0-255
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${green}, ${blue})`
}