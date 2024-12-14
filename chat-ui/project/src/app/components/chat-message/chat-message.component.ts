import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message" [class.justify-end]="isOwnMessage">
      <ng-container *ngIf="message.type === 'user'">
        <div class="avatar" *ngIf="!isOwnMessage">
          <div class="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img [src]="message.avatar" [alt]="message.sender" />
          </div>
        </div>
        <div class="message-content"
             [class.own-message]="isOwnMessage"
             [class.other-message]="!isOwnMessage">
          <div class="message-metadata">
            <span class="message-sender" *ngIf="!isOwnMessage">
              {{ message.sender }}
            </span>
            <span class="message-time">
              {{ message.timestamp | date:'shortTime' }}
            </span>
          </div>
          <p class="message-text">{{ message.content }}</p>
        </div>
      </ng-container>
      
      <div *ngIf="message.type === 'system'" class="system-message">
        {{ message.content }}
      </div>
    </div>
  `
})
export class ChatMessageComponent {
  @Input() message!: Message;
  @Input() currentUsername: string = '';

  get isOwnMessage(): boolean {
    return this.message.sender === this.currentUsername;
  }
}