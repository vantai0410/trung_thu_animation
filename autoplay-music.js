// Simple Auto Music Script
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");

  if (audio) {
    audio.volume = 0.3; // Volume 30%

    // Function để phát nhạc
    const playMusic = () => {
      audio
        .play()
        .then(() => {
          console.log("🎵 Nhạc đang phát!");
        })
        .catch((error) => {
          console.log("⚠️ Autoplay bị chặn, click vào trang để phát nhạc");
        });
    };

    // Thử autoplay ngay
    playMusic();

    // Nếu autoplay bị chặn, phát khi user tương tác đầu tiên
    const startMusicOnInteraction = () => {
      playMusic();
      // Remove listeners sau khi đã phát
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("touchstart", startMusicOnInteraction);
      document.removeEventListener("keydown", startMusicOnInteraction);
    };

    // Lắng nghe các sự kiện tương tác
    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);
    document.addEventListener("keydown", startMusicOnInteraction);
  }
});
