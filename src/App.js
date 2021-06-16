import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

// If WebSocket at server is configured with SockJs
const SOCKET_URL = 'http://localhost:8080/ws-message';

function App() {
  const [message, setMessage] = useState('Your server message here.');

  let onConnected = () => {
    console.log("Connected!");
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnected={onConnected}
        onDisconnected={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
}

export default App;


