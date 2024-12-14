import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-input-container">
      <form (ngSubmit)="onSubmit()" class="flex gap-3">
        <input
          type="text"
          [(ngModel)]="message"
          name="message"
          placeholder="Type your message..."
          class="input input-bordered input-lg flex-1"
          (keyup.enter)="onSubmit()"
        />
        <button type="submit" class="btn btn-primary btn-lg">
          Send
        </button>
      </form>
    </div>
  `
})
export class ChatInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  message: string = '';

  onSubmit() {
    if (this.message.trim()) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}