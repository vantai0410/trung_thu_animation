// Audio Manager for Trung Thu Animation
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNode = null;
    this.isPlaying = false;
    this.melodyTimer = null;

    this.init();
  }

  async init() {
    try {
      // Tạo AudioContext
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.1; // Volume nhẹ
    } catch (error) {
      console.log("Web Audio API not supported:", error);
    }
  }

  // Tạo âm thanh chuông nhẹ nhàng
  createBellSound(frequency = 440, duration = 2) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    oscillator.connect(envelope);
    envelope.connect(this.gainNode);

    // Tạo âm chuông với harmonics
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );

    // Envelope cho âm chuông (attack-decay)
    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(
      0.3,
      this.audioContext.currentTime + 0.1
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    return oscillator;
  }

  // Phát giai điệu lãng mạn lấy cảm hứng từ ballad style
  playMelody() {
    if (!this.audioContext || this.isPlaying) return;

    // Giai điệu lãng mạn tự sáng tác với cảm hứng từ nhạc ballad Việt Nam
    const notes = [
      // Đoạn mở đầu - nhẹ nhàng
      { freq: 659.25, time: 0 }, // E5
      { freq: 698.46, time: 0.3 }, // F5
      { freq: 783.99, time: 0.6 }, // G5
      { freq: 880.0, time: 1.0 }, // A5
      { freq: 783.99, time: 1.4 }, // G5
      { freq: 698.46, time: 1.8 }, // F5

      // Đoạn cầu nối - cảm xúc
      { freq: 659.25, time: 2.2 }, // E5
      { freq: 587.33, time: 2.5 }, // D5
      { freq: 523.25, time: 2.8 }, // C5

      // Đoạn cao trào - đầy cảm xúc
      { freq: 880.0, time: 3.2 }, // A5
      { freq: 987.77, time: 3.6 }, // B5
      { freq: 880.0, time: 4.0 }, // A5
      { freq: 783.99, time: 4.4 }, // G5
      { freq: 698.46, time: 4.8 }, // F5

      // Kết thúc - êm dịu
      { freq: 659.25, time: 5.2 }, // E5
      { freq: 587.33, time: 5.6 }, // D5
      { freq: 523.25, time: 6.0 }, // C5
      { freq: 587.33, time: 6.4 }, // D5
      { freq: 523.25, time: 6.8 }, // C5 - note cuối
    ];

    this.isPlaying = true;

    notes.forEach((note) => {
      setTimeout(() => {
        this.createBellSound(note.freq, 0.6);
      }, note.time * 1000);
    });

    // Lặp lại sau 7.5 giây
    this.melodyTimer = setTimeout(() => {
      this.isPlaying = false;
      if (this.melodyTimer) {
        this.playMelody();
      }
    }, 7500);
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  // Tạo sound effect cho click
  playClickSound() {
    this.createBellSound(800, 0.3);
  }

  // Tạo sound effect cho fireworks
  playFireworkSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    oscillator.connect(envelope);
    envelope.connect(this.gainNode);

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1000,
      this.audioContext.currentTime + 0.1
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      50,
      this.audioContext.currentTime + 0.3
    );

    envelope.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    envelope.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.3
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }
}

// Export for use in main animation
window.AudioManager = AudioManager;
