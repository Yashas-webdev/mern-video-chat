const socketHandler = (io) => {
    const rooms = new Map()
    io.on('connection',(socket)=>{
        console.log(`User connected: ${socket.id}`)
        socket.on('join-room',({roomId, username})=>{
            socket.join(roomId)

            if(!rooms.has(roomId)){
                rooms.set(roomId,[])
            }
            rooms.get(roomId).push({socketId: socket.id, username})

            const usersInRoom = rooms.get(roomId).filter(
                user => user.socketId != socket.id
            )

            socket.emit('users-in-room', usersInRoom)

            socket.to(roomId).emit('user-joined',{
                socketId : socket.id,
                username
            })

            console.log(`${username} joined room: ${roomId}`               
            )
        })
    })
}