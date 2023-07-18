var grid = [];
var openSet =  [];
var closedSet = [];
var noSolution = false;

function heuristic(a, b) {
    var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
}

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function astarSetup(gridIn) {
    openSet = [];
    closedSet = [];
    grid = gridIn;
    start = grid[startX][startY];
    end = grid[endX-1][endY-1];
    openSet.push(start);
}

function astarDraw(){
    if(openSet.length > 0) {
        var winner = 0;
        for(var i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if(current === end) {
            console.log('DONE');
            noLoop();
        }

        removeFromArray(openSet, current);
        closedSet.push(current);
        
        var neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if(closedSet.includes(neighbor) || neighbor.wall) {
                continue;
            }
            var tempG = current.g + 1;
            if(openSet.includes(neighbor) && tempG < neighbor.g) {
                neighbor.g = tempG;
            } else {
                neighbor.g = tempG;
                openSet.push(neighbor);
            }
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
        }
    }
    else {
        console.log('no solution');
        noSolution = true;
        noLoop();
    }

    for(var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255,0,0));
    }

    for(var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0,255,0));
    }

    //Find the path
    if(!noSolution) {
        path = [];
        var temp = current;
        path.push(temp);
        while(temp.previous) {
            path.push(temp.previous);
            if(!temp.previous){
                console.log('no solution');
                break;
            }
            temp = temp.previous;
        }

        for(var i = 0; i < path.length; i++) {
            path[i].show(color(0,0,255));
        }
    }
}