// Particle System for Rainbow Heart Animation
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particle-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.heartPoints = [];
    this.animationId = null;
    this.colorTime = 0; // Thêm timer cho rainbow effect

    this.setupCanvas();
    this.createHeartShape();
    this.createParticles();
    this.animate();

    // Handle window resize
    window.addEventListener("resize", () => this.setupCanvas());
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Function tạo màu rainbow
  getRainbowColor(time, offset = 0) {
    const hue = (time * 50 + offset) % 360;
    return `hsl(${hue}, 100%, 60%)`;
  }

  // Convert HSL to RGB for gradient
  hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h / (1 / 12)) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return [
      Math.round(f(0) * 255),
      Math.round(f(8) * 255),
      Math.round(f(4) * 255),
    ];
  }

  createHeartShape() {
    // Mathematical heart shape formula (improved)
    const centerX = this.canvas.width * 0.5;
    const centerY = this.canvas.height * 0.4; // Di chuyển trái tim lên cao hơn (từ 0.5 -> 0.4)
    const scale = Math.min(this.canvas.width, this.canvas.height) * 0.018; // Tăng scale để trái tim to hơn

    this.heartPoints = [];

    for (let t = 0; t < 2 * Math.PI; t += 0.02) {
      // Tăng độ chi tiết
      const x =
        centerX + scale * (16 * Math.sin(t) * Math.sin(t) * Math.sin(t));
      const y =
        centerY -
        scale *
          (13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));
      this.heartPoints.push({ x, y });
    }

    // Debug: log heart points để kiểm tra
    console.log("Heart points created:", this.heartPoints.length);
    console.log("Canvas size:", this.canvas.width, "x", this.canvas.height);
  }

  createParticles() {
    this.particles = [];
    const particleCount = 300; // Giảm từ 500 xuống 300 để đỡ lag

    for (let i = 0; i < particleCount; i++) {
      const heartPoint =
        this.heartPoints[Math.floor(Math.random() * this.heartPoints.length)];
      const particle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        targetX: heartPoint.x,
        targetY: heartPoint.y,
        vx: (Math.random() - 0.5) * 1.5, // Giảm velocity
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 2, // Giảm size để render nhanh hơn
        opacity: Math.random() * 0.7 + 0.3, // Giảm opacity range
        life: 1,
        maxLife: Math.random() * 150 + 100, // Giảm maxLife
        sparkle: Math.random() * Math.PI * 2,
      };
      this.particles.push(particle);
    }

    console.log("Particles created:", this.particles.length);
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      // Update position với easing nhẹ hơn để đỡ lag
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;

      particle.vx += dx * 0.003; // Giảm từ 0.005 xuống 0.003
      particle.vy += dy * 0.003;

      // Add less randomness để giảm tính toán
      particle.vx += (Math.random() - 0.5) * 0.03; // Giảm từ 0.05
      particle.vy += (Math.random() - 0.5) * 0.03;

      // Apply friction
      particle.vx *= 0.96; // Tăng friction để ổn định hơn
      particle.vy *= 0.96;

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update sparkle animation với tốc độ chậm hơn
      particle.sparkle += 0.08; // Giảm từ 0.1

      // Life cycle
      particle.life -= 1 / particle.maxLife;
      if (particle.life <= 0) {
        // Reset particle với target mới
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
        const newTarget =
          this.heartPoints[Math.floor(Math.random() * this.heartPoints.length)];
        particle.targetX = newTarget.x;
        particle.targetY = newTarget.y;
        particle.vx = (Math.random() - 0.5) * 1.5; // Giảm velocity
        particle.vy = (Math.random() - 0.5) * 1.5;
        particle.life = 1;
        particle.opacity = Math.random() * 0.7 + 0.3;
      }
    });
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Tạo màu rainbow cho heart outline
    const currentHue = (this.colorTime * 50) % 360;
    const [r, g, b] = this.hslToRgb(currentHue, 100, 60);
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
    this.ctx.lineWidth = 5; // Tăng độ dày outline
    this.ctx.beginPath();
    this.heartPoints.forEach((point, index) => {
      if (index === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.closePath();
    this.ctx.stroke();

    // Thêm glow effect cho outline
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
    this.ctx.lineWidth = 10;
    this.ctx.stroke();

    this.particles.forEach((particle, index) => {
      this.ctx.save();

      // Tạo màu rainbow cho mỗi particle với offset khác nhau
      const particleHue = (this.colorTime * 50 + index * 10) % 360;
      const [pr, pg, pb] = this.hslToRgb(particleHue, 100, 60);

      // Create gradient for glow effect với màu rainbow (tăng kích thước glow)
      const gradient = this.ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 6 // Tăng glow radius
      );

      // Rainbow glow với intensity cao
      const glowIntensity = Math.sin(particle.sparkle) * 0.3 + 0.7;
      const alpha = particle.opacity * particle.life * glowIntensity;

      gradient.addColorStop(0, `rgba(${pr}, ${pg}, ${pb}, ${alpha})`);
      gradient.addColorStop(0.3, `rgba(${pr}, ${pg}, ${pb}, ${alpha * 0.9})`);
      gradient.addColorStop(0.7, `rgba(${pr}, ${pg}, ${pb}, ${alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(${pr}, ${pg}, ${pb}, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Core particle với màu rainbow nhạt hơn
      const coreHue = (this.colorTime * 50 + index * 10 + 180) % 360; // Offset 180 độ
      const [cr, cg, cb] = this.hslToRgb(coreHue, 80, 80);
      this.ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.8})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
      this.ctx.fill();

      // Add sparkle effect với màu rainbow sáng
      if (Math.sin(particle.sparkle) > 0.7) {
        const sparkleHue = (this.colorTime * 100 + index * 20) % 360;
        const [sr, sg, sb] = this.hslToRgb(sparkleHue, 100, 90);
        this.ctx.fillStyle = `rgba(${sr}, ${sg}, ${sb}, ${alpha * 1.5})`;
        this.ctx.beginPath();
        this.ctx.arc(
          particle.x,
          particle.y,
          particle.size * 0.6,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }

      this.ctx.restore();
    });
  }

  animate() {
    this.colorTime += 0.015; // Giảm từ 0.02 xuống 0.015 để đỡ lag
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize particle system when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Add loading overlay
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "loading-overlay";
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingOverlay);

  // Initialize particle system after a short delay
  setTimeout(() => {
    new ParticleSystem();

    // Fade out loading overlay
    setTimeout(() => {
      loadingOverlay.classList.add("fade-out");
      setTimeout(() => {
        loadingOverlay.remove();
      }, 500);
    }, 1000);
  }, 500);
});

// Add star field background
class StarField {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "star-field";
    this.ctx = this.canvas.getContext("2d");
    this.stars = [];

    document.body.appendChild(this.canvas);
    this.setupCanvas();
    this.createStars();
    this.animate();

    window.addEventListener("resize", () => this.setupCanvas());
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stars.forEach((star) => {
      star.twinkle += 0.02;

      const twinkleOpacity = (Math.sin(star.twinkle) + 1) * 0.5;
      const finalOpacity = star.opacity * twinkleOpacity;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize star field
document.addEventListener("DOMContentLoaded", () => {
  new StarField();
});
