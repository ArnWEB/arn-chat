import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketSerice } from '../services/websocket.service';

@Component({
  selector: 'app-username-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="modal-box bg-base-100 p-6 rounded-lg shadow-xl w-96 animate-fadeIn">
        <h3 class="font-bold text-lg mb-4">Welcome to Chat!</h3>
        <p class="mb-4">Please enter your username to continue</p>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <input
            type="text"
            [(ngModel)]="username"
            name="username"
            placeholder="Enter your username"
            class="input input-bordered w-full"
            required
            minlength="3"
            [class.input-error]="showError"
          />
          <div *ngIf="showError" class="text-error text-sm">
            Username must be at least 3 characters long
          </div>
          <button type="submit" class="btn btn-primary w-full">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  `
})
export class UsernameModalComponent {
  @Output() usernameSubmit = new EventEmitter<string>();
  username = '';
  showError = false;
  constructor(private ws: WebsocketSerice){}

  onSubmit() {
    if (this.username.length >= 3) {
      this.showError = false;
      this.usernameSubmit.emit(this.username);
      this.ws.connect(this.username)
    } else {
      this.showError = true;
    }
  }
}