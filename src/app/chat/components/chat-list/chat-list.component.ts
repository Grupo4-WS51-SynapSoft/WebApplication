import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common'; //
import { MatCardModule } from '@angular/material/card'; //
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-chat-list',
  standalone: true,
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, NgOptimizedImage]
})
export class ChatListComponent {
  messages = [
    {
      name: 'Julio Cesar',
      avatar: 'assets/julio-avatar.jpg',
      text: 'Hi Pepito Flores, thank you for contacting me! How can I help you?',
      date: 'March 22th 2024, 10:32AM'
    },
    {
      name: 'Julio Cesar',
      avatar: 'assets/julio-avatar.jpg',
      text: 'Hi Pepito Flores, thank you for contacting me! How can I help you?',
      date: 'March 22th 2024, 10:32AM'
    },
    {
      name: 'Julio Cesar',
      avatar: 'assets/julio-avatar.jpg',
      text: 'Hi Pepito Flores, thank you for contacting me! How can I help you?',
      date: 'March 22th 2024, 10:32AM'
    }
  ];
}
