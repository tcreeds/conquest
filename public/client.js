function initClient()
{
    socket = io();
    socket.on("connected", connected);
    socket.on("playerJoined", onAddPlayer);
    socket.on("playerLeft", onRemovePlayer);
    socket.on("move", onPlayerMove);
}

function connected(data)
{
    localId = data.id;
    onAddPlayer(data);
    for (var i = 0; i < players.length; i++)
    {
        if (players[i].id = data.id)
        {
            localPlayer = players[i];
            break;
        }
    }
    running = true;
    console.log("connected to server");
}