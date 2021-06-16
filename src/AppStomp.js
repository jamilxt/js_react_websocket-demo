import React from "react";
import { Client } from "@stomp/stompjs";

// If WebSocket at server is configured without SockJs
const SOCKET_URL = 'ws://localhost:8080/ws-message';

class App_Stomp extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Your server message here.',
    };
  };

  componentDidMount() {
    let currentComponent = this;
    let onConnected = () => {
      console.log("Connected!!");
      client.subscribe('/topic/message', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          if (jsonBody.message) {
            currentComponent.setState({ message: jsonBody.message })
          }
        }
      });
    }

    let onDisconnected = () => {
      console.log("Disconnected!");
    }

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected
    });

    client.activate();
  }

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
      </div>
    );
  }

}

export default App_Stomp;