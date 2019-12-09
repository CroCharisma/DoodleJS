(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas");
canvas.addEventListener('click', clickReporter, false);
var ctx = canvas.getContext("2d"),
    width = 300,
    height = 500,
    player = {
        x : width / 2,
        y : height - 50,
        width : 34,
        height : 29,
        vX : 0,
        vY : 0,
        virty :0,
        speed :3 /*UwU*/ ,
        grounded : false,
        jumping : false,
        touched : false

    },

    friction = 0.8,
    gravity = 0.2,

    started = false,

    keys = [];
var score = 0;

var status = 0; //change later

canvas.width = width;
canvas.height = height;

var boxes = [];
var powers = [];
var shoot = [];
var thingsthatcankillyou = [];
var wowee = false;
var sound = new Audio('sound but happy.mp3');
var wow = new Audio('wow.mp3');
var death = new Audio('death.mp3');
var choices = [

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    //add the power puff girls

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    [
        [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]


    //once the dupe glitch is fixed add bad bads at some point

];
var add = 0;

function read(){

var map = [//make this a set of random platform locations and then have a function randomly select which to use

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

]

for( var c = 0; c < map.length; c++ ){//place this into its own function later and switch to list of random segments
    for( var r = 0; r < map[c].length; r++ ){
        if( map[c][r] == 1 ){
            boxes.push({
                x: r * 10 - 25,
                y: c * 20,
                width :50,
                height: 10,
                touched: false

            })
        }
    }
}

for( var a = 0; a < map.length; a++ ){//place this into its own function later and switch to list of random segments
    for( var b = 0; b < map[a].length; b++ ){
        if( map[a][b] == 2 ){
            powers.push({
                x : b * 10 - powers.width/2,
                y : a * 20,
                width :60,
                height:83,
                touched : false
            });
        }
    }
}

for( var e = 0; e < map.length; e++ ){
    for( var n = 0; n < map[e].length; n++ ){
        if( map[e][n] == 3 ){
            thingsthatcankillyou.push({
                x : n * 10,
                y : e * 20,
                width : 10,
                height : 10
            });
        }
    }
}

for( var c = 0; c < map.length; c++ ){
    for( var r = 0; r < map[c].length; r++ ){
        if( map[c][r] == 4 ){
            shoot.push({
                x : r * 10,
                y : c * 10,
                width : 15,
                height : 15,
                vx : 1.25
            });
        }
    }
}
// dimensions
//boxes.push({
//    x: 0,
//    y: 0,
//    width: 10,
//    height: height
//});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
//boxes.push({
//    x: width - 10,
//    y: 0,
//    width: 50,
//    height: height
//});

}

read();
//sprites
var sprite = new Image();
sprite.src = 'player.png';
var portalL = new Image();
portalL.src = 'mastapiece.png';
var portalR = new Image();
portalR.src = 'flipped.png';
var watcher = new Image();
watcher.src = 'immortal watcher(woke).png';
var speaker = new Image();
speakerNum = 1;

var frame = 0;
var diaNum = 0;
var dialogue = ['i crave benito bits', '0 not on my watch baka' , '1 i must aquire the food' ];

function update(){

    function win(){
        ctx.fillStyle = "#ffc0cb";
        ctx.font = "50px Comic Sans MS";
        ctx.fillText("WIN",85, 240);
        ctx.fillStyle = '#8800FF';
        ctx.font = '12px Comic Sans MS';
        ctx.fillText("score: " + (score) + ' points', score.toString.length/2 + 100 , 300)
        console.log(score.toString.length/2);
        ctx.drawImage(portalL, 0, 0, 10, height);
        ctx.drawImage(portalR, width-10, 0, 10, height);
    }

    function title(){
        ctx.clearRect( 0 , 0 , width, height );
        ctx.beginPath();
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(0 ,0 , width, height );
        ctx.clearRect(20, 20, width - 40, height - 150);
        if( speakerNum == 1 ){
            speaker.src = 'playerspeaking.jpg';
        }
        else if( speakerNum == 0 ){
            speaker.src = 'immortal watcher(woke).png';
        }

        ctx.drawImage(speaker , width / 2 - (175/4) , height / 2 - (175/2) , 204/2, 175/2);
        ctx.fillStyle = '#FFFFFF';
        ctx.rect( 20, height * 3 / 4 + 10 , width - 40, 95 );
        ctx.fill();

        ctx.font = '12px Comic Sans MS';

        ctx.fillStyle = '#000000';
        ctx.fillText( dialogue[diaNum], 22, height * 3 / 4 + 25 );
    }
    function game(){
        frame++;
        ctx.clearRect(0,0,width,height);
        //clears board

        if( keys[32]){
            started = true;
            sound.play();
        }

        if( keys[80] ){
            for( var i = 0; i < thingsthatcankillyou.length; i++ ){
                console.log(i , thingsthatcankillyou[i].x , thingsthatcankillyou[i].y);
            }
            console.log("opuch");
        }

        if(keys[70]){
            started = !started;
        }

        if( keys[71] ){
            window.location.reload();
        }

        if( started && !player.jumping && player.grounded ){//has dot constantly bounce
            player.vY = -player.speed*2;
            player.jumping = true;
            player.grounded = false;
            //started = false; //remove later
        }
        if( keys[37] || keys[65] ){
            if( player.vX > -(player.speed) ){
                player.vX--;
                sprite.src = 'player.png';
                //console.log('nega II');
            }
            //console.log('nega');
        }
        if( keys[39] || keys[68] ){
            if( player.vX < player.speed ){
                player.vX++;
                sprite.src = 'playeralt.png';
                //console.log( 'nega III ' + player.vX );
            }
        }
        if( keys[38] ){

            //draw attack sprite for amount of time -> object?
            //kill bullet within range

            ctx.beginPath();

            ctx.fillStyle = "#FFFFFF";

            ctx.rect( player.x - player.width/2 , player.y  - 10 , player.width * 2 , 2 );

            ctx.fill();

            console.log('slice');
        }

        player.x += player.vX;
        player.y += player.vY;

        if( player.y > 1000 ){
            status = 3;
            console.log( 'dead');
        }

        if( started ){
            for( var i = 0; i < shoot.length; i++ ){
                shoot[i].x += shoot[i].vx;
            }
            var ihateliving = parseInt(Math.random() * choices.length);
            var last = ihateliving;
            var touched = [];
            loophappy:
            for( var i = 0; i < boxes.length; i++ ){
                if( boxes[i].touched ){
                    touched.push(boxes[i]);
//                    console.log(boxes[i])
                }
            }
        for( var p = 0; p < powers.length; p++ ){
            powers[p].y++;
        }
        for( var i = 0; i < thingsthatcankillyou.length; i++ ){
            thingsthatcankillyou[i].y += 1.5;
            if( thingsthatcankillyou[i].y > 550 ){
                thingsthatcankillyou.splice(i,1);
            }
        }

        loopsad:
        for( var i = 0; i < boxes.length; i++ ){
            boxes[i].y+= 1;
            if( boxes[i].y > 550 ){
                last = ihateliving;
                while( last == ihateliving ){
                    ihateliving = parseInt(Math.random() * choices.length);
                }
//                console.log( ihateliving, last );
                for( var r = 0; r < choices[ihateliving].length; r++ ){
                    for( var c = 0; c < choices[ihateliving][r].length; c++ ){
                        if(choices[ihateliving][r][c] == 1){
//                            console.log('kill' , boxes[i]);
                            boxes.splice(i,1);
                            boxes.unshift({
                                x:c * 10 - 25,
                                y: r * 20,
                                width : 50,
                                height : 10,
                                vY : 0,
                                touched: false
                            });


//                            console.log('remaining');
//                            for( var j = 0; j < boxes.length; j++ ){
//                                console.log( boxes[j] );
//                            }
                        }

                        if( choices[ihateliving][r][c] == 2 ){
                            powers.unshift({
                                x : c * 10 - 10,
                                y : r * 20,
                                width :40,
                                height:40,
                                touched : false
                            })
                        }
                    }
                }
            }
        }

        for( var i = 0; i < shoot.length; i++ ){
            if(frame % 100 == 0){
                watcher.src = 'immortal watcher(sleep).png';
                setTimeout(function(){
                    watcher.src = 'immortal watcher(woke).png';
                },250);
//               console.log( "shoot" );
                thingsthatcankillyou.push({
                    x : shoot[i].x,
                    y : shoot[i].y,
                    width : shoot[i].width,
                    height : shoot[i].height
                })
            }
        }
    }

    player.vX *= friction;
    player.vY += gravity;

    if (player.x >= width-player.width) {
        player.x = 0;
    }
    else if (player.x <= 0) {
        player.x = width-player.width;
    }

    // draw our player
    ctx.drawImage(sprite, player.x, player.y, player.width, player.height );

    //draw them portals
    ctx.drawImage(portalL, 0, 0, 10, height);
    ctx.drawImage(portalR, width-10, 0, 10, height);
    //draw boxes
    ctx.fillStyle = "#626262";

    if(wowee){
        ctx.fillStyle = '#ffc0cb';
        ctx.font = "50px Comic Sans MS";
        ctx.fillText("WOW",100, 250);
        setTimeout(function(){
            wowee = false;
        }, 100);
    }

    ctx.beginPath();


    player.grounded = false;


    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            boxes[i].touched = true;
            //player.jumping = false;
        }
        else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            boxes[i].touched = true;
        }
        else if (dir === "t") {
            player.velY *= -1;
            boxes[i].touched = true;
        }

//        console.log(dir);
//        console.log(player.vY);

//        if( boxes[i].touched){
//            for( var j = 0; j < boxes.length; j++ ){
//                boxes[i].vy = -1;
//            }
//        }
        //ahhhhhhhhhhhhhhhhhhHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH

    }

    ctx.fill();

    ctx.beginPath();

    ctx.fillStyle = '#00ff80';


    for( var i = 0; i < thingsthatcankillyou.length; i++ ){
        ctx.rect( thingsthatcankillyou[i].x, thingsthatcankillyou[i].y, thingsthatcankillyou[i].width, thingsthatcankillyou[i].height );

        var dir = colCheck(player, thingsthatcankillyou[i]);

        if( dir === "l" || dir === "r" || dir === "t" ){
            status = 3;
        }

        if( dir === "b" ){
            player.grounded = true;
            player.jumping = false;
            thingsthatcankillyou.splice(i,1);
        }

    }

    ctx.fill();

    ctx.fillStyle ='#000000';

    for (var i = 0; i < powers.length; i++) {
        ctx.rect(powers[i].x, powers[i].y, powers[i].width, powers[i].height);
        var dir = colCheck(player, powers[i]);

        if (dir === "l" || dir === "r" || dir === "t" || dir === "b") {
            score += 1000;
            wowee = true;
            wow.play();
            powers.splice( i );
        }

//        console.log(dir);
//        console.log(player.vY);

//        if( boxes[i].touched){
//            for( var j = 0; j < boxes.length; j++ ){
//                boxes[i].vy = -1;
//            }
//        }

    }

    ctx.fillStyle = '#CC99FF';
    ctx.beginPath();

    for( var i = 0; i < shoot.length; i++ ){
        ctx.drawImage( watcher, shoot[i].x, shoot[i].y, shoot[i].width, shoot[i].height);

        if( shoot[i].x == 10 || shoot[i].x == width-10-shoot[i].width ){
            shoot[i].vx = -shoot[i].vx;
        }



//        thingsthatcankillyou.push({
//            x : shoot[i].x,
//            y : shoot[i].y,
//            width : shoot[i].width,
//            height : shoot[i].height
//        });

//        if(frame % 100 == 0){
////            console.log( "shoot" );
//            thingsthatcankillyou.push({
//                x : shoot[i].x,
//                y : shoot[i].y,
//                width : shoot[i].width,
//                height : shoot[i].height
//            });
//        }

    }

    ctx.fill();

    if( player.grounded ){ player.vY = 0 }

    ctx.beginPath();
    var power = new Image();
    power.src = 'power player alt.png';

    for( var i = 0; i < powers.length; i++ ){
        ctx.drawImage(power, powers[i].x, powers[i].y, powers[i].width, powers[i].height );
    }

    if( status == 3 ){
        ctx.clearRect(0,0,width, height);
        //add "DED" message

        sound.pause();
        death.play();
        ctx.fillStyle = '#ffc0cb';
        ctx.font = "50px Comic Sans MS";
        ctx.fillText("DED",100, 250);
        ctx.fillStyle = '#8800FF';
        ctx.font = '12px Comic Sans MS';
        ctx.fillText("score: fucking gone lol",  90 , 300)
        ctx.drawImage(portalL, 0, 0, 10, height);
        ctx.drawImage(portalR, width-10, 0, 10, height);
        setTimeout(function() {

            console.log('im sad');
            //ouch
            status = 1;
            ctx = canvas.getContext("2d"),
            width = 300,
            height = 500,
            player = {
                x : width / 2,
                y : height - 50,
                width : 34,
                height : 29,
                vX : 0,
                vY : 0,
                virty :0,
                speed :3 /*UwU*/ ,
                grounded : false,
                jumping : false,
                touched : false

            },

            friction = 0.8,
            gravity = 0.2,
            started = false,
            keys = [];
            score = 0;
            boxes = [];
            powers = [];
            shoot = [];
            thingsthatcankillyou = [];

            read();
            death.pause();

        }, '1000');
        // run through the loop again
    }
    else if( player.y < 0 ){
        ctx.clearRect(0,0,width, height);
        //add "WIN" message

        console.log( score );


        status = 4;
    }
    }

    if( status == 1 ){
        game();
    }
    if( status == 0 ){
        title();
    }
    if( status == 4 ){
        win();
    }
    requestAnimationFrame(update);
}



window.addEventListener("load", function(){
    update();
});

function clickReporter(e){
    diaNum++;

    if( diaNum == dialogue.length ){
            status++;
    }

    speakerNum = dialogue[diaNum].substring(0 , 1);
    dialogue[diaNum] = dialogue[diaNum].substring( 2 );
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
});

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
