import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MessageType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-message-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-banner.component.html',
  styleUrl: './message-banner.component.css'
})
export class MessageBannerComponent {
  @Input() type: MessageType = 'info';
  @Input({ required: true }) message = '';
  @Input() ariaLive: 'polite' | 'assertive' = 'polite';

  get role(): 'status' | 'alert' {
    return this.type === 'error' ? 'alert' : 'status';
  }
}
