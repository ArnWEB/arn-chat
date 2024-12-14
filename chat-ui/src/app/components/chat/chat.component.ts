import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    ChatMessageComponent,
    ChatInputComponent
  ],
  template: `
    <div class="chat-container">
      <div class="container mx-auto px-4 max-w-4xl h-full">
        <div class="chat-box">
          <app-chat-header
            [currentUser]="currentUser"
            [onlineUsers]="onlineUsers.length">
          </app-chat-header>

          <div class="message-container" #scrollContainer>
            <app-chat-message
              *ngFor="let message of messages"
              [message]="message"
              [currentUsername]="currentUser.name">
            </app-chat-message>
          </div>

          <app-chat-input
            (sendMessage)="onSendMessage($event)">
          </app-chat-input>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input() username = '';
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  messages: Message[] = [];
  currentUser!: User;
  onlineUsers: User[] = [];
  private shouldScroll = true;

  // Demo users
  private demoUsers = [
    { name: 'Alice Smith', avatar: '' },
    { name: 'Bob Johnson', avatar: '' },
    { name: 'Carol Wilson', avatar: '' }
  ];

  constructor(private avatarService: AvatarService) {}

  ngOnInit() {
    // Initialize current user
    this.currentUser = {
      id: crypto.randomUUID(),
      name: this.username,
      avatar: this.avatarService.getInitialsAvatar(this.username),
      isOnline: true
    };

    // Initialize demo users' avatars
    this.demoUsers.forEach(user => {
      user.avatar = this.avatarService.getInitialsAvatar(user.name);
    });

    // Add demo users to online users
    this.demoUsers.forEach(user => {
      this.onlineUsers.push({
        id: crypto.randomUUID(),
        name: user.name,
        avatar: user.avatar,
        isOnline: true
      });
    });

    // Add current user to online users
    this.onlineUsers.push(this.currentUser);

    // Add initial system message
    this.addSystemMessage('Welcome to the group chat!');

    // Add demo messages
    this.addDemoMessages();
  }

  private addDemoMessages() {
    const demoMessages = [
      {
        sender: 'Alice Smith',
        content: 'Hey everyone! How\'s it going?',
        delay: 0
      },
      {
        sender: 'Bob Johnson',
        content: 'Hi Alice! Just working on some code reviews.',
        delay: 1000
      },
      {
        sender: 'Carol Wilson',
        content: 'Hello! Has anyone tried the new Angular 18 features?',
        delay: 2000
      },
      {
        sender: 'Alice Smith',
        content: 'Yes! The new standalone components are amazing!',
        delay: 3000
      },
      {
        sender: 'Bob Johnson',
        content: 'Agreed! The build times are much faster too.',
        delay: 4000
      }
    ];

    // Add messages with delays to simulate real conversation
    demoMessages.forEach((msg, index) => {
      setTimeout(() => {
        const demoUser = this.demoUsers.find(u => u.name === msg.sender);
        if (demoUser) {
          const message: Message = {
            id: crypto.randomUUID(),
            content: msg.content,
            sender: msg.sender,
            timestamp: new Date(Date.now() - (demoMessages.length - index) * 60000), // Stagger timestamps
            type: 'user',
            avatar: demoUser.avatar
          };
          this.messages.push(message);
          this.shouldScroll = true;
        }
      }, msg.delay);
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
    }
  }

  onSendMessage(content: string) {
    const message: Message = {
      id: crypto.randomUUID(),
      content,
      sender: this.username,
      timestamp: new Date(),
      type: 'user',
      avatar: this.currentUser.avatar
    };
    this.messages.push(message);
    this.shouldScroll = true;
  }

  private addSystemMessage(content: string) {
    const message: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'system',
      timestamp: new Date(),
      type: 'system',
      avatar: ''
    };
    this.messages.push(message);
    this.shouldScroll = true;
  }

  private scrollToBottom(): void {
    try {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
      this.shouldScroll = false;
    } catch (err) { }
  }
}