// ===================== DATA =====================
const girlsList = [
    { name: "Nguyễn Thùy Duyên", emoji: "🌸" },
    { name: "Nguyễn Ngọc Hân", emoji: "🌺" },
    { name: "Trần Thái Khánh Huyền", emoji: "🌷" },
    { name: "Lê Thị My", emoji: "🌹" },
    { name: "Mai Đỗ Hà My", emoji: "🌻" },
    { name: "Trần Mai Diễm My", emoji: "🌼" },
    { name: "Trần Nguyễn Ái My", emoji: "💮" },
    { name: "Lê Thúy Nga", emoji: "🏵️" },
    { name: "Nguyễn Lê Gia Ngân", emoji: "💐" },
    { name: "Lê Bảo Ngọc", emoji: "🌸" },
    { name: "Đỗ Nguyễn Uyển Nhã", emoji: "🌺" },
    { name: "Đinh Đặng Quỳnh Như", emoji: "🌷" },
    { name: "Huỳnh Thị Nhật Quyên", emoji: "🌹" },
    { name: "Trà Thị Thảo Quyên", emoji: "🌻" },
    { name: "Trịnh Thị Thu Thảo", emoji: "🌼" },
    { name: "Hà Thị Thương", emoji: "💮" },
    { name: "Đào Thanh Nhã Trang", emoji: "🏵️" },
    { name: "Huỳnh Thị Thanh Trúc", emoji: "💐" },
    { name: "Hà Nguyễn Tường Vi", emoji: "🌸" },
];

const wishes = [
    "Luôn xinh đẹp rạng rỡ nhé! ✨",
    "Chúc bạn mãi hạnh phúc! 💕",
    "Tỏa sáng như ngôi sao! 🌟",
    "Xinh đẹp và tài giỏi! 💖",
    "Luôn yêu đời và tươi trẻ! 🌸",
    "Vui vẻ và thành công! 🎉",
    "Nụ cười đẹp nhất lớp! 😊",
    "Luôn tự tin tỏa sáng! 💪",
    "Rạng rỡ như mặt trời! ☀️",
    "Tuyệt vời và đáng yêu! 🌈",
    "Luôn là niềm tự hào! 🏆",
    "Mãi dịu dàng, mãi xinh! 🥰",
    "Đẹp cả ngoài lẫn trong! 💎",
    "Nụ cười ấm áp nhất! 🌞",
    "Luôn thật vui và khỏe! 🌻",
    "Ngày nào cũng tươi tắn! 🌼",
    "Thật duyên dáng và tài năng! 🌹",
    "Luôn được yêu thương! 💝",
    "Mãi là bông hoa đẹp nhất! 🌷",
];

const flowerEmojis = ["🌸", "🌺", "🌷", "🌹", "🌻", "🌼", "💐", "🏵️", "💮", "🪻", "🪷"];
const CORRECT_PASSWORD = 'a8isthebest';

// ===================== SOUND EFFECTS (Web Audio API) =====================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) audioCtx = new AudioCtx();
}

function playTone(freq, duration, type, vol) {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function sfxChime() {
    // Magical chime: ascending notes
    [523, 659, 784, 1047].forEach((f, i) => {
        setTimeout(() => playTone(f, 0.5, 'sine', 0.12), i * 120);
    });
}

function sfxEnvelopeOpen() {
    // Paper unfold + sparkle
    playTone(300, 0.15, 'triangle', 0.1);
    setTimeout(() => playTone(500, 0.2, 'sine', 0.08), 100);
    setTimeout(() => playTone(800, 0.3, 'sine', 0.1), 200);
    setTimeout(() => playTone(1200, 0.4, 'sine', 0.06), 350);
}

function sfxWhoosh() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.4);
}

function sfxClick() {
    playTone(800, 0.08, 'sine', 0.06);
    setTimeout(() => playTone(1000, 0.06, 'sine', 0.04), 40);
}

function sfxConfetti() {
    [1047, 1319, 1568, 2093].forEach((f, i) => {
        setTimeout(() => playTone(f, 0.3, 'sine', 0.06), i * 80);
    });
}

// ===================== LOGIN =====================
function createLoginHearts() {
    const c = document.getElementById('loginParticles');
    const emojis = ['💕', '💖', '💗', '💝', '🌸', '🌺', '🌷', '✨', '💐', '🌹'];
    for (let i = 0; i < 25; i++) {
        const h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.top = Math.random() * 100 + '%';
        h.style.fontSize = (Math.random() * 18 + 12) + 'px';
        h.style.animationDuration = (Math.random() * 8 + 6) + 's';
        h.style.animationDelay = (Math.random() * 5) + 's';
        c.appendChild(h);
    }
}

function attemptLogin() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('loginError');
    if (input.value === CORRECT_PASSWORD) {
        error.classList.remove('show');
        sfxChime();
        document.getElementById('login-page').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('login-page').style.display = 'none';
            startCinematicIntro();
        }, 800);
    } else {
        error.classList.add('show');
        input.value = '';
        input.focus();
        setTimeout(() => error.classList.remove('show'), 3000);
    }
}

document.getElementById('passwordInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') attemptLogin();
});

// ===================== CINEMATIC INTRO =====================
function startCinematicIntro() {
    const intro = document.getElementById('cinematic-intro');
    intro.classList.add('show');
    startFireworks();

    // Envelope: wait for user click/tap to open
    const envelope = document.getElementById('envelope');
    const hint = document.getElementById('envelopeHint');
    function openEnvelope() {
        if (envelope.classList.contains('open')) return;
        envelope.classList.add('open');
        if (hint) hint.classList.add('hidden');
        envelope.removeEventListener('click', openEnvelope);
        sfxEnvelopeOpen();

        // After envelope opens, chain the rest
        setTimeout(() => {
            document.getElementById('bigDate').classList.add('reveal');
            burstConfetti(80);
            sfxConfetti();
        }, 1000);

        setTimeout(() => {
            document.getElementById('introSub').classList.add('reveal');
        }, 2000);

        setTimeout(() => {
            const tw = document.getElementById('typewriterText');
            tw.classList.add('show');
            typeWriter(tw, 'Gửi đến những bông hoa đẹp nhất lớp H8...', 0, 50);
        }, 3000);

        setTimeout(() => {
            document.getElementById('enterBtn').classList.add('show');
        }, 5500);
    }
    envelope.addEventListener('click', openEnvelope);
}

function typeWriter(el, text, i, speed) {
    if (i < text.length) {
        el.textContent += text.charAt(i);
        setTimeout(() => typeWriter(el, text, i + 1, speed), speed);
    }
}

let storyTypeoutTimeout = null;

function runStorySequence() {
    const screen = document.getElementById('story-screen');
    const container = document.getElementById('storyScreenText');
    const skipBtn = document.getElementById('skipStoryBtn');
    screen.classList.add('show');
    container.innerHTML = '';
    skipBtn.classList.remove('show');
    
    playTone(200, 3, 'sine', 0.1);

    const lines = [
        "Ngày 8/3/1908, cuộc đấu tranh của nữ công nhân New York đã mở ra chương mới cho phái đẹp...",
        "Trải qua lịch sử, 8/3 là ngày để thế giới ngả mũ trân trọng một nửa nhân loại.",
        "Và tại tập thể lớp H8 của chúng mình...",
        "Xin gửi lời tri ân sâu sắc tới cô giáo Nguyễn Thị Ngọc Dung.",
        "Cùng 19 bông hoa rực rỡ, xinh đẹp nhất của lớp!",
        "Hãy cùng xem những lời chúc ngọt ngào nhất nhé... 🌸"
    ];

    let currentLine = 0;
    setTimeout(() => skipBtn.classList.add('show'), 3000);

    function typeLine() {
        if (currentLine >= lines.length) {
            setTimeout(finishStoryScreen, 1500);
            return;
        }
        
        container.innerHTML = "";
        const text = lines[currentLine];
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                container.innerHTML += text.charAt(charIndex);
                charIndex++;
                storyTypeoutTimeout = setTimeout(typeChar, 45);
            } else {
                currentLine++;
                storyTypeoutTimeout = setTimeout(typeLine, 2500);
            }
        }
        typeChar();
    }
    
    typeLine();
}

function finishStoryScreen() {
    clearTimeout(storyTypeoutTimeout);
    const screen = document.getElementById('story-screen');
    screen.style.transition = 'opacity 1s ease';
    screen.style.opacity = '0';
    
    setTimeout(() => {
        screen.classList.remove('show');
        screen.style.opacity = '';
        document.getElementById('storyScreenText').innerHTML = '';
        
        document.getElementById('main-page').classList.add('show');
        document.getElementById('musicBtn').style.display = 'flex';
        renderGirls();
        startPetalAnimation();
        startCursorTrail();
        startCountdown();
        burstConfetti(50);
        showFloatingWish();
        sfxWhoosh();
    }, 1000);
}

function enterMainPage() {
    const intro = document.getElementById('cinematic-intro');
    intro.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    intro.style.opacity = '0';
    intro.style.transform = 'scale(1.1)';
    sfxWhoosh();

    setTimeout(() => {
        intro.classList.remove('show');
        intro.style.display = 'none';
        
        runStorySequence();
    }, 800);
}

// ===================== FIREWORKS =====================
const fwCanvas = document.getElementById('fireworksCanvas');
const fwCtx = fwCanvas.getContext('2d');
let fireworks = [], particles = [], fwRunning = false;

function resizeFw() { fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }

class Firework {
    constructor() {
        this.x = Math.random() * fwCanvas.width;
        this.y = fwCanvas.height;
        this.targetY = Math.random() * fwCanvas.height * 0.4 + 50;
        this.speed = Math.random() * 3 + 4;
        this.color = `hsl(${Math.random() * 60 + 320}, 100%, 70%)`;
        this.alive = true;
        this.trail = [];
    }
    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift();
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.alive = false;
            this.explode();
        }
    }
    explode() {
        const count = Math.random() * 40 + 30;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const speed = Math.random() * 4 + 1;
            particles.push({
                x: this.x, y: this.y,
                vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                life: 1, decay: Math.random() * 0.02 + 0.01,
                color: `hsl(${Math.random() * 60 + 320}, 100%, ${Math.random() * 30 + 60}%)`,
                size: Math.random() * 3 + 1,
            });
        }
    }
    draw() {
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        fwCtx.fillStyle = this.color;
        fwCtx.fill();
        this.trail.forEach((t, i) => {
            fwCtx.beginPath();
            fwCtx.arc(t.x, t.y, 1, 0, Math.PI * 2);
            fwCtx.fillStyle = this.color;
            fwCtx.globalAlpha = i / this.trail.length * 0.5;
            fwCtx.fill();
            fwCtx.globalAlpha = 1;
        });
    }
}

function startFireworks() {
    fwRunning = true;
    resizeFw();
    let lastLaunch = 0;
    function loop(ts) {
        if (!fwRunning) return;
        fwCtx.fillStyle = 'rgba(10, 6, 18, 0.15)';
        fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
        if (ts - lastLaunch > 400 + Math.random() * 600) {
            fireworks.push(new Firework());
            lastLaunch = ts;
        }
        fireworks = fireworks.filter(f => { f.update(); f.draw(); return f.alive; });
        particles = particles.filter(p => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= p.decay;
            fwCtx.beginPath(); fwCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            fwCtx.fillStyle = p.color; fwCtx.globalAlpha = p.life;
            fwCtx.fill(); fwCtx.globalAlpha = 1;
            return p.life > 0;
        });
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

// ===================== CONFETTI BURST =====================
function burstConfetti(count) {
    const colors = ['#f48fb1', '#ec407a', '#ffd54f', '#ce93d8', '#ff80ab', '#e1bee7', '#fff', '#ba68c8'];
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = (Math.random() * 100) + 'vw';
        c.style.top = '-10px';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.width = (Math.random() * 8 + 4) + 'px';
        c.style.height = (Math.random() * 8 + 4) + 'px';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        c.style.animationDelay = (Math.random() * 0.8) + 's';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

// ===================== RENDER GIRLS =====================
function renderGirls() {
    const grid = document.getElementById('girlsGrid');
    grid.innerHTML = '';
    girlsList.forEach((girl, i) => {
        const card = document.createElement('div');
        card.className = 'girl-card';
        card.style.animationDelay = `${i * 0.07}s`;
        const rf = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        card.innerHTML = `
            <span class="flower-emoji">${rf}</span>
            <div class="girl-avatar">${girl.emoji}</div>
            <h3>${girl.name}</h3>
            <p class="girl-wish">${wishes[i % wishes.length]}</p>
        `;
        grid.appendChild(card);
    });
}

// ===================== TAB SWITCHING =====================
function switchTab(tabName) {
    sfxClick();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.querySelector('.content-area').scrollTop = 0;
}

// ===================== LOGOUT =====================
function logout() {
    if (musicPlaying && bgMusic) {
        bgMusic.pause();
        musicPlaying = false;
        const btn = document.getElementById('musicBtn');
        if (btn) {
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
    
    document.getElementById('main-page').classList.remove('show');
    document.getElementById('musicBtn').style.display = 'none';
    document.getElementById('login-page').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('passwordInput').value = '';
        // Reset cinematic for re-login
        const intro = document.getElementById('cinematic-intro');
        intro.style.opacity = ''; intro.style.transform = ''; intro.style.display = '';
        document.getElementById('envelope').classList.remove('open');
        document.getElementById('bigDate').classList.remove('reveal');
        document.getElementById('introSub').classList.remove('reveal');
        const tw = document.getElementById('typewriterText');
        tw.classList.remove('show'); tw.textContent = '';
        document.getElementById('enterBtn').classList.remove('show');
        
        const storyScreen = document.getElementById('story-screen');
        storyScreen.classList.remove('show');
        storyScreen.style.opacity = '';
        document.getElementById('skipStoryBtn').classList.remove('show');    
    }, 50);
}

// ===================== FLOATING WISH NOTIFICATION =====================
function showFloatingWish() {
    const msgs = [
        '🌸 Lớp A8 chúc bạn một ngày 8/3 rực rỡ! 🌸',
        '💐 Happy Women\'s Day! Luôn xinh đẹp nhé! 💐',
        '🌷 Chúc các bạn nữ luôn hạnh phúc! 🌷',
    ];
    const el = document.createElement('div');
    el.className = 'floating-wish';
    el.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
}

// ===================== PETAL ANIMATION =====================
const petalCanvas = document.getElementById('petalCanvas');
const pCtx = petalCanvas.getContext('2d');
let petals = [], petalRunning = false;

function resizePetal() { petalCanvas.width = window.innerWidth; petalCanvas.height = window.innerHeight; }

class Petal {
    constructor(randomY) {
        this.x = Math.random() * petalCanvas.width;
        this.y = randomY ? Math.random() * petalCanvas.height : -20;
        this.size = Math.random() * 10 + 6;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = Math.random() * 0.03 - 0.015;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.wobble = Math.random() * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.008;
        const colors = ['#f48fb1','#f06292','#ec407a','#e91e63','#ce93d8','#ba68c8','#ffb3c1','#ff8fab','#ffc2d1','#ffafcc'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.4;
        this.wobble += this.wobbleSpeed;
        this.rot += this.rotSpeed;
        if (this.y > petalCanvas.height + 20) { this.y = -20; this.x = Math.random() * petalCanvas.width; }
    }
    draw() {
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(this.rot);
        pCtx.globalAlpha = this.opacity;
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        pCtx.moveTo(0, 0);
        pCtx.bezierCurveTo(this.size/2, -this.size, this.size, -this.size/2, 0, this.size);
        pCtx.bezierCurveTo(-this.size, -this.size/2, -this.size/2, -this.size, 0, 0);
        pCtx.fill();
        pCtx.restore();
    }
}

function startPetalAnimation() {
    if (petalRunning) return;
    petalRunning = true;
    resizePetal();
    for (let i = 0; i < 35; i++) petals.push(new Petal(true));
    (function loop() {
        pCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    })();
}

// ===================== CURSOR TRAIL =====================
function startCursorTrail() {
    const trailEmojis = ['💖', '✨', '🌸', '💕', '🌷'];
    let throttle = 0;
    document.addEventListener('mousemove', e => {
        if (Date.now() - throttle < 60) return;
        throttle = Date.now();
        const t = document.createElement('div');
        t.className = 'cursor-trail';
        t.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
        t.style.left = (e.clientX - 7) + 'px';
        t.style.top = (e.clientY - 7) + 'px';
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 800);
    });
}

// ===================== SPARKLE ON CLICK =====================
document.addEventListener('click', e => {
    const colors = ['#f48fb1', '#ffd54f', '#ce93d8', '#ff80ab', '#e1bee7'];
    for (let i = 0; i < 8; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        s.style.left = (e.clientX + (Math.random() - 0.5) * 50) + 'px';
        s.style.top = (e.clientY + (Math.random() - 0.5) * 50) + 'px';
        const sz = (Math.random() * 7 + 3) + 'px';
        s.style.width = sz; s.style.height = sz;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
    }
});

// ===================== COUNTDOWN TO 8/3 =====================
function startCountdown() {
    const el = document.getElementById('countdownBar');
    if (!el) return;
    function update() {
        const now = new Date();
        const isToday8th = now.getMonth() === 2 && now.getDate() === 8;
        
        let target = new Date(now.getFullYear(), 2, 8); // March 8
        if (now > target && !isToday8th) {
            target = new Date(now.getFullYear() + 1, 2, 8);
        }
        
        const diff = target - now;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        if (isToday8th) {
            el.innerHTML = '<div style="color:var(--gold);font-size:20px;font-weight:700;">🎉 Hôm nay là ngày 8/3! 🎉</div>';
        } else {
            el.innerHTML = `
                <div class="countdown-item"><span class="num">${d}</span><span class="lbl">Ngày</span></div>
                <div class="countdown-item"><span class="num">${String(h).padStart(2,'0')}</span><span class="lbl">Giờ</span></div>
                <div class="countdown-item"><span class="num">${String(m).padStart(2,'0')}</span><span class="lbl">Phút</span></div>
                <div class="countdown-item"><span class="num">${String(s).padStart(2,'0')}</span><span class="lbl">Giây</span></div>
            `;
        }
    }
    update();
    setInterval(update, 1000);
}

// ===================== MUSIC =====================
let bgMusic = null, musicPlaying = false;

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (!bgMusic) {
        bgMusic = new Audio('1.mp3');
        bgMusic.loop = true; bgMusic.volume = 0.3;
        bgMusic.play().then(() => { musicPlaying = true; btn.classList.add('playing'); btn.innerHTML = '<i class="fas fa-music"></i>'; }).catch(() => {});
    }
    if (musicPlaying) {
        bgMusic.pause(); musicPlaying = false;
        btn.classList.remove('playing');
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true; btn.classList.add('playing');
            btn.innerHTML = '<i class="fas fa-music"></i>';
        }).catch(() => alert('Trình duyệt chặn phát nhạc. Thử lại!'));
    }
}

// ===================== THEME TOGGLE =====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    sfxClick();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    if (theme === 'light') {
        btn.innerHTML = '<i class="fas fa-moon"></i> Giao Diện';
    } else {
        btn.innerHTML = '<i class="fas fa-sun"></i> Giao Diện';
    }
}

// ===================== RESIZE =====================
window.addEventListener('resize', () => { resizePetal(); resizeFw(); });

// ===================== INIT =====================
initTheme();
createLoginHearts();
document.getElementById('passwordInput').focus();
