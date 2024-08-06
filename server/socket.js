import { Server as SocketIOServer } from "socket.io";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    

    const userSocketMap = new Map();
    
    const disconnect = (socket) => {
        console.log(`Client disconnected with socketId: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                console.log(`User: ${userId} disconnected`);
                break;
            }
        }
    };

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User: ${userId} connected with socketId: ${socket.id}`);
        } else {
            console.log('User connected without userId');
        }

        socket.on('disconnect', () => disconnect(socket));
        // socket.on('send-message', ({ senderId, receiverId, text }) => {
        //     const receiverSocketId = userSocketMap.get(receiverId);
        //     io.to(receiverSocketId).emit('receive-message', {
        //         senderId,
        //         text,
        //     });
        // });
    });
};

export default setupSocket;