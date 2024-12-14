import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-header">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold">Group Chat</h2>
            <div class="badge badge-primary">{{ onlineUsers }} online</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img [src]="currentUser.avatar" [alt]="currentUser.name" />
              </div>
            </div>
            <span class="font-medium">{{ currentUser.name }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatHeaderComponent {
  @Input() currentUser!: User;
  @Input() onlineUsers: number = 0;
}