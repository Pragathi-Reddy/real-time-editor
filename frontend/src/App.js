import { useEffect, useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:3000');
        setWs(websocket);

        websocket.onmessage = (event) => setText(event.data);
        websocket.onclose = () => console.log('WebSocket closed');
        websocket.onerror = (error) => console.error('WebSocket error:', error);

        return () => websocket.close();
    }, []);

    const handleChange = (e) => {
        setText(e.target.value);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(e.target.value);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Real-Time Collaborative Editor</h2>
            <textarea 
                value={text} 
                onChange={handleChange} 
                style={{ width: '80%', height: '80%', fontSize: '16px', padding: '10px', border: '1px solid black' }} 
            />
        </div>
    );
}

export default App;
