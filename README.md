# CYBER JINN - Matrix Themed Website

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://muhammedadnank.github.io/cyber-jinn/)
[![GitHub](https://img.shields.io/badge/github-muhammedadnank-blue)](https://github.com/muhammedadnank)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A fully responsive, feature-rich Matrix-themed website with cutting-edge design elements, scanline effects, and dynamic animations.

🌐 **[Live Demo](https://muhammedadnank.github.io/cyber-jinn/)**

![CYBER JINN](https://img.shields.io/badge/Status-Online-brightgreen)

## ✨ Features

### Visual Effects
- 🌧️ **Matrix Rain Background** - Animated falling characters with canvas rendering
- 📺 **Scanline CRT Effect** - Authentic retro monitor aesthetic
- ☀️ **Canvas Sunburst Animation** - Dynamic rotating rays around logo
- 💫 **Floating Particles** - Interactive particle system
- ✨ **Glassmorphism UI** - Modern frosted glass effects

### Functionality
- 🎵 **Background Music** - Auto-play with volume controls
- 🎨 **Theme Switcher** - Green/Red/Purple color schemes
- 📱 **Fully Responsive** - Works on all devices (320px to 4K+)
- 🍔 **Mobile Menu** - Smooth hamburger navigation
- ⌨️ **Keyboard Shortcuts** - Quick navigation (Ctrl+1-6, ESC)
- 🔗 **Social Links** - WhatsApp & YouTube integration

### Pages
1. **Home** - Central logo with sunburst animation
2. **Hacker Lab** - Interactive tool cards with terminal output
3. **Pics** - Gallery with hover effects
4. **Lore** - Character backstory
5. **Config** - Theme and effects settings
6. **Cyber Jinn Ser** - Profile and social links
7. **Execute** - System execution trigger

## 📁 Project Structure

```
cyber-jinn/
├── index.html              # Main HTML file
├── README.md               # Documentation
├── .gitignore             # Git ignore rules
├── .nojekyll              # GitHub Pages config
│
├── css/                   # Stylesheets
│   └── style.css          # Main CSS (~1800 lines)
│
├── js/                    # JavaScript
│   └── script.js          # Main JS (~700 lines)
│
└── assets/                # Media files
    ├── images/            # Image assets
    │   ├── profile.png    # Navigation logo
    │   ├── image.png      # Home page logo
    │   ├── 1.png          # Gallery image 1
    │   ├── 2.png          # Gallery image 2
    │   └── 3.png          # Gallery image 3
    │
    └── audio/             # Audio files
        └── music.mp3      # Background music
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/muhammedadnank/cyber-jinn.git
cd cyber-jinn
```

### 2. Run Local Server
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js
npx http-server
```

### 3. Open Browser
```
http://localhost:8000
```

## 🎯 Technologies

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, animations, glassmorphism
- **Vanilla JavaScript** - Class-based architecture
- **Canvas API** - Matrix rain & sunburst animations
- **Nosifer Font** - Horror/death metal typography
- **Share Tech Mono** - Monospace code font

## 🌟 No Dependencies

✅ No frameworks (React, Vue, Angular)  
✅ No CSS frameworks (Tailwind, Bootstrap)  
✅ No build tools required  
✅ Pure web standards  
✅ Works offline (after initial load)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + 1` | Home |
| `Ctrl/Cmd + 2` | Hacker Lab |
| `Ctrl/Cmd + 3` | Pics |
| `Ctrl/Cmd + 4` | Lore |
| `Ctrl/Cmd + 5` | Config |
| `Ctrl/Cmd + 6` | Cyber Jinn Ser |
| `ESC` | Return to Home |

## 🎨 Customization

### Change Theme Colors
Edit CSS custom properties in `css/style.css`:
```css
:root {
    --primary-color: #00ff00;      /* Main green color */
    --primary-dark: #003300;       /* Dark green */
    --primary-glow: rgba(0, 255, 0, 0.5);  /* Glow effect */
    /* ... */
}
```

### Add Custom Font
Update font import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

Then update in `css/style.css`:
```css
:root {
    --font-primary: 'YourFont', cursive;
}
```

### Modify Pages
1. Add section in `index.html`
2. Add navigation link
3. Update JavaScript Navigation class in `js/script.js`

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Safari | ✅ Full |
| Chrome Mobile | ✅ Full |

## 🎬 Features Showcase

### Matrix Rain
- 60 FPS canvas animation
- Customizable character set
- Adjustable speed and density
- Toggle on/off in Config

### Scanline Effect
- Authentic CRT monitor feel
- Smooth vertical animation
- Subtle opacity for realism

### Canvas Sunburst
- 60 rotating rays
- Theme-aware colors
- Smooth rotation
- Responsive sizing

## 🔧 Configuration

All effects can be toggled in the **Config** page:
- Particle Accelerator (floating particles)
- Rain Shader (Matrix rain)
- Theme colors (Green/Red/Purple)

## 📄 License

MIT License - Free to use for personal or commercial projects

## 👤 Author

**Muhammed Adnan**
- GitHub: [@muhammedadnank](https://github.com/muhammedadnank)

## 🙏 Credits

- **Design Inspiration**: The Matrix (1999)
- **Fonts**: Google Fonts (Nosifer, Share Tech Mono)
- **Icons**: Custom SVG icons
- **Developed by**: Muhammed Adnan

## 🎉 Version

**v2.0.3-STABLE**

---

<div align="center">

**Status**: 🟢 ONLINE

Made with 💚 by [Muhammed Adnan](https://github.com/muhammedadnank)

[⭐ Star this repo](https://github.com/muhammedadnank/cyber-jinn) if you like it!

</div>
