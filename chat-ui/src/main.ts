import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsernameModalComponent } from './app/components/username-modal.component';
import { ChatComponent } from './app/components/chat.component';
// import { ChatComponent } from './app/components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UsernameModalComponent, ChatComponent],
  template: `
    <main>
      <app-username-modal
        *ngIf="!username"
        (usernameSubmit)="onUsernameSubmit($event)"
      ></app-username-modal>
      
      <app-chat
        *ngIf="username"
        [username]="username"
      ></app-chat>
    </main>
  `,
})
export class App {
  username = '';

  onUsernameSubmit(username: string) {
    this.username = username;
  }
}

bootstrapApplication(App);