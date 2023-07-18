var grid = [];
var openSet =  [];
var closedSet = [];

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
        arr.splice(i, 1);
        }
    }
}

function depthSetup(gridIn) {
    openSet = [];
    closedSet = [];
    grid = gridIn;
    start = grid[0][0];
    end = grid[cols-1][cols-1];
    openSet.push(start);
}

function depthDraw(){
    if(openSet.length > 0) {
        
    }
    else {
        console.log('no solution');
    }


    for(var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255,0,0));
        openSet[i].show(color(0,255,0));
    }

    //Find the path
    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for(var i = 0; i < path.length; i++) {
        path[i].show(color(0,0,255));
    }
}