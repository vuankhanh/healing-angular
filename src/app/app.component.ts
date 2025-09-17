import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '@khajegan/ngx-audio-player';
import { SoundAnimationUtil } from './utitl/sound_animation.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  // Lấy thẻ <audio> bằng @ViewChild
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  title = 'healing';
  private hasPlayed = false; // Biến cờ

  msaapPlaylist: Track[] = [
    {
      title: 'Ở trọ',
      link: './assets/music/Ở trọ.m4a',
      artist: 'Audio One Artist'
    }
  ];

  ngAfterViewInit(): void {
    this.audioPlayer.nativeElement.volume = 0;
  }

  onHeadphoneClick(): void {
    const audio = this.audioPlayer.nativeElement;
    audio.style.display = 'unset';
    
    // Nếu audio đã phát, chỉ cần play/pause bình thường
    if (this.hasPlayed) {
      audio.paused ? audio.play() : audio.pause();
      return;
    }
    
    // Đặt biến cờ và bắt đầu play
    this.hasPlayed = true;
    audio.play();
    
    // Gọi hàm util với các tham số
    const fadeDuration = 2000; // 2 giây
    const currentTime = audio.currentTime;
    SoundAnimationUtil.FadeInAudio(audio, fadeDuration, currentTime);
  }
}
