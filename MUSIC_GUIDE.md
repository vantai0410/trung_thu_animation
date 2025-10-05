# 🎵 Hướng dẫn thêm nhạc vào website

## Bước 1: Chuẩn bị file nhạc

1. Tải bài "Give Me Your Forever" (hoặc bài khác bạn thích)
2. Convert thành format `.mp3` hoặc `.m4a`
3. Đặt tên file: `background-music.mp3`

## Bước 2: Upload file vào thư mục assets

```
e:\react\demo_trungthu_2\assets\
└── background-music.mp3  <-- Đặt file nhạc vào đây
```

## Bước 3: Cập nhật đường dẫn trong index.html

Thay đổi trong file `index.html`:

```html
<audio id="background-music" loop preload="auto">
  <source src="./assets/background-music.mp3" type="audio/mpeg" />
</audio>
```

## Bước 4: Test trên local server

```bash
python -m http.server 8000
```

Mở: http://localhost:8000

## Lưu ý pháp lý ⚖️

- Chỉ sử dụng nhạc bạn có quyền sử dụng
- Nhạc có bản quyền cần xin phép trước khi sử dụng
- Có thể sử dụng nhạc Creative Commons hoặc royalty-free

## Nguồn nhạc miễn phí 🎼

- [Freesound.org](https://freesound.org)
- [YouTube Audio Library](https://studio.youtube.com/channel/music)
- [Incompetech](https://incompetech.com)
- [Pixabay Music](https://pixabay.com/music/)

## Tính năng hiện tại 🔧

- ✅ Nút play/pause nhạc
- ✅ Auto-play khi user tương tác
- ✅ Volume điều chỉnh sẵn (30%)
- ✅ Loop nhạc liên tục
- ✅ Responsive design
