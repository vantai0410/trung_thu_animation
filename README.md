# Mid-Autumn Festival Animation Project

Một giao diện đẹp với nhiều hiệu ứng động được tạo bằng HTML, CSS, JavaScript thuần, mô phỏng giao diện TikTok với chủ đề Trung Thu.

## ✨ Tính năng

- **Particle System**: Hệ thống hạt tạo hình trái tim xanh với hiệu ứng glow
- **Swirling Text Animation**: Text xoay tròn với trái tim đỏ và hiệu ứng 3D
- **Interactive UI**: Giao diện tương tác như TikTok với các nút like, comment, share
- **Responsive Design**: Tối ưu cho cả mobile và desktop
- **Star Field Background**: Nền sao lấp lánh tạo không khí lãng mạn
- **Smooth Animations**: Sử dụng GSAP và requestAnimationFrame cho animation mượt mà

## 🚀 Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Styling với backdrop-filter, animations, gradients
- **JavaScript (ES6+)**: Logic animation và tương tác
- **Three.js**: Particle system (CDN)
- **GSAP**: Animation library (CDN)
- **Tailwind CSS**: Utility-first CSS framework (CDN)

## 📁 Cấu trúc project

```
├── index.html          # File HTML chính
├── styles.css          # CSS custom styles
├── particles.js        # Particle system và star field
├── animations.js       # Text animation và UI interactions
└── README.md          # Documentation
```

## 🎯 Hiệu ứng chính

### 1. Particle Heart
- 300+ hạt xanh tạo hình trái tim
- Hiệu ứng glow và sparkle
- Animation mượt mà với easing

### 2. Swirling Text
- Text "Chúc Phương mùa Trung Thu ấm áp" xoay tròn
- 8 trái tim đỏ với hiệu ứng pulse
- 3D perspective và parallax

### 3. Interactive Elements
- Like button với floating hearts
- Search bar với focus effects
- Comment input với animations
- Hover effects cho tất cả buttons

## 🌐 Deploy GitHub Pages

Project này hoàn toàn tương thích với GitHub Pages:

1. **Push code lên GitHub repository**
2. **Enable GitHub Pages** trong Settings
3. **Select source**: Deploy from a branch (main/master)
4. **Access**: `https://username.github.io/repository-name`

### CDN Dependencies
Tất cả dependencies đều load từ CDN nên không cần build process:
- Three.js: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- Tailwind CSS: `https://cdn.tailwindcss.com`

## 📱 Responsive Design

- **Mobile**: Tối ưu cho màn hình nhỏ với touch interactions
- **Tablet**: Layout điều chỉnh cho tablet
- **Desktop**: Full experience với mouse hover effects

## 🎨 Customization

### Thay đổi màu sắc
```css
/* Trong styles.css */
.glow-green {
    filter: drop-shadow(0 0 20px #00ff88); /* Màu xanh */
}

.glow-red {
    filter: drop-shadow(0 0 15px #ff4757); /* Màu đỏ */
}
```

### Thay đổi text
```javascript
// Trong animations.js
const text = "Chúc Phương mùa Trung Thu ấm áp"; // Thay đổi text ở đây
```

### Thay đổi số lượng particles
```javascript
// Trong particles.js
const particleCount = 300; // Tăng/giảm số hạt
```

## 🔧 Performance

- **Optimized**: Sử dụng requestAnimationFrame
- **Lazy Loading**: Animations chỉ start khi DOM ready
- **Memory Management**: Cleanup animations khi tab hidden
- **Mobile Optimized**: Touch interactions và responsive design

## 📄 License

MIT License - Sử dụng tự do cho mục đích học tập và thương mại.

## 🤝 Contributing

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

---

**Tạo bởi**: AI Assistant  
**Ngày**: 2024  
**Mục đích**: Demo animation effects cho Mid-Autumn Festival
