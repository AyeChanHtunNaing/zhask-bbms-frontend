import { ChatModel } from '../models/chat.model'
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  socket: any;
  stompClient: any;

  chats: ChatModel[] = [];

  connect() {
    this.socket = new SockJS('http://localhost:8080/chatty');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect(
      {},
      () => this.onConnectCallback(),
      () => this.onDisconnectCallback()
    );
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/send', {}, JSON.stringify(message));
  }

  private onConnectCallback() {
    this.stompClient.subscribe('/topic/chat', (frame) => {
      if (frame.body) {
        let chat = JSON.parse(frame.body);
        this.chats.push(new ChatModel(chat.sender, chat.message));
      }
    });
  }

  private onDisconnectCallback() {
    console.log('Websocket connection failed');
  }
}
