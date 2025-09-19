import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { PLAY_LIST } from '../../constant/play_list.constant';
import { SoundAnimationUtil } from '../../utitl/sound_animation.util';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnChanges, AfterViewInit, OnDestroy{
  // Lấy thẻ <audio> bằng @ViewChild
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  
  @Input() playOrPause: boolean = false;
  private bPlayOrPause = new BehaviorSubject<null>(null);
  playlist = PLAY_LIST;

  private hasPlayed = false; // Biến cờ
  private readonly subscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    const playOrPauseChanges = changes['playOrPause'];
    if (playOrPauseChanges.currentValue != null && playOrPauseChanges.currentValue != playOrPauseChanges.previousValue) {
      this.bPlayOrPause.next(null);
    }
  }
  ngAfterViewInit(): void {
    this.audioPlayer.nativeElement.volume = 0;
    const playOrPause$ = this.bPlayOrPause.asObservable();

    this.subscription.add(
      playOrPause$.subscribe(() =>this.onHeadphoneClick())
    )
  }

  onHeadphoneClick(): void {
    const audio = this.audioPlayer.nativeElement;
    audio.style.display = 'unset';
    console.log(this.hasPlayed);
    
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
