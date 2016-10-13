console.log("Tic Tac Toe");

var myArray = [];
var ROW_COUNT = 3;
var COLUMN_COUNT = 3;

//Defaults
function defaults() {
    $(document.body).prepend( $("<div>").attr("id", "main-box").html('<h1>Tic Tac Toe v1</h1>') );
    $("#main-box").append( $("<div>").attr("id", "buttons-box") );
    $("#main-box").append( $("<div>").attr("id", "info-box").addClass("info-class") );
    $("#info-box").append( $("<div>").attr("id", "yellowWins-box").html("<h3>Yellow Wins: 0</h3>") );
    $("#info-box").append( $("<div>").attr("id", "draw-box").html("<h3>Draw: 0</h3>") );
    $("#info-box").append( $("<div>").attr("id", "blueWins-box").html("<h3>Blue Wins: 0</h3>") );
    $("#info-box").append( $("<div>").attr("id", "turn-box").html("<h3>Turn: Yellow</h3>") );
    $("#turn-box").html("<h3>Turn: Yellow</h3>").css("background-color", "yellow");
    $("#info-box").append( $("<div>").attr("id", "race-box").html("<h3>Race: </h3>") );
    //$("#info-box").append( $("<div>").attr("id", "race-box2"));
    // $("#info-box").append( $("<div>").attr("id", "race-box").html("<h3>Race: </h3>") );
    var myOptions = {val1 : '1', val2 : '2', val3: '3', val4: '4', val5: '5'};
    var s = $('<select>');
    $.each(myOptions, function(val, text) {
        s.append( $('<option>').val(val).text(text) );
        $('<option>', {value: val, text: myOptions[text]}).append(s);
    });
    $('#race-box').append(s);
    $("#info-box").append( $("<button>").attr("id", "playAgain-box").html("<h3>Play Again</html>") );
}

defaults();

k = 0;
for (i = 0; i < ROW_COUNT; i++) {
    $("#buttons-box").append( $("<div>").attr("id", "row-box" + i) );
    for (j = 0; j < COLUMN_COUNT; j++) {
        //debugger
        $("#row-box" + i).append( $("<button>") 
                    .attr("id", "button" + (k) )
                    .addClass("buttons-class" ) );
        myArray.push("");
        k +=1;
    }
}

var xWins = 0;
var yWins = 0;
var xyDraw = 0;
var flag = 0;
var draw = 0;
var race = 1;

$( "select" ).change(function() {
    race = parseInt($( "select option:selected" ).text());
});

function raceCheck() {
    if (xWins == race) {console.log("Champion Yellow");return true;} else if (yWins == race) {console.log("Champion Blue");return true;} 
        else {return false;}
}

$("#playAgain-box").click("click", function() {
    ans = confirm("Play again?")
    if (ans==true) {
        xWins = 0;
        yWins = 0;
        xyDraw = 0;
        draw = 0;
        reset();
        race = 1;
        //defaults();
        location.reload();
    }
    
});

$("#buttons-box").mousemove(function(){
    check();       
    if (raceCheck()) { 
        var winner = xWins > yWins ? "Yellow" : "Blue";
        if (winner=="Yellow") { $("body").css("background-color", "yellow"); } else { $("body").css("background-color", "blue"); }
        alert("Congratulations " + winner + "! You're the champion!"); 
        location.reload(); } ;
    if (draw === 9)
    {
        xyDraw++;       
        $("#draw-box").html('<h3>Draw: ' + xyDraw + '</h3>'); 
        reset();
    }
    
});

$(".buttons-class").click(function(event) {
        var bt = event.target;
        var index = $(".buttons-class").index(bt);
        
        if (flag === 0) {
            $(bt).css("background-color", 'yellow');
            myArray[index] = "X"
            flag = 1;
            $("#turn-box").html("<h3>Turn: Blue</h3>").css("background-color", "blue");
        }
        else {
            $(bt).css("background-color", 'blue');
            myArray[index] = "O";
            flag = 0;
            $("#turn-box").html("<h3>Turn: Yellow</h3>").css("background-color", "yellow");
        }

        $(bt).prop("disabled", true);
        draw++;
});

//setInterval(function(){blink()}, 2000);
function blink() {
    $("#main-box").fadeTo(200, 0.1).fadeTo(200, 1.0);
}

function reset() {
    for (i = 0; i < (ROW_COUNT * COLUMN_COUNT); i++) {
        myArray[i] = "";
    }
    flag = 0;
    draw = 0;
    $(".buttons-class").prop("disabled", false);
    $(".buttons-class").css("background-color", "red");
    $("#turn-box").html("<h3>Turn: Yellow</h3>").css("background-color", "yellow");
}

var scoreX = 0;
var scoreY = 0;

function changeDisplay(arrayValue) {
    if (arrayValue==="X"){
        xWins++;
        scoreX = xWins;
        console.log("Yellow");
        $("#yellowWins-box").html("<h3>Yellow Wins: " + scoreX + "<h3>");
        //setInterval(function(){blink()}, 2000);
    }
    else {
        yWins++;
        scoreY = yWins;
        console.log("Blue");
        $("#blueWins-box").html("<h3>Blue Wins: " + scoreY + "<h3>");
    }                     

    reset();             
}

function check(){
    // For Rows
    if (myArray[0] === myArray[1] && myArray[1] === myArray[2] && myArray[0]!="") { changeDisplay(myArray[0]); }  
    if (myArray[3] === myArray[4] && myArray[4] === myArray[5] && myArray[3]!="") { changeDisplay(myArray[3]); }
    if ( myArray[6] === myArray[7] && myArray[7] === myArray[8] && myArray[6]!="") { changeDisplay(myArray[6]);}

    //For Coloums
    if (myArray[0] == myArray[3] && myArray[3] == myArray[6] && myArray[0] != "") { changeDisplay(myArray[0]);}
    if (myArray[1] == myArray[4] && myArray[4] == myArray[7] && myArray[1] != "") { changeDisplay(myArray[1]);}
    if (myArray[2] == myArray[5] && myArray[5] == myArray[8] && myArray[2] != "") { changeDisplay(myArray[2]);}
        
    //For Diagnols
    if (myArray[0] == myArray[4] && myArray[4] == myArray[8] && myArray[0] != "") { changeDisplay(myArray[0]);}
    if (myArray[2] == myArray[4] && myArray[4] == myArray[6] && myArray[2] != "") { changeDisplay(myArray[2]);}
}




