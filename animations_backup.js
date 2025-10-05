// 3D Swirling Text Animation System với Epic Effects
class SwirlingTextAnimation {
  constructor() {
    this.container = document.getElementById("swirling-text");
    this.textElements = [];
    this.heartElements = [];
    this.animationId = null;
    this.time = 0;
    this.fireworks = []; // Pháo hoa
    this.sakuraPetals = []; // Cánh hoa
    this.interactiveEffects = []; // Hiệu ứng tương tác
    this.audioController = null; // Audio controller

    this.createTextElements();
    this.createHeartElements();
    this.createMoon(); // Tạo mặt trằng
    this.createInteractivity(); // Tương tác
    this.createMessageButton(); // Thêm nút lời nhắn
    this.setupAutoMusic(); // Setup nhạc tự động thay vì nút
    this.animate();

    // Handle window resize
    window.addEventListener("resize", () => this.updatePositions());
  }

  createTextElements() {
    // Tạo text xoay tròn quanh trái tim
    const text = "Chúc em Quỳnh của anh trung thu vui vẻ";
    const words = text.split(" ");

    words.forEach((word, index) => {
      const element = document.createElement("div");
      element.className = "rotating-text-element";
      element.textContent = word;
      element.style.cssText = `
        position: absolute;
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(45deg, 
          #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, 
          #feca57, #ff9ff3, #54a0ff, #5f27cd
        );
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 4s ease-in-out infinite;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        pointer-events: none;
        user-select: none;
        z-index: 25;
        transform-origin: center;
      `;

      // Store animation properties for circular motion - sắp xếp theo thứ tự
      element.animationData = {
        radius: 280 + Math.random() * 50, // Radius đồng đều hơn
        speed: 0.01 * (Math.random() > 0.5 ? 1 : -1), // Speed đồng đều
        angle: this.calculateOrderedAngle(index, words.length), // Góc theo thứ tự
        phase: 0, // Không random phase để giữ thứ tự
        scale: 1,
        opacity: 1,
        depth: 0, // Không 3D depth để tránh lật
      };

      this.textElements.push(element);
      this.container.appendChild(element);
    });

    // Thêm subtitle ở dưới
    this.createStaticSubtitle();

    // Thêm floating letters effect
    this.createFloatingLetters();

    // Thêm CSS animations
    this.addBeautifulCSS();
  }

  calculateOrderedAngle(index, totalWords) {
    // Sắp xếp từ theo thứ tự: trên -> phải -> dưới -> trái
    // Bắt đầu từ trên cùng (góc -π/2) và đi theo chiều kim đồng hồ
    const angleStep = (Math.PI * 2) / totalWords;
    let orderedAngle = -Math.PI / 2 + index * angleStep; // Bắt đầu từ trên cùng

    // Normalize angle to 0-2π range
    if (orderedAngle < 0) orderedAngle += Math.PI * 2;

    return orderedAngle;
  }

  createStaticSubtitle() {
    // Tạo subtitle cố định ở dưới
    const subtitleContainer = document.createElement("div");
    subtitleContainer.className = "static-subtitle-container";
    subtitleContainer.style.cssText = `
      position: fixed;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 30;
      padding: 20px 40px;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.1), 
        rgba(255, 255, 255, 0.05)
      );
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    `;

    const subtitle = document.createElement("div");
    subtitle.textContent = "✨ Chúc mừng Tết Trung Thu ✨";
    subtitle.style.cssText = `
      font-size: 1.2rem;
      font-weight: 600;
      color: #fff;
      text-shadow: 
        0 0 10px #00ff88,
        0 0 20px #00ff88,
        0 0 30px #00ff88;
      animation: neonPulse 2s ease-in-out infinite alternate;
    `;

    subtitleContainer.appendChild(subtitle);
    this.container.appendChild(subtitleContainer);
  }

  createMessageButton() {
    // Tạo nút lời nhắn đẹp mắt
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "message-button-container";
    buttonContainer.style.cssText = `
      position: fixed;
      top: 30px;
      left: 30px;
      z-index: 100;
    `;

    const messageButton = document.createElement("button");
    messageButton.className = "message-button";
    messageButton.innerHTML = "💌 Lời Nhắn";
    messageButton.style.cssText = `
      padding: 15px 25px;
      font-size: 1.1rem;
      font-weight: bold;
      color: white;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
      background-size: 300% 300%;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      animation: buttonGlow 3s ease-in-out infinite;
      transition: all 0.3s ease;
      transform: scale(1);
    `;

    // Hover effects
    messageButton.addEventListener("mouseenter", () => {
      messageButton.style.transform = "scale(1.1)";
      messageButton.style.boxShadow = `
        0 12px 35px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.6),
        0 0 30px rgba(255, 255, 255, 0.5)
      `;
    });

    messageButton.addEventListener("mouseleave", () => {
      messageButton.style.transform = "scale(1)";
      messageButton.style.boxShadow = `
        0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4)
      `;
    });

    // Click event để hiện popup
    messageButton.addEventListener("click", () => {
      this.showMessagePopup();
    });

    buttonContainer.appendChild(messageButton);
    document.body.appendChild(buttonContainer);

    // Thêm CSS cho button animation
    const buttonStyle = document.createElement("style");
    buttonStyle.textContent = `
      @keyframes buttonGlow {
        0% { 
          background-position: 0% 50%;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        50% { 
          background-position: 100% 50%;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 20px rgba(255, 255, 255, 0.3);
        }
        100% { 
          background-position: 0% 50%;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
      }
    `;
    document.head.appendChild(buttonStyle);
  }

  showMessagePopup() {
    // Tạo popup lời nhắn đẹp
    const popup = document.createElement("div");
    popup.className = "message-popup";
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 90%;
      max-width: 500px;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.15), 
        rgba(255, 255, 255, 0.1)
      );
      backdrop-filter: blur(25px);
      border-radius: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      padding: 40px;
      text-align: center;
      z-index: 1000;
      animation: popupAppear 0.5s ease-out forwards;
    `;

    const messageContent = document.createElement("div");
    messageContent.innerHTML = `
      <div style="
        font-size: 2.5rem;
        margin-bottom: 20px;
        animation: bounce 1s ease-in-out infinite;
      ">💖</div>
      
      <h2 style="
        font-size: 1.8rem;
        font-weight: bold;
        color: white;
        margin-bottom: 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #feca57);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 3s ease-in-out infinite;
      ">Lời Nhắn Trung Thu</h2>
      
      <p style="
        font-size: 1.1rem;
        line-height: 1.6;
        color: white;
        margin-bottom: 25px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        text-align: center;
      ">
        <strong style="color: #feca57; font-size: 1.3rem;">Em yêu ơi,</strong><br><br>
        
        Gửi em ngàn lời chúc trung thu<br>
        ngọt ngào nhất từ anh kk<br>
        
        <strong style="color: #ff6b6b;">Yêu em nhiều lắm! ❤️</strong>
      </p>
    `;

    // Nút đóng popup
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "✖️ Đóng";
    closeButton.style.cssText = `
      padding: 12px 25px;
      font-size: 1rem;
      font-weight: bold;
      color: white;
      background: linear-gradient(45deg, #ff6b6b, #ff9ff3);
      border: none;
      border-radius: 15px;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    `;

    closeButton.addEventListener("click", () => {
      popup.style.animation = "popupDisappear 0.3s ease-in forwards";
      setTimeout(() => {
        popup.remove();
      }, 300);
    });

    popup.appendChild(messageContent);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);

    // Thêm CSS cho popup animations
    const popupStyle = document.createElement("style");
    popupStyle.textContent = `
      @keyframes popupAppear {
        0% { 
          transform: translate(-50%, -50%) scale(0) rotate(180deg);
          opacity: 0;
        }
        100% { 
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes popupDisappear {
        0% { 
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
        }
        100% { 
          transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          opacity: 0;
        }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(popupStyle);

    // Click outside để đóng popup
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closeButton.click();
      }
    });
  }

  createFloatingLetters() {
    const letters = ["💕", "🌙", "⭐", "🎋", "🥮", "🌸", "✨", "💖"];

    letters.forEach((letter, index) => {
      const floatingLetter = document.createElement("div");
      floatingLetter.className = "floating-letter";
      floatingLetter.textContent = letter;
      floatingLetter.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 25}px;
        color: hsl(${Math.random() * 360}, 100%, 70%);
        pointer-events: none;
        z-index: 25;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: floatDance ${3 + Math.random() * 2}s ease-in-out infinite;
        animation-delay: ${index * 0.3}s;
        filter: drop-shadow(0 0 10px currentColor);
      `;

      document.body.appendChild(floatingLetter);
    });
  }

  addBeautifulCSS() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes neonPulse {
        0% { 
          text-shadow: 
            0 0 10px #00ff88,
            0 0 20px #00ff88,
            0 0 30px #00ff88,
            0 0 40px #00ff88;
        }
        100% { 
          text-shadow: 
            0 0 20px #00ff88,
            0 0 30px #00ff88,
            0 0 40px #00ff88,
            0 0 50px #00ff88,
            0 0 60px #00ff88;
        }
      }
      
      @keyframes floatDance {
        0%, 100% { 
          transform: translateY(0px) rotate(0deg) scale(1);
          opacity: 0.8;
        }
        25% { 
          transform: translateY(-20px) rotate(90deg) scale(1.1);
          opacity: 1;
        }
        50% { 
          transform: translateY(-10px) rotate(180deg) scale(0.9);
          opacity: 0.9;
        }
        75% { 
          transform: translateY(-30px) rotate(270deg) scale(1.2);
          opacity: 1;
        }
      }
      
      .beautiful-text-container:hover {
        transform: translateX(-50%) scale(1.05);
        box-shadow: 
          0 30px 60px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease;
      }
      
      .gradient-title:hover {
        animation-duration: 1s;
        transform: perspective(1000px) rotateX(5deg) scale(1.02);
        transition: transform 0.3s ease;
      }
      
      .floating-letter:hover {
        animation-duration: 0.5s;
        transform: scale(2) rotate(360deg) !important;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }

  createMoon() {
    // Tạo mặt trăng Trung Thu
    const moon = document.createElement("div");
    moon.className = "magical-moon";
    moon.style.cssText = `
      position: fixed;
      top: 50px;
      right: 80px;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle at 30% 30%, #fff8dc, #f0e68c, #daa520);
      border-radius: 50%;
      box-shadow: 
        0 0 50px rgba(255, 255, 255, 0.8),
        0 0 100px rgba(255, 255, 255, 0.6),
        0 0 150px rgba(255, 255, 255, 0.4),
        inset -20px -20px 0px rgba(0, 0, 0, 0.1);
      z-index: 5;
      animation: moonGlow 4s ease-in-out infinite alternate;
    `;

    // Thêm crater trên mặt trăng
    const crater1 = document.createElement("div");
    crater1.style.cssText = `
      position: absolute;
      top: 30%;
      left: 40%;
      width: 15px;
      height: 15px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    `;

    const crater2 = document.createElement("div");
    crater2.style.cssText = `
      position: absolute;
      top: 60%;
      left: 60%;
      width: 10px;
      height: 10px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 50%;
    `;

    moon.appendChild(crater1);
    moon.appendChild(crater2);
    document.body.appendChild(moon);

    // Thêm CSS cho moon animation
    const moonStyle = document.createElement("style");
    moonStyle.textContent = `
      @keyframes moonGlow {
        0% { 
          transform: scale(1) rotate(0deg);
          box-shadow: 
            0 0 50px rgba(255, 255, 255, 0.8),
            0 0 100px rgba(255, 255, 255, 0.6),
            0 0 150px rgba(255, 255, 255, 0.4);
        }
        100% { 
          transform: scale(1.05) rotate(2deg);
          box-shadow: 
            0 0 60px rgba(255, 255, 255, 1.0),
            0 0 120px rgba(255, 255, 255, 0.8),
            0 0 180px rgba(255, 255, 255, 0.6);
        }
      }
    `;
    document.head.appendChild(moonStyle);
  }

  createAudioController() {
    // Sử dụng file audio element thay vì Web Audio API
    const audio = document.getElementById("background-music");

    // Tạo nút điều khiển âm thanh
    const audioContainer = document.createElement("div");
    audioContainer.className = "audio-controller-container";
    audioContainer.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 100;
    `;

    const audioButton = document.createElement("button");
    audioButton.className = "audio-button";
    audioButton.innerHTML = "🎵";
    audioButton.style.cssText = `
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
      border: none;
      border-radius: 50%;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2), 
        rgba(255, 255, 255, 0.1)
      );
      backdrop-filter: blur(20px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    let isPlaying = false;

    // Click để toggle âm thanh
    audioButton.addEventListener("click", () => {
      if (this.audioManager) {
        if (isPlaying) {
          this.audioManager.stopMelody();
          audioButton.innerHTML = "�";
          audioButton.style.background =
            "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))";
          isPlaying = false;
        } else {
          this.audioManager.playMelody();
          audioButton.innerHTML = "🎵";
          audioButton.style.background =
            "linear-gradient(135deg, #4ecdc4, #45b7d1)";
          isPlaying = true;
        }

        // Play click sound
        this.audioManager.playClickSound();
      }
    });

    // Hover effects
    audioButton.addEventListener("mouseenter", () => {
      audioButton.style.transform = "scale(1.1)";
      audioButton.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.4)";
    });

    audioButton.addEventListener("mouseleave", () => {
      audioButton.style.transform = "scale(1)";
      audioButton.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
    });

    audioContainer.appendChild(audioButton);
    document.body.appendChild(audioContainer);

  setupAutoMusic() {
    // Setup nhạc tự động phát khi load trang
    const audio = document.getElementById('background-music');
    
    if (audio) {
      audio.volume = 0.3; // Volume vừa phải
      
      // Thử autoplay ngay lập tức
      const tryAutoPlay = () => {
        audio.play().then(() => {
          console.log("🎵 Nhạc đang phát tự động!");
        }).catch(error => {
          console.log("⚠️ Autoplay bị chặn, sẽ phát khi user tương tác:", error);
          
          // Nếu autoplay bị chặn, phát khi user click/touch đầu tiên
          const playOnFirstInteraction = () => {
            audio.play().then(() => {
              console.log("🎵 Nhạc bắt đầu phát sau tương tác đầu tiên!");
            });
            
            // Remove listeners sau khi đã phát
            document.removeEventListener('click', playOnFirstInteraction);
            document.removeEventListener('touchstart', playOnFirstInteraction);
            document.removeEventListener('keydown', playOnFirstInteraction);
          };
          
          // Lắng nghe tương tác đầu tiên
          document.addEventListener('click', playOnFirstInteraction);
          document.addEventListener('touchstart', playOnFirstInteraction);  
          document.addEventListener('keydown', playOnFirstInteraction);
        });
      };
      
      // Thử autoplay ngay khi load
      if (document.readyState === 'complete') {
        tryAutoPlay();
      } else {
        window.addEventListener('load', tryAutoPlay);
      }
    }
  }

  createInteractivity() {
    // Click để tạo pháo hoa
    document.addEventListener("click", (e) => {
      this.createFirework(e.clientX, e.clientY);

      // Play firework sound effect
      if (this.audioManager) {
        this.audioManager.playFireworkSound();
      }
    });

    // Magic cursor trail
    document.addEventListener("mousemove", (e) => {
      this.createMagicTrail(e.clientX, e.clientY);
    });

    // Tạo cánh hoa rơi liên tục - giảm tần suất
    setInterval(() => {
      this.createSakuraPetal();
    }, 1500); // Tăng từ 800ms lên 1500ms để đỡ lag
  }

  createMagicTrail(x, y) {
    const trail = document.createElement("div");
    trail.innerHTML = "✨";
    trail.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${Math.random() * 15 + 10}px;
      pointer-events: none;
      z-index: 50;
      color: hsl(${Math.random() * 360}, 100%, 70%);
      transform: translate(-50%, -50%);
      animation: magicTrailFade 1s ease-out forwards;
    `;

    document.body.appendChild(trail);

    // Auto remove
    setTimeout(() => {
      trail.remove();
    }, 1000);

    // Add CSS if not exists
    if (!document.querySelector("#magicTrailCSS")) {
      const style = document.createElement("style");
      style.id = "magicTrailCSS";
      style.textContent = `
        @keyframes magicTrailFade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createFirework(x, y) {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Giảm từ 15 xuống 8 particles để đỡ lag
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 15px ${color};
      `;

      const angle = (i / 8) * Math.PI * 2;
      const velocity = Math.random() * 120 + 40; // Giảm velocity
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      particle.vx = vx;
      particle.vy = vy;
      particle.life = 1;

      document.body.appendChild(particle);
      this.fireworks.push(particle);
    }
  }

  createSakuraPetal() {
    const petal = document.createElement("div");
    petal.innerHTML = "🌸";
    petal.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: -50px;
      font-size: ${Math.random() * 20 + 15}px;
      pointer-events: none;
      z-index: 15;
      transform: rotate(${Math.random() * 360}deg);
      opacity: ${Math.random() * 0.8 + 0.2};
    `;

    petal.vx = (Math.random() - 0.5) * 2;
    petal.vy = Math.random() * 2 + 1;
    petal.rotation = Math.random() * 5 - 2.5;

    document.body.appendChild(petal);
    this.sakuraPetals.push(petal);
  }

  createHeartElements() {
    const heartCount = 5; // Giảm từ 8 xuống 5 để đỡ lag

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.className = "swirling-heart glow-red";
      heart.innerHTML = "❤️";
      heart.style.fontSize = this.getRandomSize();

      // Store animation properties
      heart.animationData = {
        radius: this.getRandomRadius() * 0.8,
        speed: this.getRandomSpeed() * 1.2,
        angle: (i / heartCount) * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        scale: 1,
        opacity: 1,
        zIndex: Math.floor(Math.random() * 10),
        pulse: Math.random() * Math.PI * 2,
      };

      this.heartElements.push(heart);
      this.container.appendChild(heart);
    }
  }

  getRandomSize() {
    return Math.random() * 0.4 + 1.0 + "rem"; // Tăng kích thước chữ
  }

  getRandomRadius() {
    return Math.random() * 150 + 250; // Tăng radius để hearts xoay xa hơn quanh trái tim to
  }

  getRandomSpeed() {
    return (Math.random() * 0.015 + 0.008) * (Math.random() > 0.5 ? 1 : -1); // Chậm lại một chút
  }

  updatePositions() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.4; // Center của trái tim

    // Update text elements xoay tròn quanh trái tim - không lật chữ
    this.textElements.forEach((element, index) => {
      const data = element.animationData;

      // Tính toán vị trí xoay tròn với góc theo thứ tự
      const currentAngle = data.angle + this.time * data.speed;
      const x = centerX + Math.cos(currentAngle) * data.radius;
      const y = centerY + Math.sin(currentAngle) * data.radius * 0.8; // Ít ellipse hơn

      // Không có 3D effects để tránh lật chữ
      data.scale = 1; // Scale cố định
      data.opacity = 1; // Opacity cố định

      // Apply transformations - chỉ dịch chuyển, không xoay chữ
      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.transform = `
        translate(-50%, -50%) 
        scale(${data.scale})
      `; // Bỏ tất cả rotation để chữ luôn đứng thẳng
      element.style.opacity = data.opacity;
      element.style.zIndex = 25; // Z-index cố định
    });

    // Update heart elements với 3D effect
    this.heartElements.forEach((heart, index) => {
      const data = heart.animationData;

      // Calculate 3D position cho hearts
      const heartAngle = data.angle + this.time * data.speed + data.phase;
      const heartX = centerX + Math.cos(heartAngle) * data.radius;
      const heartY = centerY + Math.sin(heartAngle) * data.radius * 0.6;
      const heartZ = Math.cos(heartAngle + this.time * 0.025) * 50;

      // Add pulsing effect với 3D
      const pulse = Math.sin(this.time * 0.05 + data.pulse) * 0.3 + 0.7;
      const depthScale = (heartZ + 50) / 100;
      const scale = data.scale * pulse * (0.8 + depthScale * 0.4);

      // 3D tilt cho hearts
      const tiltX = Math.sin(this.time * 0.02 + index * 0.8) * 20;
      const tiltY = Math.cos(this.time * 0.03 + index * 0.6) * 15;

      // Apply 3D transformations
      heart.style.left = heartX + "px";
      heart.style.top = heartY + "px";
      heart.style.transform = `
                translate(-50%, -50%) 
                perspective(800px) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg) 
                translateZ(${heartZ}px) 
                scale(${scale}) 
                rotate(${(this.time * data.speed * 30) % 360}deg)
            `;
      heart.style.opacity = data.opacity * pulse * (0.7 + depthScale * 0.3);
      heart.style.zIndex = Math.floor(heartZ + 50);

      // Floating effect với 3D
      const float = Math.sin(this.time * 0.03 + data.phase) * 15;
      heart.style.filter = `drop-shadow(0 ${float}px 20px rgba(255, 71, 87, 0.6))`;
    });
  }

  animate() {
    this.time += 0.012; // Giảm tốc độ từ 0.016 xuống 0.012 để đỡ lag

    // Chỉ update positions mỗi 3 frames để giảm tải
    if (Math.floor(this.time * 60) % 3 === 0) {
      this.updatePositions();
    }

    // Giảm tần suất update fireworks và sakura
    if (Math.floor(this.time * 60) % 2 === 0) {
      this.updateFireworks(); // Update pháo hoa mỗi 2 frames
      this.updateSakuraPetals(); // Update cánh hoa mỗi 2 frames
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateFireworks() {
    // Giới hạn số lượng particles để tránh lag
    if (this.fireworks.length > 50) {
      // Xóa particles cũ nhất
      const oldestParticles = this.fireworks.splice(0, 10);
      oldestParticles.forEach((particle) => particle.remove());
    }

    this.fireworks.forEach((particle, index) => {
      // Physics cho pháo hoa - tối ưu
      particle.style.left =
        parseFloat(particle.style.left) + particle.vx * 0.012 + "px";
      particle.style.top =
        parseFloat(particle.style.top) + particle.vy * 0.012 + "px";

      // Gravity - giảm intensity
      particle.vy += 150 * 0.012; // Giảm từ 200 xuống 150

      // Fade out - nhanh hơn để giảm particles
      particle.life -= 0.025; // Tăng từ 0.02 lên 0.025
      particle.style.opacity = particle.life;

      // Remove khi hết life
      if (particle.life <= 0) {
        particle.remove();
        this.fireworks.splice(index, 1);
      }
    });
  }

  updateSakuraPetals() {
    // Giới hạn số lượng cánh hoa để tránh lag
    if (this.sakuraPetals.length > 20) {
      const oldestPetals = this.sakuraPetals.splice(0, 5);
      oldestPetals.forEach((petal) => petal.remove());
    }

    this.sakuraPetals.forEach((petal, index) => {
      // Physics cho cánh hoa - tối ưu
      const currentLeft = parseFloat(petal.style.left);
      const currentTop = parseFloat(petal.style.top);
      const currentRotation = parseFloat(
        petal.style.transform.match(/rotate\(([^)]+)\)/)?.[1] || 0
      );

      petal.style.left = currentLeft + petal.vx + "px";
      petal.style.top = currentTop + petal.vy + "px";
      petal.style.transform = `rotate(${currentRotation + petal.rotation}deg)`;

      // Gentle sway - giảm intensity
      petal.vx += Math.sin(this.time * 1.5 + index) * 0.015; // Giảm từ 2 và 0.02

      // Remove khi ra khỏi màn hình
      if (currentTop > window.innerHeight + 100) {
        petal.remove();
        this.sakuraPetals.splice(index, 1);
      }
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Interactive Button Animations
class InteractiveAnimations {
  constructor() {
    this.setupLikeButton();
    this.setupSearchBar();
    this.setupCommentInput();
    this.setupProfileButton();
    this.addHoverEffects();
  }

  setupLikeButton() {
    const likeBtn =
      document.querySelector(".like-btn") ||
      document.querySelector('[class*="like"]');
    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        likeBtn.classList.add("liked");
        setTimeout(() => likeBtn.classList.remove("liked"), 600);

        // Add floating hearts effect
        this.createFloatingHearts(e.target);
      });
    }
  }

  createFloatingHearts(element) {
    const rect = element.getBoundingClientRect();
    const heartCount = 5;

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = rect.left + rect.width / 2 + "px";
      heart.style.top = rect.top + rect.height / 2 + "px";
      heart.style.fontSize = "20px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.opacity = "1";

      document.body.appendChild(heart);

      // Animate floating heart
      gsap.to(heart, {
        y: -100 - Math.random() * 50,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 1.5,
        rotation: Math.random() * 360,
        duration: 2,
        ease: "power2.out",
        onComplete: () => heart.remove(),
      });
    }
  }

  setupSearchBar() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchBar =
      searchInput?.closest(".search-bar") || searchInput?.parentElement;

    if (searchBar) {
      searchBar.classList.add("search-bar");

      searchInput.addEventListener("focus", () => {
        searchBar.style.transform = "translateY(-2px)";
        searchBar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
      });

      searchInput.addEventListener("blur", () => {
        searchBar.style.transform = "translateY(0)";
        searchBar.style.boxShadow = "none";
      });
    }
  }

  setupCommentInput() {
    const commentInput = document.querySelector(
      'input[placeholder*="bình luận"]'
    );
    const commentContainer = commentInput?.parentElement;

    if (commentContainer) {
      commentContainer.classList.add("comment-input");

      commentInput.addEventListener("focus", () => {
        commentContainer.style.transform = "translateY(-2px)";
        commentContainer.style.borderColor = "rgba(255, 255, 255, 0.3)";
      });

      commentInput.addEventListener("blur", () => {
        commentContainer.style.transform = "translateY(0)";
        commentContainer.style.borderColor = "rgba(255, 255, 255, 0.1)";
      });
    }
  }

  setupProfileButton() {
    const profileImg = document.querySelector(".profile-glow");
    if (profileImg) {
      profileImg.classList.add("profile-glow");
    }
  }

  addHoverEffects() {
    // Add hover effects to all interactive buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.classList.add("interactive-btn");

      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px) scale(1.05)";
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0) scale(1)";
      });

      btn.addEventListener("mousedown", () => {
        btn.style.transform = "translateY(0) scale(0.95)";
      });

      btn.addEventListener("mouseup", () => {
        btn.style.transform = "translateY(-2px) scale(1.05)";
      });
    });
  }
}

// Parallax Background Effect
class ParallaxEffect {
  constructor() {
    this.setupParallax();
  }

  setupParallax() {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      this.updateParallax(mouseX, mouseY);
    });
  }

  updateParallax(x, y) {
    const elements = document.querySelectorAll(
      ".swirling-text-element, .swirling-heart"
    );

    elements.forEach((element, index) => {
      const speed = 0.1 + (index % 3) * 0.05;
      const moveX = x * speed * 20;
      const moveY = y * speed * 20;

      element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait for particle system to initialize
  setTimeout(() => {
    new SwirlingTextAnimation();
    new InteractiveAnimations();
    new ParallaxEffect();
  }, 1000);
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations
    document.querySelectorAll("canvas").forEach((canvas) => {
      canvas.style.display = "none";
    });
  } else {
    // Resume animations
    document.querySelectorAll("canvas").forEach((canvas) => {
      canvas.style.display = "block";
    });
  }
});

// Mobile touch interactions
if ("ontouchstart" in window) {
  document.addEventListener("touchstart", (e) => {
    // Add ripple effect for touch interactions
    const touch = e.touches[0];
    const ripple = document.createElement("div");
    ripple.style.position = "fixed";
    ripple.style.left = touch.clientX + "px";
    ripple.style.top = touch.clientY + "px";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "9999";

    document.body.appendChild(ripple);

    gsap.to(ripple, {
      scale: 3,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  });
}
