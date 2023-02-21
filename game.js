
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var playEnabled = true;

// Create a new sequence based on level
function nextSequence() {
    ++level; // Increase level by one
    gamePattern = []; // Reset gamePattern
    userClickedPattern = []; //Reset userClicledPattern
    for (let i = 0; i < level; i++) {
        let randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
        gamePattern.push(randomChosenColour);
    }    
    playPattern();
}

// Listen for click on any button, accept input above level 0 and playEnabled = true
// The playEnabled is to prevent user input while the new sequence is being played out
// Could not use arrow function here due to the usage of "this"
$(".btn").on("click", function() {
    if ((level > 0) && (userClickedPattern.length < gamePattern.length) && (playEnabled == true)) {
        userChosenColor = this.id;

        if (userChosenColor == gamePattern[userClickedPattern.length]) {
            userClickedPattern.push(userChosenColor);
            playAnimation(userChosenColor);
            if (userClickedPattern.length == gamePattern.length) {
                setTimeout(() => nextSequence(), 1000);
            }
        } else {
            gameOver();
        }
    }
})

async function playPattern() {
    playEnabled = false;

    $("h1").text("Level " + level); // Change level's title

    // Call playAnimation function for each item in gamePattern
    // Used promise to delay next iteration. 
    // Promise only using resolve parameter and returns empty value ''
    for (let i = 0; i < gamePattern.length; i++) {
        playAnimation(gamePattern[i]);
        await new Promise(resolve => {
            setTimeout(() => { resolve('') }, 700);
        });
    }

    playEnabled = true;
}

// Makes the passed button flash and plays corresponding sound
function playAnimation(buttonId) {
    $("#" + buttonId).fadeOut(100).fadeIn(100);
    let buttonSound = new Audio('sounds/' + buttonId + '.mp3');
    buttonSound.play();
}

// If at level 0 user press a key, nextSequence function is called.
$(document).keydown(() => {
    if (level == 0) {
        $("body").removeClass("game-over");
        setTimeout(() => nextSequence(), 300);
    }
});

// Reset level to 0, plays wrong sound and displays game-over state
function gameOver() {
    level = 0;
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    let buttonSound = new Audio('sounds/wrong.mp3');
    buttonSound.play();
}