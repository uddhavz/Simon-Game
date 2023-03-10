let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let randomChosenColour;
let delayinMs = 800;

let gamePattern = [];

let level = 0;
let userCount = 0;
let keypressedCounter = false;

$(window).keypress(function () {
    if (keypressedCounter == false) {
        $("body").css("background-color", "#011F3F")
        $(".btn").css("pointer-events", "all");
        nextSequence()
        keypressedCounter = true;
    }
});

function playSound(id) {
    let audio = new Audio("sounds/" + id + ".mp3")
    audio.play();
}

function nextSequence() {
    let n = Math.random();
    n = Math.floor(n * 4);
    gamePattern.push(buttonColors[n]);
    for (let index = 0; index <= gamePattern.length; index++) {
        setTimeout(function () {
            if (index == 0) {
                $("h1").fadeOut(100);
                $("h1").text("Level " + (++level))
                $("h1").fadeIn(100).fadeOut(100).fadeIn(100);
            }
            else {

                randomChosenColour = gamePattern[index-1];
                playSound(randomChosenColour);
                $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
            }
        }, delayinMs * index);

    }

    userCount = 0;
    userClickedPattern = [];

    console.log("nextSequence", gamePattern.length, userClickedPattern.length);
}

$(".btn").click(function (event) {
    btnId = event.target.id
    userClickedPattern.push(btnId);
    $("#" + btnId).fadeOut(50).fadeIn(50);
    playSound(btnId);
    console.log("btnClick", gamePattern.length, userClickedPattern.length);
    if (gamePattern[userCount] == userClickedPattern[userCount]) {
        if (userClickedPattern.length < gamePattern.length) {
            userCount++;
            console.log("Usercount: ", userCount);
        }
        else {
            $("body").css("background-color", "darkgreen");
            setTimeout(() => ($("body").css("background-color", "#011F3F")), 300)
            setTimeout(() => nextSequence(), delayinMs)
            console.log("btnClick (else)", gamePattern.length, userClickedPattern.length);
        }
    }
    else {
        console.log("False");
        level = 0;
        userCount = 0;
        gamePattern = [];
        userClickedPattern = [];
        playSound("wrong");
        $("h1").html("Wrong !! <br> Press a Key to Restart Game")
        $(".btn").css("pointer-events", "none");
        keypressedCounter = false;
        $("body").css("background-color", "darkred");
    }
    console.log("Final Click gamePattern = ", gamePattern);
    console.log("Final Click userClickedPattern = ", userClickedPattern);
    console.log(gamePattern.length, userClickedPattern.length);

});


