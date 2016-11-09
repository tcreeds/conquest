window.onload = init;

// PIXI
var stage;
var renderer;

// socket.io
var socket;

// Game
var players = [];
var localId;
var localPlayer;
var running = false;
var input;

function init()
{
    renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
    document.body.appendChild(renderer.view);
    
    stage = new PIXI.Container();
    
    input = InputManager(renderer.view);
    
    requestAnimationFrame(render);
    setInterval(update, 16);
    
    initClient();
}

function update()
{
    if (running)
    {
        takeInput();
        for (player in players)
        {
            
        }
    }
}

function render()
{
    
    requestAnimationFrame(render);

    renderer.render(stage);
}

function takeInput()
{
    var state = input.getInputState();
    if (state.leftArrow)
    {
        localPlayer.x -= 3;  
    }
    if (state.rightArrow)
    {
        localPlayer.x += 3;
    }
    if (state.upArrow)
    {
        localPlayer.y -= 3;
    }
    if (state.downArrow)
    {
        localPlayer.y += 3;
    }
    if (state.space)
    {
        fire();
    }
    if (state.leftArrow || state.rightArrow || state.upArrow || state.downArrow)
    {
        var moveData = {
            id: localId,
            x: localPlayer.x,
            y: localPlayer.y,
            rotation: localPlayer.rotation
        };
        socket.emit('move', moveData);
    }
}

function fire()
{
    socket.emit("fire", {
       id: localId 
    });
}

function onPlayerMove(data)
{
    for (var i = 0; i < players.length; i++)
    {
        if (players[i].id == data.id)
        {
            players[i].x = data.x;
            players[i].y = data.y;   
            players[i].rotation = data.rotation;
            break;
        }
    }
}

function onAddPlayer(data)
{
    console.log(data);
    var newPlayer = new PIXI.Sprite.fromImage("media/blank.png");
    stage.addChild(newPlayer);
    newPlayer.id = data.id;
    newPlayer.username = data.username;
    newPlayer.tint = data.color;
    players.push(newPlayer);
    console.log("new player " + newPlayer.id);
}

function onRemovePlayer(data)
{
    console.log(data);
    for (var i = 0; i < players.length; i++)
    {
        if (players[i].id = data.id)
        {
            console.log("removed player " + players[i].id);
            players.splice(i, 0);
            break;
        }
    }
    
}