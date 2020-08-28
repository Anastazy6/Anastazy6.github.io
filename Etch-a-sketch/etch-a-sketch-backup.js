/* 
MAIN DOM ELEMENTS, BUTTONS, DIVS AND OTHER CRAP
*/

const container = document.getElementById("container");

const gridResizer = document.getElementById("gridResizer");
const gridWidthInput = document.getElementById("gridWidth");
const gridHeightInput = document.getElementById("gridHeight"); 
const cellShapeButton = document.getElementById("cellShape");
const colorRandomizer = document.getElementById("colorRandomizer");


const colorPicker = document.getElementById("colorPicker");
const colorChangingButton = document.getElementById("colorChangingButton"); // grants access to the color input if you click on the button surrounding it
const opacity005 = document.getElementById("opacityPointZeroFive");
const opacity01 = document.getElementById("opacityPointOne");
const opacity025 = document.getElementById("opacityPointTwentyFive");
const opacity05 = document.getElementById("opacityPointFive");
const opacityMax = document.getElementById("opacityAllIn");




/*
RESIZING FUNCTIONS AND STUFF
*/
let cellShape = "rectangular";  // global
let lastGridHeightInputValue;

cellShapeButton.onclick = function(){
    
    if (this.textContent === "Cell type: rectangular"){
        this.textContent = "Cell type: square";
        cellShape = "square";
        gridWidthInput.placeholder = "Grid size, max is 128";
        gridHeightInput.type = "text";
        lastGridHeightInputValue = gridHeightInput.value;
        gridHeightInput.value = "";
        gridHeightInput.placeholder = "IGNORED";
    } else if (this.textContent === "Cell type: square"){
        this.textContent = "Cell type: rectangular";
        cellShape = "rectangular";
        gridWidthInput.placeholder = "Grid width, max is 128";
        gridHeightInput.value = lastGridHeightInputValue;
        gridHeightInput.placeholder = "grid height, max is 128";
        gridHeightInput.type = "number";

    }
}

gridResizer.onclick = function(){
    let gridWidth = gridWidthInput.value;
    let gridHeight;
    if (cellShape === "rectangular"){
       gridHeight = gridHeightInput.value;
    } else if (cellShape === "square"){
       gridHeight = gridWidth;
    }
    //
    if (gridWidth < 1){
        alert("Grid width is too small. Minimum is 1");
    } else if (gridWidth > 128){
        alert("Grid width is too big. Maximum is 128");
    } else if (gridHeight < 1){
        alert("Grid height is too small. Minimum is 1");
    } else if (gridHeight > 128){
        alert("Grid height is too big. Maximum is 128");
    } else {
        container.innerHTML = "";
        return createGrid(gridHeight, gridWidth)
    }
}

function createGrid(gridHeight, gridWidth){      
    let i = 0;
    for (i; i < gridHeight; i++){
       const newRow =  createRow(gridHeight, gridWidth);
       container.appendChild(newRow);
    }
    return console.log(`The grid is ${gridHeight} cells tall and ${gridWidth} cells wide.`)
}

function createRow(gridHeight, gridWidth) {      
    const row = document.createElement('div');
    row.classList.add('row');
    row.style.height = (800 / gridHeight) + "px";
    let i = 0;
    for (i; i < gridWidth; i++){
        const newCell = createCell(gridHeight, gridWidth);
        row.appendChild(newCell);
}

    return row
}

function createCell(gridHeight, gridWidth){    
    const cell = document.createElement('div');
    cell.classList.add('cell');
    //
    let cellWidth = (800 / gridWidth);
    cell.style.width = cellWidth + "px";
    //
    let cellHeight = (800 / gridHeight) ;
    cell.style.height = cellHeight + "px";
    //
    cell.style.backgroundColor = chosenColor;
    cell.style.opacity = "0";
    //
    let mouseClicked = false;   // Thanks to this stuff, drawing is only possible when the left mouse button is down.
    container.addEventListener('mousedown', function() {mouseClicked = true});  // Works almost as intended
    container.addEventListener('mouseup', function(){mouseClicked = false});    // This implementation is kinda retarded and feels clumsy while playing with the grid

    cell.addEventListener('mousedown', function(){      // Color handling when the mouse is clicked down (releasing it doesn't matter here)
        if (colorRandomizer.textContent === "Random colors: ON"){       // Color handling when you want random colors
            if (this.style.backgroundColor === randomizeColors()){
                this.style.opacity = (this.style.opacity == 1) ? 1 : (parseFloat(this.style.opacity) + chosenOpacity > 1) ? 1 : parseFloat(this.style.opacity) + chosenOpacity;
            } else {
                this.style.backgroundColor = randomizeColors();
                this.style.opacity = chosenOpacity; 
            }
        } else if (this.style.backgroundColor === chosenColor){  // Color handling when you want your chosen color
            this.style.opacity = (this.style.opacity == 1) ? 1 : (parseFloat(this.style.opacity) + chosenOpacity > 1) ? 1 : parseFloat(this.style.opacity) + chosenOpacity;
        } else {
            this.style.backgroundColor = chosenColor;
            this.style.opacity = chosenOpacity; 
        }
    })  //closes cell.addEventListener('mousedown', ...)

    cell.addEventListener('mouseover', function(){      // Color handling when the mouse has just been clicked down withour releasing it and you hover abouve another cell
        if (mouseClicked){
            if (colorRandomizer.textContent === "Random colors: ON"){   // Color handling when you want random colors
                if (this.style.backgroundColor === randomizeColors()){
                    this.style.opacity = (this.style.opacity == 1) ? 1 : (parseFloat(this.style.opacity) + chosenOpacity > 1) ? 1 : parseFloat(this.style.opacity) + chosenOpacity;
                } else {
                    this.style.backgroundColor = randomizeColors();
                    this.style.opacity = chosenOpacity; 
                }
            } else if (this.style.backgroundColor === chosenColor){     // Color handling when you want your chosen color
                this.style.opacity = (this.style.opacity == 1) ? 1 : (parseFloat(this.style.opacity) + chosenOpacity > 1) ? 1 : parseFloat(this.style.opacity) + chosenOpacity;
            } else {
                this.style.backgroundColor = chosenColor;
                this.style.opacity = chosenOpacity; 
            }
        }
}       // closes cell.addEventListener('mouseover'....)
    )       // Shit happens, these parentheses look almost as bad as LISP. Damn.

    return cell
}       // closes createCell()

/*
COLOR FUNCTIONS AND STUFF
*/
let chosenOpacity = 0.1;
let chosenColor = "black";

colorChangingButton.onclick = function(){
    (this.textContent === "IGNORED") ? console.log("Y U clic me :DDD")  : document.getElementById("colorPicker").click();

}

colorPicker.addEventListener('input', function(){
    let chosenColorHex = colorPicker.value;
    //
    let hexRed = chosenColorHex.slice(1,3);
    let hexGreen = chosenColorHex.slice(3,5);
    let hexBlue = chosenColorHex.slice(5,7);

    let decRed = parseInt(hexRed, 16);
    let decGreen = parseInt(hexGreen, 16);
    let decBlue = parseInt(hexBlue, 16);
    //
    chosenColor = `rgb(${decRed}, ${decGreen}, ${decBlue})`;
})

function randomizeColors(){
    function randInt_0_to_255(){
        let rawValue = Math.random();
        let halfProduct = rawValue * 256;
        let result = Math.floor(halfProduct);
        return result
    }
    let red = randInt_0_to_255()
    let green = randInt_0_to_255()
    let blue = randInt_0_to_255()

    return `rgb(${red}, ${green}, ${blue})`
}
let lastActiveOpacityForTheSakeOfTheColorRandomizingButtonFFS;
const cCBinnerHtml = colorChangingButton.innerHTML

colorRandomizer.onclick = function(){
    if (this.textContent === "Random colors: OFF"){
        this.textContent = "Random colors: ON";
        lastActiveOpacityForTheSakeOfTheColorRandomizingButtonFFS = document.querySelector(".opacityActive");
        opacityMax.click();
        colorChangingButton.textContent = "IGNORED";
    } else if (this.textContent === "Random colors: ON"){
        this.textContent = "Random colors: OFF";
        lastActiveOpacityForTheSakeOfTheColorRandomizingButtonFFS.click();
        colorChangingButton.innerHTML = cCBinnerHtml;
    } //closes else if
}   //closes colorRandomizer.onclick


// OPACITY AND STUFF

opacity005.onclick = function(){
    chosenOpacity = 0.05;
    let opacityActiveButton = document.querySelector(".opacityActive");
    opacityActiveButton.classList.remove("opacityActive");
    this.classList.add("opacityActive")
}
opacity01.onclick = function(){
    chosenOpacity = 0.1;
    let opacityActiveButton = document.querySelector(".opacityActive");
    opacityActiveButton.classList.remove("opacityActive");
    this.classList.add("opacityActive")
}
opacity025.onclick = function(){
    chosenOpacity = 0.25;
    let opacityActiveButton = document.querySelector(".opacityActive");
    opacityActiveButton.classList.remove("opacityActive");
    this.classList.add("opacityActive")
}
opacity05.onclick = function(){
    chosenOpacity = 0.5;
    let opacityActiveButton = document.querySelector(".opacityActive");
    opacityActiveButton.classList.remove("opacityActive");
    this.classList.add("opacityActive")
}
opacityMax.onclick = function(){
    chosenOpacity = 1;
    let opacityActiveButton = document.querySelector(".opacityActive");
    opacityActiveButton.classList.remove("opacityActive");
    this.classList.add("opacityActive");
} 




// INITIAL VALUES

createGrid(16,16)
opacity01.classList.add('opacityActive')