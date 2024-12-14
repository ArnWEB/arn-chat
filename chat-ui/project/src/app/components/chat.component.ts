import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../models/message.model';
import { WebsocketSerice } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-6 max-w-4xl">
      <div class="bg-base-100 rounded-box shadow-lg">
        <!-- Chat Header -->
        <div class="p-4 border-b border-base-300">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Group Chat</h2>
            <div class="flex items-center gap-2">
              <div class="avatar">
                <div class="w-8 h-8 rounded-full">
                  <img [src]="userAvatar" alt="Your avatar" />
                </div>
              </div>
              <span class="font-medium">{{ username }}</span>
            </div>
          </div>
        </div>

        <!-- Messages Container -->
        <div class="message-container p-4" #scrollContainer>
          <div *ngFor="let message of messages()" 
               class="message"
               [class.justify-end]="message.sender === username">
            <ng-container *ngIf="message.type === 'user'">
              <div class="avatar" *ngIf="message.sender !== username">
                <div class="w-8 h-8 rounded-full">
                  <img [src]="message.avatar" [alt]="message.sender" />
                </div>
              </div>
              <div class="message-content"
                   [class.bg-primary]="message.sender === username"
                   [class.text-primary-content]="message.sender === username">
                <div class="flex justify-between items-baseline gap-4">
                  <span class="font-medium text-sm" *ngIf="message.sender !== username">
                    {{ message.sender }}
                  </span>
                  <span class="text-xs opacity-70">
                    {{ message.timestamp | date:'shortTime' }}
                  </span>
                </div>
                <p>{{ message.content }}</p>
              </div>
            </ng-container>
            
            <div *ngIf="message.type === 'system'" class="system-message w-full">
              {{ message.content }}
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t border-base-300">
          <form (ngSubmit)="sendMessage()" class="flex gap-2">
            <input
              type="text"
              [(ngModel)]="newMessage"
              name="message"
              placeholder="Type your message..."
              class="input input-bordered flex-1"
              (keyup.enter)="sendMessage()"
            />
            <button type="submit" class="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent {
  @Input() username = '';
  messages=this.ws.messages
  newMessage = '';
  userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;

  constructor(private ws:WebsocketSerice){}

  sendMessage() {
    if (this.newMessage.trim()) {
      // This is just UI placeholder, actual logic will be implemented by you
      const message: Message = {
        id: Date.now().toString(),
        content: this.newMessage,
        sender: this.username,
        timestamp: new Date(),
        type: 'user',
        avatar: this.userAvatar,
        messageType: "CHAT"
      };
      this.ws.sendMessage(message)
      // this.messages.push(message);
      this.newMessage = '';
    }
  }
}