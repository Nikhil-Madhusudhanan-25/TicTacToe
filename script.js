const gameboard=(function(){
    const board=[['','',''],['','',''],['','','']];
    function returnBoard(){
        return board;
    }
    function displayBoard(){
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
        }
    return{returnBoard,displayBoard};
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
        rowColumnArray=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    /* function getMove(){
        while(firstTime){
            gameboard.displayBoard();
            firstTime=0;
        }
        console.log(`${currentActivePlayer.name}'s move - `);
        row=prompt("Enter row to mark");
        column=prompt("Enter column to mark");
        mark();
    } */
    function getMove(tileId){
        displayController.turnDisplay(currentActivePlayer.name);
        [row, column]=rowColumnArray[tileId];
        mark(row, column,tileId);
    }
    /* function mark(){
        let boardRow=board[row-1];
        if(boardRow[column-1]=='')
            boardRow[column-1]=currentActivePlayer.symbol;
        else{
            console.log("This tile is already marked, try again");
            getMove();
        }
        gameboard.displayBoard();
        let result=checkWin();
        if(result!=1)
        {switchPlayer();
        getMove();}
    } */
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
        gameboard.displayBoard();
        let result=checkWin();
        if(result!=1)
        {switchPlayer();
        getMove();}
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
            if(flattenedBoard[a]+flattenedBoard[b]+flattenedBoard[c]==3){
                /* console.log(currentActivePlayer.name+" wins!"); */
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
            /* console.log("Game drawn!"); */
            displayController.displayMessage("Game Drawn!");
            return 1;
        }
    }
    /* function test(){
    } 
    return{test,getMove};*/
    return{getMove};
})();
const displayController=(function(){
    document.getElementById("game-start-button").addEventListener("click",()=>{
        turnDisplay();
        document.querySelectorAll(".tile").forEach((tile)=>{
            tile.style.display="block";
        })
    });
    let tilesList=document.querySelectorAll(".tile");
    tilesList.forEach((tile)=>{
        tile.addEventListener("click",()=>{
            gameFlow.getMove(tile.id);
        });
        
    })
    function displayMessage(message){
        document.getElementById("message").textContent=message;
    }
    function turnDisplay(playerName="player 1"){
        document.getElementById("turn-display").textContent=playerName+"'s turn";
    }
    /* function test(){
        tilesList.forEach((tile)=>{
            console.log(tile.id);
        })
    } 
    return{test}; */
    return{displayMessage,turnDisplay};
})();