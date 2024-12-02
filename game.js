var userClickedPattern = [];
var gamePattern = [];
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
    if (level === 0) {
        nextSequence();
        $("h1").text("Level 0");
    }
    
});

function nextSequence() {
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    userClickedPattern = [];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
};

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
};

function checkAnswer(currentLevel) {
    for (var i = 0; i <= currentLevel; i++) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (gamePattern.length === (i + 1)) {
                setTimeout(nextSequence, 1000);
            }
        } else {
            var audio2 = new Audio("./sounds/wrong.mp3");
            audio2.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}