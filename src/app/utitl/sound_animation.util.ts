import { finalize, interval, takeWhile } from "rxjs";

export class SoundAnimationUtil {
  static FadeInAudio(
    audioElement: HTMLAudioElement,
    duration: number,
    currentTime: number
  ): void {
    // Chỉ áp dụng fade in nếu audio bắt đầu từ đầu
    if (currentTime > 0) {
      audioElement.volume = 1; // Đặt âm lượng tối đa ngay lập tức
      return;
    }

    // Khởi tạo âm lượng ban đầu
    audioElement.volume = 0;

    const steps = 100; // Số bước tăng âm lượng
    const stepInterval = duration / steps; // Thời gian giữa mỗi bước

    // Sử dụng RxJS để tạo hiệu ứng
    interval(stepInterval)
      .pipe(
        takeWhile(step => step < steps),
        finalize(() => audioElement.volume = 1)
      )
      .subscribe(step => {
        const newVolume = (step + 1) / steps;
        audioElement.volume = newVolume;
      });
  }
}