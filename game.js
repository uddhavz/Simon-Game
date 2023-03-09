let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let randomChosenColour;
var gamePattern = [];

let level = 0;

$(window).keypress(function() {
    console.log("entered method");
    $(".btn").css("pointer-events","all");
    nextSequence()
    $("h1").text("Level "+(level+1))
});

function nextSequence() {
    let n = Math.random();
    n = Math.floor(n * 4);
    randomChosenColour= buttonColors[n]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    let audio = new Audio("sounds/"+randomChosenColour+".mp3")
    audio.play();
    console.log("Finished nextSequence");
}




$(".btn").click(function(event){
    console.log(event.target.id);
    btnId = event.target.id
    userClickedPattern.push(btnId);
    $("#"+btnId).fadeOut(50).fadeIn(50);
    let audio = new Audio("sounds/"+btnId+".mp3")
    audio.play();
    console.log("gamePattern = ", gamePattern);
    console.log("userClickedPattern = ", userClickedPattern);
    if(gamePattern[level]===userClickedPattern[level]){
        console.log("True");
        if(level === gamePattern.length-1){
            nextSequence();
            level=0;
        }
        else
        level++;

    }
    else{
        console.log("False");
        level = 0;
        
    }
        
});


