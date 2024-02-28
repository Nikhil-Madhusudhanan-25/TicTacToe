const gameboard=(function(){
    const board=[['X','O',''],['X','X','O'],['O','','X']];
    function returnBoard(){
        console.log(board);
    }
    return{returnBoard};
})();
const players={player1:{name:'player 1', symbol:'X'},
    player2:{name:'player 2', symbol:'O'}
}
const gameFlow=(function(){
    
})();