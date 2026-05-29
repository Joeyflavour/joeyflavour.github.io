// ============================================
//  JOEY FLAVOUR - PORTFOLIO JS
//  Working audio player + all interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ─── LOADER ─────────────────────────────────
    const loader = document.getElementById('loader');
    const hideLoader = () => loader.classList.add('done');
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
    setTimeout(hideLoader, 3500); // failsafe

    // ─── CURSOR GLOW ────────────────────────────
    const glow = document.getElementById('cursorGlow');
    if (glow && window.matchMedia('(hover:hover)').matches) {
        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    // ─── PARTICLES ──────────────────────────────
    const particleBox = document.getElementById('particles');
    if (particleBox) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
            p.style.animationDuration = (Math.random() * 12 + 12) + 's';
            p.style.animationDelay = (Math.random() * 12) + 's';
            particleBox.appendChild(p);
        }
    }

    // ─── NAVBAR ─────────────────────────────────
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);

        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    });

    // ─── MOBILE MENU ────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── SMOOTH SCROLL ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ─── ROTATING GLOW TEXT ─────────────────────
    const glowText = document.getElementById('glowText');
    const phrases = [
        'Electronic Bangers',
        'Future Bass Anthems',
        'Melodic Techno Rides',
        'Hard-Hitting Beats',
        'Dreamy Soundscapes',
        'Club Weapons'
    ];
    let phraseIdx = 0;

    if (glowText) {
        setInterval(() => {
            glowText.style.opacity = '0';
            glowText.style.transform = 'translateY(16px)';
            setTimeout(() => {
                phraseIdx = (phraseIdx + 1) % phrases.length;
                glowText.textContent = phrases[phraseIdx];
                glowText.style.opacity = '1';
                glowText.style.transform = 'translateY(0)';
            }, 350);
        }, 3200);
        glowText.style.transition = 'opacity .35s, transform .35s';
    }

    // ─── COUNTER ANIMATION ──────────────────────
    let countersRan = false;
    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersRan) {
                countersRan = true;
                document.querySelectorAll('.hero-stat-num').forEach(el => {
                    const target = +el.dataset.target;
                    const start = performance.now();
                    const dur = 2200;
                    (function tick(now) {
                        const p = Math.min((now - start) / dur, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        const val = Math.floor(ease * target);
                        if (target >= 1e6) el.textContent = (val / 1e6).toFixed(1) + 'M+';
                        else if (target >= 1e3) el.textContent = (val / 1e3).toFixed(0) + 'K+';
                        else el.textContent = val + '+';
                        if (p < 1) requestAnimationFrame(tick);
                    })(start);
                });
            }
        });
    }, { threshold: 0.3 });
    const hero = document.getElementById('home');
    if (hero) statObserver.observe(hero);

    // ─── DEMO FILTER ────────────────────────────
    const filterPills = document.querySelectorAll('.filter-pill');
    const demoCards = document.querySelectorAll('.demo-card');

    filterPills.forEach(btn => {
        btn.addEventListener('click', () => {
            filterPills.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            demoCards.forEach((card, i) => {
                const show = f === 'all' || card.dataset.category === f;
                card.classList.toggle('hidden', !show);
                if (show) {
                    card.style.animation = 'none';
                    card.offsetHeight; // reflow
                    card.style.animation = `fadeUp .5s ${i * .08}s var(--ease) both`;
                }
            });
        });
    });

    // ─── COUNTDOWN ──────────────────────────────
    function tickCountdown() {
        document.querySelectorAll('.countdown').forEach(cd => {
            const target = new Date(cd.dataset.date).getTime();
            const diff = Math.max(target - Date.now(), 0);
            const d = Math.floor(diff / 864e5);
            const h = Math.floor((diff % 864e5) / 36e5);
            const m = Math.floor((diff % 36e5) / 6e4);
            const s = Math.floor((diff % 6e4) / 1e3);
            cd.querySelector('[data-unit="days"]').textContent = String(d).padStart(2, '0');
            cd.querySelector('[data-unit="hours"]').textContent = String(h).padStart(2, '0');
            cd.querySelector('[data-unit="mins"]').textContent = String(m).padStart(2, '0');
            cd.querySelector('[data-unit="secs"]').textContent = String(s).padStart(2, '0');
        });
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);

    // ─── SCROLL REVEAL ──────────────────────────
    const revealItems = document.querySelectorAll(
        '.section-header, .featured-release, .demo-card, .release-card, ' +
        '.about-visual, .about-info, .contact-info-card, .contact-form'
    );
    revealItems.forEach(el => el.classList.add('reveal-el'));

    const revealObs = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 60);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(el => revealObs.observe(el));

    // ─── PARALLAX HERO ──────────────────────────
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (heroContent && window.scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${window.scrollY * 0.25}px)`;
            heroContent.style.opacity = 1 - window.scrollY / window.innerHeight;
        }
    });

    // ─── WAVEFORM CANVASES ──────────────────────
    document.querySelectorAll('.demo-waveform-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const bars = 60;
        const barW = w / bars - 1;
        const heights = Array.from({ length: bars }, () => Math.random() * 0.7 + 0.15);

        function draw(highlight = -1) {
            ctx.clearRect(0, 0, w, h);
            heights.forEach((val, i) => {
                const x = i * (barW + 1);
                const bh = val * h;
                const y = (h - bh) / 2;
                ctx.fillStyle = i <= highlight
                    ? '#7c3aed'
                    : 'rgba(124,58,237,0.25)';
                ctx.beginPath();
                ctx.roundRect(x, y, barW, bh, 1);
                ctx.fill();
            });
        }
        draw();

        // Hover animation
        const card = canvas.closest('.demo-card');
        if (card) {
            let animFrame;
            card.addEventListener('mouseenter', () => {
                let idx = 0;
                (function anim() {
                    draw(idx);
                    idx++;
                    if (idx <= bars) animFrame = requestAnimationFrame(anim);
                })();
            });
            card.addEventListener('mouseleave', () => {
                cancelAnimationFrame(animFrame);
                draw(-1);
            });
        }
    });

    // ============================================
    //  AUDIO PLAYER — FULLY WORKING
    // ============================================
    const audio = document.getElementById('audioElement');
    const playerBar = document.getElementById('audioPlayerBar');
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const progressBar = document.getElementById('playerProgressBar');
    const progressFill = document.getElementById('playerProgressFill');
    const progressThumb = document.getElementById('playerProgressThumb');
    const currentTimeEl = document.getElementById('playerCurrentTime');
    const durationEl = document.getElementById('playerDuration');
    const volumeBar = document.getElementById('playerVolumeBar');
    const volumeFill = document.getElementById('playerVolumeFill');
    const volumeIcon = document.getElementById('volumeIcon');

    let playlist = [];
    let currentIdx = -1;

    // Collect all playable buttons
    const allPlayBtns = document.querySelectorAll(
        '.play-circle[data-src], .demo-play-btn[data-src], .release-play-btn[data-src]'
    );

    allPlayBtns.forEach((btn, idx) => {
        playlist.push({
            src: btn.dataset.src,
            title: btn.dataset.title || 'Unknown',
            artist: btn.dataset.artist || 'Joey Flavour'
        });
        btn.addEventListener('click', e => {
            e.preventDefault();
            loadTrack(idx);
        });
    });

    function loadTrack(idx) {
        if (idx < 0 || idx >= playlist.length) return;
        currentIdx = idx;
        const track = playlist[idx];
        audio.src = track.src;
        playerTitle.textContent = track.title;
        playerArtist.textContent = track.artist;
        playerBar.classList.add('visible');
        audio.play();
        playPauseIcon.className = 'fas fa-pause';
    }

    // Play/Pause
    document.getElementById('playerPlayPause').addEventListener('click', () => {
        if (!audio.src) return;
        if (audio.paused) {
            audio.play();
            playPauseIcon.className = 'fas fa-pause';
        } else {
            audio.pause();
            playPauseIcon.className = 'fas fa-play';
        }
    });

    // Prev / Next
    document.getElementById('playerPrev').addEventListener('click', () => {
        if (currentIdx > 0) loadTrack(currentIdx - 1);
    });
    document.getElementById('playerNext').addEventListener('click', () => {
        if (currentIdx < playlist.length - 1) loadTrack(currentIdx + 1);
    });

    // Progress update
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
        progressThumb.style.left = pct + '%';
        currentTimeEl.textContent = fmtTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = fmtTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        if (currentIdx < playlist.length - 1) {
            loadTrack(currentIdx + 1);
        } else {
            playPauseIcon.className = 'fas fa-play';
        }
    });

    // Seek
    progressBar.addEventListener('click', e => {
        if (!audio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    });

    // Volume
    audio.volume = 0.8;
    volumeBar.addEventListener('click', e => {
        const rect = volumeBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.volume = pct;
        volumeFill.style.width = (pct * 100) + '%';
        volumeIcon.className = pct === 0 ? 'fas fa-volume-mute' :
            pct < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    });

    document.getElementById('playerMute').addEventListener('click', () => {
        audio.muted = !audio.muted;
        volumeIcon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        volumeFill.style.width = audio.muted ? '0%' : (audio.volume * 100) + '%';
    });

    function fmtTime(sec) {
        if (!sec || isNaN(sec)) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return m + ':' + String(s).padStart(2, '0');
    }

    // ─── CONTACT FORM ───────────────────────────
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Sending...</span>';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1800);
        });
    }

}); // end DOMContentLoaded
