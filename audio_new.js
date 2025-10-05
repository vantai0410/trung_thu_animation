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
      this.gainNode.gain.value = 0.9; // Volume nhẹ
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

  // Phát giai điệu lãng mạn cho Trung Thu (inspired by romantic ballads)
  playMelody() {
    if (!this.audioContext || this.isPlaying) return;

    // Giai điệu lãng mạn tự sáng tác cho website Trung Thu
    const notes = [
      // Phrase 1: Gentle opening
      { freq: 523.25, time: 0 }, // C5
      { freq: 587.33, time: 0.4 }, // D5
      { freq: 659.25, time: 0.8 }, // E5
      { freq: 698.46, time: 1.2 }, // F5
      { freq: 659.25, time: 1.6 }, // E5

      // Phrase 2: Rising melody (romantic feeling)
      { freq: 783.99, time: 2.0 }, // G5
      { freq: 880.0, time: 2.4 }, // A5
      { freq: 783.99, time: 2.8 }, // G5
      { freq: 698.46, time: 3.2 }, // F5

      // Phrase 3: Tender descending
      { freq: 659.25, time: 3.6 }, // E5
      { freq: 587.33, time: 4.0 }, // D5
      { freq: 523.25, time: 4.4 }, // C5
      { freq: 587.33, time: 4.8 }, // D5
      { freq: 523.25, time: 5.2 }, // C5

      // Ending phrase (hopeful)
      { freq: 659.25, time: 5.6 }, // E5
      { freq: 698.46, time: 6.0 }, // F5
      { freq: 783.99, time: 6.4 }, // G5
      { freq: 659.25, time: 6.8 }, // E5
      { freq: 523.25, time: 7.2 }, // C5
    ];

    this.isPlaying = true;

    notes.forEach((note) => {
      setTimeout(() => {
        this.createBellSound(note.freq, 0.6);
      }, note.time * 1000);
    });

    // Lặp lại sau 8 giây
    this.melodyTimer = setTimeout(() => {
      this.isPlaying = false;
      if (this.melodyTimer) {
        this.playMelody();
      }
    }, 8000);
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
