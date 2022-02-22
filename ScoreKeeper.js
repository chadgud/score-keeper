// Get key elements and set key variables
const teamOneDisplay = document.querySelector('#teamOneDisplay');
const teamTwoDisplay = document.querySelector('#teamTwoDisplay');
const btnTeamOneSingle = document.querySelector('#teamOneSingle');
const btnTeamOneDouble = document.querySelector('#teamOneDouble');
const btnTeamOneTriple = document.querySelector('#teamOneTriple');
const btnTeamTwoSingle = document.querySelector('#teamTwoSingle');
const btnTeamTwoDouble = document.querySelector('#teamTwoDouble');
const btnTeamTwoTriple = document.querySelector('#teamTwoTriple');
const btnReset = document.querySelector('#reset');
const selector = document.querySelector('#playTo');
const scoreDisplay = document.querySelector('#scoreDisplay');
let teamOneScore = 0;
let teamTwoScore = 0;
let playToScore = 7;

//Add points with these buttons
btnTeamOneSingle.addEventListener('click', function() {
    //only allow scores to increment if the game is still going
    if (!isGameOver()){ 
        teamOneDisplay.innerText = updateScore(1,1);
    }

    //runs every time to make sure a win is dected immediately after a winning score rather than on the next click
    winnerWinner();                                                 
});

btnTeamOneDouble.addEventListener('click', function() {
    if (!isGameOver()){
        teamOneDisplay.innerText = updateScore(1,2);
    }
    winnerWinner();
});

btnTeamOneTriple.addEventListener('click', function() {
    if (!isGameOver()){
        teamOneDisplay.innerText = updateScore(1,3);
    }
    winnerWinner();
});

btnTeamTwoSingle.addEventListener('click', function() {
    if (!isGameOver()){
        teamTwoDisplay.innerText = updateScore(2,1);
    }
    winnerWinner();
});

btnTeamTwoDouble.addEventListener('click', function() {
    if (!isGameOver()){
        teamTwoDisplay.innerText = updateScore(2,2);
    }
    winnerWinner();
});

btnTeamTwoTriple.addEventListener('click', function() {
    if (!isGameOver()){
        teamTwoDisplay.innerText = updateScore(2,3);
    }
    winnerWinner();
});

//Reset button
btnReset.addEventListener('click', function() {
    resetGame();
    selector.selectedIndex = 0;                                     //set the select and associated value back to default
    playToScore = 7;
})

//Select box
selector.addEventListener('change', function(event) {
    playToScore = parseInt(event.target.value);  
    resetGame(1);  
})

//checks to see if a team has reached the winning score
function isGameOver() {
    if (teamOneScore < playToScore && teamTwoScore < playToScore) {
        return false;
    } else {
        return true;
    }
}

//updates the score of the team passed in by the amount passed in
function updateScore(team, amount) {
    if (team === 1){
        teamOneScore += amount;
        return teamOneScore;
    } else {
        teamTwoScore += amount;
        return teamTwoScore;
    }
}

//here's what happens when someone wins
function winnerWinner(){
    if (isGameOver()) {                                                 //checks to see if game is over becuase this runs on every click of a point increase button
        btnTeamOneSingle.disabled = true;
        btnTeamOneDouble.disabled = true;
        btnTeamOneTriple.disabled = true;
        btnTeamTwoSingle.disabled = true;
        btnTeamTwoDouble.disabled = true;
        btnTeamTwoTriple.disabled = true;
        let winner = '';
        if (teamOneScore > teamTwoScore) {
            winner = 'Team One';
            teamOneDisplay.classList.add('has-text-success');                       //winning score turns green, loser turns red
            teamTwoDisplay.classList.add('has-text-danger');
        } else {
            winner = 'Team Two';
            teamTwoDisplay.classList.add('has-text-success');
            teamOneDisplay.classList.add('has-text-danger');
        }
        if(document.getElementById('victoryMsg')) {                     //if we have already displayed a winner message we don't want to again
        } else {
            const victoryMsg = document.createElement('h2');            //creates and displays winner message
            victoryMsg.innerText = `${winner} wins!!!`;
            victoryMsg.id = 'victoryMsg';
            scoreDisplay.insertAdjacentElement('afterend',victoryMsg);
        }
    }
}

//resets the game. flag is only passed in when a reset is triggered by changing the select.
function resetGame(flag) {              
    if (isGameOver() || flag === 1) {                           //only want to try to remove the winner message if it exists, which it wont when coming from a select change
        const msg = document.querySelector('#victoryMsg');              
        msg.remove();
    }
    teamOneScore = 0;
    teamTwoScore = 0;
    teamOneDisplay.innerText = teamOneScore;
    teamTwoDisplay.innerText = teamTwoScore;
    teamOneDisplay.classList.remove('has-text-success', 'has-text-danger');
    teamTwoDisplay.classList.remove('has-text-success', 'has-text-danger');
    btnTeamOneSingle.disabled = false;
    btnTeamOneDouble.disabled = false;
    btnTeamOneTriple.disabled = false;
    btnTeamTwoSingle.disabled = false;
    btnTeamTwoDouble.disabled = false;
    btnTeamTwoTriple.disabled = false;
}
