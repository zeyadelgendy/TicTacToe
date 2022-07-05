let turn = 0;
let winner = 0;
let step = 0;
let numClicks = 0;
document.body.onload = addBox;
let winningCases = [[0,1,2], 
                    [3,4,5], 
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];

let grid = [undefined, 
            undefined, 
            undefined, 
            undefined, 
            undefined, 
            undefined, 
            undefined, 
            undefined, 
            undefined];
let logs  = [[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]];
let indexOfLogs = 0;
let indexOfBacks = 0;


function printBoxes(){
    for(let i = 0; i < boxes.length; i++){
        console.log(boxes[i]);
    }    
}

function addOnClick(i){
    if(document.getElementById("box"+i).innerHTML !== "X" &&  document.getElementById("box"+i).innerHTML !== "O" && winner == 0){
        if (turn == 0){
            turn = 1;
            document.getElementById("box"+i).innerHTML = "X";
            grid[i] = "X";
            let gridCopied = [...grid];
            step+=1;
            document.getElementById("step"+step).style.backgroundColor = '#b8b8b8';
            //document.getElementById("step"+step).onclick = goBackToStep();
            logs.push(gridCopied);
            indexOfLogs+=1;   
            indexOfBacks = logs.length - indexOfLogs;
            numClicks = logs.length;
            //console.log("logs: " + logs);
            addStep();
            calcWinners();
        }else{
            turn = 0;
            grid[i] = "O";
            let gridCopied = [...grid];
            step+=1;
            document.getElementById("step"+step).style.backgroundColor = '#b8b8b8';
            //document.getElementById("step"+step).onclick = goBackToStep();
            logs.push(gridCopied);
            indexOfLogs+=1; 
            indexOfBacks = indexOfLogs-1;
            numClicks = logs.length;
            //console.log("logs: " + logs);
            addStep();
            document.getElementById("box"+i).innerHTML = "O";
            calcWinners();
        }
        //console.log(grid);
    }
}

function addStep(){
    
}

function goBackToStep(i){
    console.log("i: " + i)
    console.log("step: " + step)
    if(parseInt(i) <= step){
        console.log("HEREEEE2")
        grid = [...logs[i]]
    }
    adjustGrid();
}

function goBack(){
    numClicks-=1;
    indexOfBacks = logs.length-1;
    logs.pop();
    grid = [...logs[logs.length-1]];
    //console.log("TURN WAS: " + turn);
    if(turn == 0){
        turn = 1;
    }else{
        turn = 0;
    }
    //console.log("TURN IS: " + turn);
    adjustGrid();
}

function adjustGrid(){
    if(indexOfBacks < 0){
        indexOfBacks = 0;
        for(let i = 0; i < 9; i++){
            document.getElementById("box"+i).innerHTML = "";
            document.getElementById("box"+i).classList.remove("winnerBox");
        }
        grid = new Array(9).fill(undefined);
    }else{
        for(let i = 0; i < 9; i++){
            if(grid[i] == undefined){
                document.getElementById("box"+i).innerHTML = "";
                document.getElementById("box"+i).classList.remove("winnerBox");
            }else{
                document.getElementById("box"+i).innerHTML = grid[i]
                document.getElementById("box"+i).classList.remove("winnerBox");
            }
        }
        
    }
}

function addBox(){
    const newDiv = document.getElementById("boxes");
    for(let i = 0; i < 9; i++){
        const newContent = document.createElement("div");
        newContent.classList.add("box");
        newContent.setAttribute('id', "box" + i);
        newContent.setAttribute('onclick', 'addOnClick('+i+')');
        newDiv.appendChild(newContent);
    }

    //console.log(newDiv);
  }

let boxes = document.querySelectorAll("#boxes div");

function calcWinners(){
    console.log("winners");
    console.log(grid);
    console.log(winningCases);
    console.log("--------------");
    for(let i = 0; i < winningCases.length; i++){
        if(grid[winningCases[i][0]] !== undefined  && grid[winningCases[i][0]] == grid[winningCases[i][1]] && grid[winningCases[i][1]] == grid[winningCases[i][2]]){
            //console.log("winning case: " + i);
            for(let j = 0; j < 3; j++){
                document.getElementById("box"+winningCases[i][j]).classList.add("winnerBox");
            }
            winner = 1;
            break;
        }
    }
}

function resetGame(){
    grid = new Array(9).fill(undefined);
    let logs  = [[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]];
    for(let i = 0; i < 9; i++){
        document.getElementById("box"+i).innerHTML = "";
        document.getElementById("box"+i).classList.remove("winnerBox");
    }
    for(let i = 1; i < 10; i++){
        document.getElementById("step"+i).style.backgroundColor = 'white';
    }
    winner = 0;
    step = 0;
    turn = 0;
    numClicks = 0;
}