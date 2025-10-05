// Performance Optimization Script
class PerformanceOptimizer {
  constructor() {
    this.frameCount = 0;
    this.lastTime = 0;
    this.fps = 60;
    this.targetFPS = 30; // Target lower FPS để đỡ lag

    this.init();
  }

  init() {
    // Disable pointer events cho các element không cần thiết
    this.optimizePointerEvents();

    // Add performance monitoring
    this.monitorPerformance();

    // Optimize rendering
    this.optimizeRendering();
  }

  optimizePointerEvents() {
    const elements = document.querySelectorAll(
      ".swirling-text-element, .swirling-heart, .floating-letter"
    );
    elements.forEach((el) => {
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
    });
  }

  monitorPerformance() {
    const checkPerformance = (timestamp) => {
      this.frameCount++;

      if (timestamp - this.lastTime >= 1000) {
        this.fps = Math.round(
          (this.frameCount * 1000) / (timestamp - this.lastTime)
        );

        // Nếu FPS thấp, tự động giảm effects
        if (this.fps < this.targetFPS) {
          this.reduceEffects();
        }

        this.frameCount = 0;
        this.lastTime = timestamp;

        // Log FPS để debug
        console.log(`Current FPS: ${this.fps}`);
      }

      requestAnimationFrame(checkPerformance);
    };

    requestAnimationFrame(checkPerformance);
  }

  reduceEffects() {
    // Giảm số lượng particles nếu lag
    const canvas = document.getElementById("particle-canvas");
    if (canvas && window.particleSystem) {
      // Giảm particles xuống còn 200
      if (window.particleSystem.particles.length > 200) {
        window.particleSystem.particles = window.particleSystem.particles.slice(
          0,
          200
        );
      }
    }

    // Giảm fireworks và sakura petals
    if (window.swirlingAnimation) {
      // Limit fireworks
      if (window.swirlingAnimation.fireworks.length > 30) {
        const excess = window.swirlingAnimation.fireworks.splice(30);
        excess.forEach((particle) => particle.remove());
      }

      // Limit sakura petals
      if (window.swirlingAnimation.sakuraPetals.length > 15) {
        const excess = window.swirlingAnimation.sakuraPetals.splice(15);
        excess.forEach((petal) => petal.remove());
      }
    }
  }

  optimizeRendering() {
    // Force hardware acceleration
    const style = document.createElement("style");
    style.textContent = `
      .swirling-text-element,
      .swirling-heart,
      .floating-letter {
        will-change: transform;
        transform: translateZ(0);
      }
      
      #particle-canvas {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize performance optimizer
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceOptimizer();
});
