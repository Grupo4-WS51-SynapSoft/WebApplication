import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  standalone: true,
  imports: [
    MatIcon,
    MatInput,
    MatIconButton,
    FormsModule,
    MatButton,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  contactName = 'Julio Cesar'; // Nombre del contacto en el chat
  newMessage = ''; // Variable para el mensaje nuevo

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
      text: 'Yes, of course. Send me an email...',
      date: 'March 22th 2024, 10:32AM'
    }
  ];

  reply = {
    text: "Hi Julio Cesar. Nice to meet you! I'm interested in your service...",
    date: 'March 22th 2024, 11:23AM'
  };

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        name: 'You',
        avatar: 'assets/user-avatar.jpg', // Cambia esto si necesitas otro avatar
        text: this.newMessage,
        date: new Date().toLocaleString()
      });
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }
}
