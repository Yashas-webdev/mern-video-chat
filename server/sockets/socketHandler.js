const socketHandler = (io) => {
    const rooms = new Map()
    const handQueues = new Map()
    const transcripts = new Map()
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

        socket.on('lower-hand',({roomId})=>{
            if(!handQueues.has(roomId)) return

            const queue = handQueues.get(roomId)
            const updatedQueue = queue.filter(u => u.socketId !== socket.id)
            handQueues.set(roomId, updatedQueue)

            io.to(roomId).emit('hand-queue-updated',updatedQueue)
        })

        socket.on('allow-to-speak',({roomId, targetSocketId})=>{
            if(!handQueues.has(roomId)) return 
            const queue = handQueues.get(roomId)
            const updatedQueue = queue.filter(u => u.socketId !== targetSocketId)
            handQueues.set(roomId, updatedQueue)

            io.to(roomId).emit('hand-queue-updated',updatedQueue)
            io.to(targetSocketId).emit('you-can-speak')
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

        socket.on('transcript-update',({roomId,username,text})=>{
            if(!transcripts.has(roomId)){
                transcripts.set(roomId,[])
            }
            transcripts.get(roomId).push({
                username,
                text,
                timestamp: Date.now()
            })

            socket.to(roomId).emit('transcript-update',{username,text})
        })

        socket.on('get-transcript',({roomId})=>{
            const transcript = transcripts.get(roomId) || []
            socket.emit('full-transcript',transcript)
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

            handQueues.forEach((queue,roomId)=>{
                const updatedQueue = queue.filter(u => u.socketId !== socket.id)
                if(updatedQueue.length !== queue.length){
                    handQueues.set(roomId, updatedQueue)
                    io.to(roomId).emit('hand-queue-updated',updatedQueue)
                }
            })

            
        })
    })
}

module.exports = socketHandler