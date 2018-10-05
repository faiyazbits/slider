var sliderDiv = document.getElementById("sliderDiv");
var maxValue = document.getElementById("max").value;
var minValue = document.getElementById("min").value;
var valueDiv = document.getElementsByClassName("rangeDiv")[0];
function showAndSetSlider() {
    maxValue = document.getElementById("max").value;
    minValue = document.getElementById("min").value;
    valueDiv = document.getElementsByClassName("rangeDiv")[0];
    document.getElementsByClassName(" minDiv")[0].innerHTML = minValue;
    document.getElementsByClassName(" maxDiv")[0].innerHTML = maxValue;
    sliderDiv.style.display = "block";
}

function createSlider(sliderId) {

    var slider$ = $("#" + sliderId);
    var sliderThumb$ = slider$.find(".sliderThumb");
    var sliderTrackContainer$ = slider$.find(".sliderTrackContainer");
    var sliderTrack$ = slider$.find(".sliderTrack");
    var sliderThumbDOM = sliderThumb$.get(0);


    var trackWidth = sliderTrackContainer$.width();



dragHandler(sliderThumbDOM, {
    start: function (eventArgs) {

    },
    move: function (eventArgs) {
        var currentPos = $(sliderThumbDOM).position();
        var dx = eventArgs.dx;
        var currentX = dx + currentPos.left;

        var normvalue  = (mathUtil.norm(currentX,0,trackWidth));
        var lerpValue   = mathUtil.lerp(normvalue,minValue ,maxValue);


        console.log(lerpValue);

        currentX = Math.max(currentX, 0);
        currentX = Math.min(currentX, trackWidth);



        $(sliderThumbDOM).css({
            left: currentX + "px"
        });
        $(sliderTrack$).css({
            width: currentX + "px"
        });



    },
    end: function (eventArgs) {

    }
});
}

createSlider("sliderDiv");
var btn   =  document.getElementsByClassName("btn")[0];
dragHandler(btn,{
    start:function(){

    }
    ,
    move:function(eventArgs){
        var pos = $(btn).position();
        var dx = eventArgs.dx;
        var dy = eventArgs.dy;
        var currentleft =dx+pos.left;
        var currenttop = dy+pos.top;
        $(btn).css({left:currentleft+"px",top:currenttop+"px"});
    },
    end:function(){

    }
});

var mathUtil={};
mathUtil.norm = function norm(value, min, max) {
    return (value - min) / (max - min);
};

mathUtil.lerp= function lerp(norm, min, max) {
    return (max - min) * norm + min;
};

mathUtil.map = function map(value, sourceMin, sourceMax, destMin, destMax) {
    return mathUtil.lerp(mathUtil.norm(value, sourceMin, sourceMax), destMin, destMax);
};