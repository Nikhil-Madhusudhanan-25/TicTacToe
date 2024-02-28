const gameboard=(function(){
    const board=[['X','O',''],['X','X','O'],['O','','X']];
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
const players={player1:{name:'player 1', symbol:'X'},
    player2:{name:'player 2', symbol:'O'}
}
const gameFlow=(function(){
    let currentActivePlayer=players.player1;
    let board=gameboard.returnBoard();
    let row=0, column=0;
    function getMove(){
        console.log(`${currentActivePlayer.name}'s move - `);
        row=prompt("Enter row to mark");
        column=prompt("Enter column to mark");
        mark();
    }
    function mark(){
        let boardRow=board[row-1];
        if(boardRow[column-1]=='')
            boardRow[column-1]=currentActivePlayer.symbol;
        else{
            console.log("This tile is already marked, try again");
            getMove();
        }
        gameboard.displayBoard();
        switchPlayer();
        getMove();
    }
    function switchPlayer(){
        if(currentActivePlayer==players.player1)
            currentActivePlayer=players.player2;
        else
            currentActivePlayer=players.player1
        return currentActivePlayer;
    }
    /* function test(){
        console.log(currentActivePlayer.name);
    }
    return{test}; */
    return{getMove, mark};
})();