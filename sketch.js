var cols = 50;//document.getElementById("cols").value;
var rows = 50;//document.getElementById("rows").value;
var grid = new Array();

var startX = 0;
var startY = 0;
var endX = cols;
var endY = rows;

var start = undefined;
var end = undefined;

var path = [];
var percentWall = 0.3;

var astarButton = false;
var greedyButton = false;

function turnOnAstar() {
  astarButton = true;
  astarSetup(grid);
}

function turnOnGreedy(){
  greedyButton = true;
  greedySetup(grid);
}

function recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  
  if (orientation === "horizontal") {
    let possibleRows = [];
    let possibleCols = [];

    for (let number = rowStart; number <= rowEnd; number += 2) possibleRows.push(number);
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) possibleCols.push(number);
    
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    for(var r = 0; r < grid.length; r++) {
      for(var c = 0; c < grid[0].length; c++) {
        if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
            grid[r][c].wall = true;
        }
      }
    }

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation);
    } else {
      recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical");
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation);
    } else {
      recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical");
    }

  } 
  else {
    let possibleCols = [];
    let possibleRows = [];

    for (let number = colStart; number <= colEnd; number += 2) possibleCols.push(number);
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) possibleRows.push(number);
    
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

     for(var r = 0; r < grid.length; r++) {
      for(var c = 0; c < grid[0].length; c++) {
        if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
          grid[r][c].wall = true;
        }
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal");
    } else {
      recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal");
    } else {
      recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation);
    }
  }
};


function Spot(i,j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  this.show = function(col) {
    
    fill(col);
    if(this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.x*w, this.y*h, w-1, h-1);
  }

  this.addNeighbors = function() {
    var i = this.x;
    var j = this.y;
    if (i < cols-1) {
      this.neighbors.push(grid[i+1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i-1][j]);
    }
    if (j < rows-1) {
      this.neighbors.push(grid[i][j+1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j-1]);
    }
    
  }
}

function setup() {
  createCanvas(400, 400);
  astarButton = false;
  loop();
  w = width/cols;
  h = height/rows;

  //Making a 2D array
  for(var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++) {
    for(var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j);
    }
  }

  for(var i = 0; i < cols; i++) {
    for(var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors();
    }
  }

  background(0);

  for(var i = 0; i < cols; i++) {
    for(var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  recursiveDivisionMaze(grid, 1, rows-2, 1, cols-2, "horizontal");
  grid[0][0].wall = false;
  grid[rows-1][cols-1].wall = false;
  for(var i = 0; i < cols; i++) {
    for(var j = 0; j < rows; j++) {
      if(grid[i][j].wall) {
        grid[i][j].show(color(255));
      }
    }
  }

}

function draw() {
  var count = true;
  if(astarButton) {
    astarDraw();
  }
  if(greedyButton) {
    greedyDraw();
  }
}