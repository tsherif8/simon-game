var buttonColours = ["red", "blue", "green", "yellow"];

var randomChosenColour = "";

var gamePattern = [];

var userClickedPattern = [];

var start = false;

var level = 0;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
    console.log(gamePattern);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    } else {
        $("#level-title").html("Game Over, Press 'A' to Restart");
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        startOver();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    }

    if (userClickedPattern.length === gamePattern.length && start === true) {
        console.log(userClickedPattern);
        setTimeout(function() {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}

$(document).on("keypress", function(event) {
    if (event.key === "a" && start === false) {
        nextSequence();
        start = true;
        $("#level-title").html("Level " + level);
    }
});

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
});