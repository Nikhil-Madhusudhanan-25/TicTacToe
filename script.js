const gameboard=(function(){
    const board=[['','',''],['','',''],['','','']];
    function returnBoard(){
        return board;
    }
    function boardReset(){
         for(row of board){
            row.fill('');
        } 
    }
    return{returnBoard,boardReset};
})();

const gameFlow=(function(){
    const players={
        player1:{name:'player 1', symbol:'X'},
        player2:{name:'player 2', symbol:'O'}
    }
    let currentActivePlayer=players.player1;
    let board=gameboard.returnBoard();
    let row=0, 
        column=0
        firstTime=1,
        rowColumnArray=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
        gameOverVar=0;
    function getNames(){
        while(firstTime){
            console.log("while active");
            firstTime=0;
            let setName=prompt("Do you want to set custom names for player 1 and player 2? Enter Yes/No");
            if(setName=="Yes"||setName=="yes"){
                players.player1.name=prompt("Enter player 1 name");
                players.player2.name=prompt("Enter player 2 name");
            }
            displayController.turnDisplay(currentActivePlayer.name);
        }
    }
    function getMove(tileId){
        if(!gameOverVar){
            displayController.turnDisplay(currentActivePlayer.name);
            [row, column]=rowColumnArray[tileId];
            mark(row, column,tileId);
        }
    }
    function mark(row, column,tileId){
        displayController.displayMessage("");
        let boardRow=board[row];
        if(boardRow[column]==''){
            boardRow[column]=currentActivePlayer.symbol;
            document.getElementById(tileId).textContent=currentActivePlayer.symbol;
        }
        else{
            displayController.displayMessage("This tile is already marked, try again");
            getMove();
        }
        let result=checkWin();
        if(result!=1){
            switchPlayer();
            getMove();
        }
        else if(result==1){
            gameOver();
        }
    }
    function switchPlayer(){
        if(currentActivePlayer==players.player1)
            currentActivePlayer=players.player2;
        else
            currentActivePlayer=players.player1
        return currentActivePlayer;
    }
    function checkWin(){
        let flattenedBoard=board.flat().map((element)=>{
            if(element=='X')
                return 1;
            else if(element=='O')
                return -1;
            else
                return 0;
        });
        let a,
            b,
            c,
            count=0;
        let winArray=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(element of winArray){
            [a,b,c]=element;
            if(flattenedBoard[a]+flattenedBoard[b]+flattenedBoard[c]==3||flattenedBoard[a]+flattenedBoard[b]+flattenedBoard[c]==-3){
                displayController.displayMessage(currentActivePlayer.name+" wins!");
                return 1;
            }
        }
        for(element of flattenedBoard){
            if(element==0)
                count++;
        }
        if(count==0)
        {
            displayController.displayMessage("Game Drawn!");
            return 1;
        }
    }
    function gameOver(){
        gameOverVar=1;
        displayController.restartGame();
    }
    function restartGame(){
        gameboard.boardReset();
        currentActivePlayer=players.player1;
        board=gameboard.returnBoard();
        row=0, 
        column=0,
        gameOverVar=0;
        displayController.turnDisplay(currentActivePlayer.name);
    }
    return{getMove,restartGame,getNames};
})();
const displayController=(function(){
    document.getElementById("game-start-button").addEventListener("click",()=>{
        document.getElementById("game-start-message").style.display="none";
        gameFlow.getNames();
        document.querySelectorAll(".tile").forEach((tile)=>{
            tile.style.display="grid";
            tile.style.alignContent="center";
        })
    });
    let tilesList=document.querySelectorAll(".tile");
        tilesList.forEach((tile)=>{
            tile.addEventListener("click",()=>{
                gameFlow.getMove(tile.id);
            });
        })      
    function displayMessage(message=""){
        document.getElementById("message").textContent=message;
    }
    function turnDisplay(playerName="player 1"){
        document.getElementById("turn-display").textContent=playerName+"'s turn";
    }
    function restartGame(){
        let restartButton=document.createElement("button");
        restartButton.textContent="Click here to play again!";
        restartButton.style.display="block";
        document.getElementById("restart-game").appendChild(restartButton);
        restartButton.addEventListener("click",()=>{
            document.querySelectorAll(".tile").forEach((tile)=>{
                tile.textContent="";
            });
            restartButton.style.display="none";
            displayMessage();
            gameFlow.restartGame();
        });
    }
    return{displayMessage,turnDisplay,restartGame};
})();