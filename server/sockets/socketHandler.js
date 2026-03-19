const socketHandler = (io) => {
    const rooms = new Map()
    io.on('connection',(socket)=>{
        console.log(`User connected: ${socket.id}`)
        socket.on('join-room',({roomId, username})=>{
            socket.join(roomId)
        })
    })
}