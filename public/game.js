window.onload = init;

// PIXI
var stage;
var renderer;

// socket.io
var socket;

// Game
var players = [];
var localPlayer;
var running = false;

function init()
{
    renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
    document.body.appendChild(renderer.view);
    
    stage = new PIXI.Container();
    
    requestAnimationFrame(render);
    setInterval(update, 16);
    
    initClient();
}

function update()
{
    if (running)
    {
                
    }
}

function render()
{
    
    
    renderer.render(stage);
}

function addPlayer(data)
{
    console.log(data);
}

function removePlayer(data)
{
    console.log(data);
}