// ========================================
// CYBER JINN - Matrix Theme JavaScript
// ========================================

// Global State
const state = {
    currentTheme: 'green',
    particlesEnabled: true,
    rainEnabled: true
};

// ========================================
// MATRIX RAIN ANIMATION
// ========================================
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.animationId = null;

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Get current theme color
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();

        this.ctx.fillStyle = color;
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            // Reset drop randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }

    animate() {
        if (state.rainEnabled) {
            this.draw();
        }
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ========================================
// FLOATING PARTICLES
// ========================================
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.particleCount = 50;

        this.init();
    }

    init() {
        this.container.innerHTML = '';
        this.particles = [];

        if (!state.particlesEnabled) return;

        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    toggle(enabled) {
        state.particlesEnabled = enabled;
        if (enabled) {
            this.init();
        } else {
            this.container.innerHTML = '';
            this.particles = [];
        }
    }
}

// ========================================
// LOADING SCREEN
// ========================================
class LoadingScreen {
    constructor() {
        this.screen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        this.screen.addEventListener('click', () => this.hide());

        // Auto-hide after 3 seconds if not clicked
        setTimeout(() => {
            if (this.screen.classList.contains('active')) {
                this.hide();
            }
        }, 3000);
    }

    hide() {
        this.screen.classList.remove('active');
        setTimeout(() => {
            this.screen.style.display = 'none';
        }, 500);
    }
}

// ========================================
// MUSIC PLAYER
// ========================================
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('bg-music');
        this.toggleBtn = document.getElementById('music-toggle');
        this.playIcon = document.getElementById('music-icon-play');
        this.pauseIcon = document.getElementById('music-icon-pause');
        this.volumeControl = document.getElementById('volume-control');
        this.volumeSlider = document.getElementById('volume-slider');
        this.isPlaying = false;

        this.init();
    }

    init() {
        if (!this.audio) return;

        // Set initial volume
        this.audio.volume = 0.5;

        // Toggle play/pause
        this.toggleBtn.addEventListener('click', () => {
            this.togglePlay();
        });

        // Show volume control on hover
        const musicControl = document.getElementById('music-control');
        musicControl.addEventListener('mouseenter', () => {
            this.volumeControl.classList.remove('hidden');
        });

        musicControl.addEventListener('mouseleave', () => {
            this.volumeControl.classList.add('hidden');
        });

        // Volume slider
        this.volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.audio.volume = volume;
            // Update CSS variable for visual feedback
            this.volumeSlider.style.setProperty('--volume-percent', e.target.value + '%');
        });

        // Auto-play when page loads (after brief delay for user interaction)
        setTimeout(() => {
            this.play();
        }, 500);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playIcon.classList.add('hidden');
            this.pauseIcon.classList.remove('hidden');
            this.toggleBtn.classList.add('playing');
        }).catch(err => {
            console.log('Audio play failed:', err);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playIcon.classList.remove('hidden');
        this.pauseIcon.classList.add('hidden');
        this.toggleBtn.classList.remove('playing');
    }
}

// ========================================
// NAVIGATION SYSTEM
// ========================================
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');

        this.init();
    }

    init() {
        // Desktop/Mobile navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                this.navigateTo(pageId);

                // Close mobile menu on link click
                this.closeMobileMenu();
            });
        });

        // Mobile menu toggle
        if (this.mobileMenuToggle && this.navMenu) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.navMenu.classList.contains('active') &&
                    !this.navMenu.contains(e.target) &&
                    !this.mobileMenuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }

        // Handle hash navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.navigateTo(hash);
            }
        });

        // Check initial hash
        const initialHash = window.location.hash.slice(1);
        if (initialHash) {
            this.navigateTo(initialHash);
        }
    }

    toggleMobileMenu() {
        this.mobileMenuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        if (this.mobileMenuToggle && this.navMenu) {
            this.mobileMenuToggle.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateTo(pageId) {
        // Update active states
        this.navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show/hide pages
        this.pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Update URL hash
        window.location.hash = pageId;

        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========================================
// THEME SYSTEM
// ========================================
class ThemeManager {
    constructor() {
        this.colorButtons = document.querySelectorAll('.color-btn');
        this.init();
    }

    init() {
        this.colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
    }

    setTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-green', 'theme-red', 'theme-purple');

        // Add new theme class
        if (theme !== 'green') {
            document.body.classList.add(`theme-${theme}`);
        }

        // Update active button
        this.colorButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        state.currentTheme = theme;
    }
}

// ========================================
// CONFIG TOGGLES
// ========================================
class ConfigManager {
    constructor() {
        this.particlesToggle = document.getElementById('particles-toggle');
        this.rainToggle = document.getElementById('rain-toggle');

        this.init();
    }

    init() {
        if (this.particlesToggle) {
            this.particlesToggle.addEventListener('change', (e) => {
                window.particleSystem.toggle(e.target.checked);
            });
        }

        if (this.rainToggle) {
            this.rainToggle.addEventListener('change', (e) => {
                state.rainEnabled = e.target.checked;
                if (!e.target.checked) {
                    const canvas = document.getElementById('matrix-canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            });
        }
    }
}

// ========================================
// TOOL CARDS INTERACTION
// ========================================
class ToolCards {
    constructor() {
        this.cards = document.querySelectorAll('.tool-card');
        this.terminalBody = document.querySelector('.terminal-body');

        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const tool = card.getAttribute('data-tool');
                this.executeTool(tool);
            });
        });
    }

    executeTool(tool) {
        if (!this.terminalBody) return;

        const outputs = {
            terminal: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">access mainframe</span>',
                '<p class="output">Establishing secure connection...</p>',
                '<p class="output">Authentication: SUCCESS</p>',
                '<p class="output">Access granted to mainframe</p>'
            ],
            hashgen: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">hashgen --algo sha256</span>',
                '<p class="output">Generating hash...</p>',
                '<p class="output">SHA-256: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8</p>',
                '<p class="output">Hash generation complete</p>'
            ],
            netmon: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">netmon --sniff</span>',
                '<p class="output">Starting packet sniffer...</p>',
                '<p class="output">Capturing packets on interface eth0</p>',
                '<p class="output">192.168.1.1 -> 192.168.1.100 [TCP]</p>'
            ],
            qrcode: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">qrgen --data "CYBER JINN"</span>',
                '<p class="output">Encoding data to QR code...</p>',
                '<p class="output">QR code generated successfully</p>',
                '<p class="output">Saved to: /tmp/qrcode.png</p>'
            ],
            ipinfo: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">ipinfo --lookup</span>',
                '<p class="output">Fetching IP information...</p>',
                '<p class="output">IP: 203.0.113.42</p>',
                '<p class="output">Location: Mumbai, India</p>'
            ],
            wificrack: [
                '<span class="prompt">root@cyberjinn:~$</span> <span class="command">wificrack --target AP_5G</span>',
                '<p class="output">Initiating WPA2 decryption...</p>',
                '<p class="output">Capturing handshake packets...</p>',
                '<p class="output">Decryption in progress...</p>'
            ]
        };

        const output = outputs[tool] || outputs.terminal;

        this.terminalBody.innerHTML = output.join('\n') + '\n<p class="cursor">_</p>';
    }
}

// ========================================
// ANIME CARDS INTERACTION
// ========================================
class AnimeCards {
    constructor() {
        this.cards = document.querySelectorAll('.anime-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-10px) scale(1.05) rotateY(10deg)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            });
        });
    }
}

// ========================================
// EXECUTE BUTTON
// ========================================
class ExecuteButton {
    constructor() {
        this.executeBtn = document.querySelector('.execute-btn');
        this.init();
    }

    init() {
        if (this.executeBtn) {
            this.executeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.execute();
            });
        }
    }

    execute() {
        // Create flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0.5';
        }, 10);

        setTimeout(() => {
            flash.style.opacity = '0';
        }, 200);

        setTimeout(() => {
            flash.remove();
        }, 500);

        // Show alert
        setTimeout(() => {
            alert('SYSTEM EXECUTED\\n\\nAll protocols initialized.\\nMatrix connection established.\\n\\nCYBER JINN is online.');
        }, 300);
    }
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Number keys for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const pages = ['home', 'hacker-lab', 'anime', 'lore', 'config', 'soulkid'];
                const index = parseInt(e.key) - 1;
                if (pages[index]) {
                    window.navigation.navigateTo(pages[index]);
                }
            }

            // Escape key to go home
            if (e.key === 'Escape') {
                window.navigation.navigateTo('home');
            }
        });
    }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    window.matrixRain = new MatrixRain();
    window.particleSystem = new ParticleSystem();
    window.loadingScreen = new LoadingScreen();
    window.musicPlayer = new MusicPlayer();
    window.navigation = new Navigation();
    window.themeManager = new ThemeManager();
    window.configManager = new ConfigManager();
    window.toolCards = new ToolCards();
    window.animeCards = new AnimeCards();
    window.executeButton = new ExecuteButton();
    window.keyboardShortcuts = new KeyboardShortcuts();

    console.log('%c CYBER JINN SYSTEM ONLINE ', 'background: #00ff00; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Matrix connection established ', 'background: #003300; color: #00ff00; font-size: 14px; padding: 5px;');
    console.log('%c Keyboard Shortcuts: Ctrl+1-6 for quick navigation, ESC for home ', 'color: #00ff00; font-size: 12px;');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Reduce particle count on mobile
if (window.innerWidth < 768) {
    window.addEventListener('DOMContentLoaded', () => {
        if (window.particleSystem) {
            window.particleSystem.particleCount = 20;
            window.particleSystem.init();
        }
    });
}

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        state.rainEnabled = false;
    } else {
        const rainToggle = document.getElementById('rain-toggle');
        if (rainToggle && rainToggle.checked) {
            state.rainEnabled = true;
        }
    }
});

// ========================================
// CANVAS SUNBURST ANIMATION
// ========================================
class CanvasSunburst {
    constructor() {
        this.canvas = document.getElementById('sunburst-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.rotation = 0;
        this.rays = 60;
        this.animationId = null;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.6;
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = size / 2;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();
        
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);
        
        for (let i = 0; i < this.rays; i++) {
            const angle = (Math.PI * 2 / this.rays) * i;
            const gradient = this.ctx.createLinearGradient(
                0, 0,
                Math.cos(angle) * this.radius,
                Math.sin(angle) * this.radius
            );
            
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.5, color.replace(')', ', 0.1)').replace('rgb', 'rgba'));
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(
                Math.cos(angle) * this.radius,
                Math.sin(angle) * this.radius
            );
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    animate() {
        this.draw();
        this.rotation += 0.002;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize canvas sunburst
document.addEventListener('DOMContentLoaded', () => {
    window.canvasSunburst = new CanvasSunburst();
});
