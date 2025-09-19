import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './component/player/player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,

    PlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'healing';
  playOrPause = false;
  showPlayer = false;
  onHeadphoneClick(): void {
    this.showPlayer = true;
    this.playOrPause = !this.playOrPause;
  }

  onHeadphoneTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const target: HTMLImageElement = event.target as HTMLImageElement;
    target.style.opacity = '1';
  }

  onHeadphoneTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    const target: HTMLImageElement = event.target as HTMLImageElement;
    target.style.opacity = '0';

    this.onHeadphoneClick();
  }
}
