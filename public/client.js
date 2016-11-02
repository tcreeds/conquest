function initClient()
{
    socket = io();
    socket.on("connected", connected);
    socket.on("playerJoined", addPlayer);
    socket.on("playerLeft", removePlayer);
}

function connected(data)
{
    console.log("connected to server");
}