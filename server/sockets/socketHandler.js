const socketHandler = (io) => {
    const rooms = new Map()
    const handQueues = new Map()
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

        socket.on('raise-hand',({roomId,username})=>{
            if(!handQueues.has(roomId)){
                handQueues.set(roomId,[])
            }

            const queue = handQueues.get(roomId)
            const alreadyRaised = queue.find(u => u.socket === socket.id)
            if(alreadyRaised) return
              queue.push({
                socketId: socket.id,
                username,
                timestamp: Date.now()
              })

              io.to(roomId).emit('hand-queue-updated',queue)
        })

        

        socket.on('offer',({offer, to})=>{
            socket.to(to).emit('offer',{
                offer,
                from: socket.id
            })
        })

        socket.on('answer',({answer,to})=>{
            socket.to(to).emit('answer',{
                answer,
                from: socket.id
            })
        })

        socket.on('ice-candidate', ({candidate, to})=>{
            socket.to(to).emit('ice-candidate',{
                candidate,
                from: socket.id
            })
        })

        socket.on('disconnect',()=>{
            console.log(`User disconnected: ${socket.id}`)
            rooms.forEach((users, roomId)=>{
                const index = users.findIndex(u => u.socketId === socket.id)
                if(index !== -1){
                    const [removedUser] = users.splice(index, 1)
                    if(users.length === 0){
                        rooms.delete(roomId)
                    }
                    io.to(roomId).emit('user-left',{
                        socketId: socket.id,
                        username: removedUser.username
                    })
                }
            })
        })
    })
}

module.exports = socketHandler