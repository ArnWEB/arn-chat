import { Injectable, input, signal } from "@angular/core";
import SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import { Message } from "../models/message.model";


@Injectable({
  providedIn: "root"
})
export class WebsocketSerice {
  title = 'chat-client';
  // inputMessage: string = ""
  messages = signal<Message[]>([])
  socket: any = null
  stompClient: any
  BASE_ADDRESS: string = "http://localhost:8080"
  // username: any;

  connect(username: string) {
    this.socket = new SockJS(`${this.BASE_ADDRESS}/ws`);
    // this.stompClient=Stomp
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, () => {
      console.log("Connection started")
      this.onConnected(username)

    }, this.onError)
  }
  onConnected(username: string) {
    // Subscribe to the Public Topic
    this.stompClient.subscribe('/topic/public', (message: any) => {
      console.log(message)
      this.onMessageReceived(message)
    });
    // Tell your username to the server
    this.stompClient.send("/app/chat.addUser",
      {},
      JSON.stringify({ sender: username, messageType: 'JOIN' })
    )
    // connectingElement.classList.add('hidden');
  }


  onError(error: any) {

    console.log(error)

    // connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    // connectingElement.style.color = 'red';
  }


  sendMessage(message: Message) {
    // var messageContent = this.inputMessage.trim();
    if (message.content && this.stompClient) {
      // var chatMessage = {
      //   sender: message.sender,
      //   content: message.content,
      //   messageType: 'CHAT'
      // };
      // this.messages.update((prevMessages) => {
      //   console.clear()
      //   console.log([...prevMessages, message])
      //   return [...prevMessages, message]
      // })
      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));

      // this.inputMessage = '';
    }
    // event.preventDefault();
  }


  onMessageReceived(payload: any) {
    var message = JSON.parse(payload.body);
    // console.log("test")
    console.log(message)

    // var messageElement = document.createElement('li');

    if (message.messageType === 'JOIN') {
      // messageElement.classList.add('event-message');
      message.content = message.sender + ' joined!';
      console.log(message.content)
    } else if (message.type === 'LEAVE') {
      // messageElement.classList.add('event-message');
      message.content = message.sender + ' left!';
    } else {
      // const currentMessage: Message = {
      //   id: Date.now().toString(),
      //   content: message.content,
      //   sender: message.sender,
      //   timestamp: new Date(),
      //   type: 'user',
      //   avatar: ""
      // };

      this.messages.update((prevMessages) => [...prevMessages, message])
      console.log("message should be updated")

    }
  }


  // getAvatarColor(messageSender: any) {
  //   // var hash = 0;
  //   // for (var i = 0; i < messageSender.length; i++) {
  //   //     hash = 31 * hash + messageSender.charCodeAt(i);
  //   // }
  //   // var index = Math.abs(hash % colors.length);
  //   // return colors[index];
  // }
  // // sendMessage() {
  // //   this.messages.push(this.inputMessage)
  // //   this.inputMessage = ""
  // // }

}