import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());

let content = "";

wss.on('connection', (ws) => {
    ws.send(content);
    ws.on('message', (message) => {
        content = message.toString();
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
