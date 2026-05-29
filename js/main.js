// ============================================
//  JOEY FLAVOUR — COMPLETE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ─── LOADER ──────────────────────────────────
    const loader = document.getElementById('loader');
    const hideLoader = () => loader?.classList.add('done');
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
    setTimeout(hideLoader, 3500);

    // ─── PARTICLES ───────────────────────────────
    const particleBox = document.getElementById('particles');
    if (particleBox) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `
                left:${Math.random() * 100}%;
                width:${Math.random() * 3 + 1}px;
                height:${Math.random() * 3 + 1}px;
                animation-duration:${Math.random() * 12 + 12}s;
                animation-delay:${Math.random() * 12}s;
            `;
            particleBox.appendChild(p);
        }
    }

    // ─── ANNOUNCEMENT BANNER ─────────────────────
    const announceBanner = document.getElementById('announceBanner');
    const announceBannerClose = document.getElementById('announceBannerClose');
    if (announceBanner) {
        if (!sessionStorage.getItem('bannerDismissed')) {
            document.body.classList.add('banner-visible');
        } else {
            announceBanner.classList.add('hidden');
        }
        announceBannerClose?.addEventListener('click', () => {
            announceBanner.classList.add('hidden');
            document.body.classList.remove('banner-visible');
            sessionStorage.setItem('bannerDismissed', 'true');
        });
    }

    // ─── NAVBAR ──────────────────────────────────
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
    }, { passive: true });

    // ─── MOBILE MENU ─────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu?.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── SMOOTH SCROLL ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ─── CUSTOM CURSOR ───────────────────────────
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    if (cursorDot && cursorRing && window.matchMedia('(hover:hover)').matches) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });
        (function animRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animRing);
        })();
        document.querySelectorAll('a,button,.filter-pill,.demo-card,.release-card,.cym-btn,input,select,textarea').forEach(el => {
            el.addEventListener('mouseenter', () => { cursorDot.classList.add('hovering'); cursorRing.classList.add('hovering'); });
            el.addEventListener('mouseleave', () => { cursorDot.classList.remove('hovering'); cursorRing.classList.remove('hovering'); });
        });
        document.addEventListener('mousedown', () => { cursorDot.classList.add('clicking'); cursorRing.classList.add('clicking'); });
        document.addEventListener('mouseup',   () => { cursorDot.classList.remove('clicking'); cursorRing.classList.remove('clicking'); });
    }

    // ─── ROTATING GLOW TEXT ──────────────────────
    const glowText = document.getElementById('glowText');
    const phrases = ['Electronic Bangers','Future Bass Anthems','Melodic Techno Rides','Hard-Hitting Beats','Dreamy Soundscapes','Club Weapons'];
    let phraseIdx = 0;
    if (glowText) {
        glowText.style.transition = 'opacity .35s, transform .35s';
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
    }

    // ─── COUNTER ANIMATION ───────────────────────
    let countersRan = false;
    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersRan) {
                countersRan = true;
                document.querySelectorAll('.hero-stat-num').forEach(el => {
                    const target = +el.dataset.target;
                    const dur = 2200;
                    const startTime = performance.now();
                    (function tick(now) {
                        const p = Math.min((now - startTime) / dur, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        const val = Math.floor(ease * target);
                        if (target >= 1e6)      el.textContent = (val/1e6).toFixed(1)+'M+';
                        else if (target >= 1e3) el.textContent = (val/1e3).toFixed(0)+'K+';
                        else                    el.textContent = val+'+';
                        if (p < 1) requestAnimationFrame(tick);
                    })(startTime);
                });
            }
        });
    }, { threshold: 0.3 });
    const hero = document.getElementById('home');
    if (hero) statObserver.observe(hero);

    // ─── DEMO FILTER ─────────────────────────────
    const filterPills = document.querySelectorAll('.filter-pill');
    const demoCards   = document.querySelectorAll('.demo-card');
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
                    card.offsetHeight;
                    card.style.animation = `fadeUp .5s ${i * .08}s var(--ease) both`;
                }
            });
        });
    });

    // ─── COUNTDOWN ───────────────────────────────
    function tickCountdown() {
        document.querySelectorAll('.countdown').forEach(cd => {
            const diff = Math.max(new Date(cd.dataset.date).getTime() - Date.now(), 0);
            const d = Math.floor(diff / 864e5);
            const h = Math.floor((diff % 864e5) / 36e5);
            const m = Math.floor((diff % 36e5) / 6e4);
            const s = Math.floor((diff % 6e4) / 1e3);
            cd.querySelector('[data-unit="days"]').textContent  = String(d).padStart(2,'0');
            cd.querySelector('[data-unit="hours"]').textContent = String(h).padStart(2,'0');
            cd.querySelector('[data-unit="mins"]').textContent  = String(m).padStart(2,'0');
            cd.querySelector('[data-unit="secs"]').textContent  = String(s).padStart(2,'0');
        });
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);

    // ─── SCROLL REVEAL ───────────────────────────
    const revealItems = document.querySelectorAll(
        '.section-header,.featured-release,.demo-card,.release-card,' +
        '.about-visual,.about-info,.contact-info-card,.contact-form,.hscroll-section'
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

    // ─── PARALLAX HERO ───────────────────────────
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (heroContent && window.scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${window.scrollY * 0.25}px)`;
            heroContent.style.opacity = String(1 - window.scrollY / window.innerHeight);
        }
    }, { passive: true });

    // ─── WAVEFORM CANVASES ───────────────────────
    document.querySelectorAll('.demo-waveform-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const bars = 60;
        const barW = W / bars - 1;
        const heights = Array.from({ length: bars }, () => Math.random() * 0.7 + 0.15);
        let animFrame;

        function drawWave(highlight = -1) {
            ctx.clearRect(0, 0, W, H);
            heights.forEach((val, i) => {
                const bh = val * H;
                const y  = (H - bh) / 2;
                ctx.fillStyle = i <= highlight ? '#7c3aed' : 'rgba(124,58,237,0.25)';
                ctx.beginPath();
                ctx.roundRect
                    ? ctx.roundRect(i * (barW + 1), y, barW, bh, 1)
                    : ctx.rect(i * (barW + 1), y, barW, bh);
                ctx.fill();
            });
        }
        drawWave();

        const card = canvas.closest('.demo-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                let idx = 0;
                (function anim() {
                    drawWave(idx++);
                    if (idx <= bars) animFrame = requestAnimationFrame(anim);
                })();
            });
            card.addEventListener('mouseleave', () => {
                cancelAnimationFrame(animFrame);
                drawWave(-1);
            });
        }
    });

    // ─── TOAST ───────────────────────────────────
    const toastContainer = document.getElementById('toastContainer');
    function showToast(title, subtitle = '', type = 'music') {
        if (!toastContainer) return;
        const icons = {
            music:   { i: 'fas fa-music', cls: '' },
            success: { i: 'fas fa-check', cls: 'success' },
            error:   { i: 'fas fa-times', cls: 'error' },
            info:    { i: 'fas fa-info',  cls: 'info' },
        };
        const { i, cls } = icons[type] || icons.music;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon ${cls}"><i class="${i}"></i></div>
            <div class="toast-body">
                <strong>${title}</strong>
                ${subtitle ? `<span>${subtitle}</span>` : ''}
            </div>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 350);
        }, 3500);
    }

    // ─── AUDIO PLAYER ────────────────────────────
    const audio          = document.getElementById('audioElement');
    const playerBar      = document.getElementById('audioPlayerBar');
    const playerTitle    = document.getElementById('playerTitle');
    const playerArtist   = document.getElementById('playerArtist');
    const playPauseIcon  = document.getElementById('playPauseIcon');
    const progressBar    = document.getElementById('playerProgressBar');
    const progressFill   = document.getElementById('playerProgressFill');
    const progressThumb  = document.getElementById('playerProgressThumb');
    const currentTimeEl  = document.getElementById('playerCurrentTime');
    const durationEl     = document.getElementById('playerDuration');
    const volumeBar      = document.getElementById('playerVolumeBar');
    const volumeFill     = document.getElementById('playerVolumeFill');
    const volumeIcon     = document.getElementById('volumeIcon');

    const playlist = [];
    let currentIdx = -1;
    let isPlaying  = false;

    // Build playlist from all play buttons
    const allPlayBtns = document.querySelectorAll('[data-src]');
    allPlayBtns.forEach((btn, idx) => {
        playlist.push({
            src:    btn.dataset.src,
            title:  btn.dataset.title  || 'Unknown',
            artist: btn.dataset.artist || 'Joey Flavour'
        });
        btn.addEventListener('click', e => {
            e.preventDefault();
            if (currentIdx === idx && !audio.paused) {
                audio.pause();
                isPlaying = false;
                playPauseIcon.className = 'fas fa-play';
                removePlayingIndicators();
                btn.querySelector('i').className = 'fas fa-play';
            } else {
                loadTrack(idx);
            }
        });
    });

    function loadTrack(idx) {
        if (idx < 0 || idx >= playlist.length) return;
        currentIdx = idx;
        const track = playlist[idx];
        audio.src = track.src;
        if (playerTitle)  playerTitle.textContent  = track.title;
        if (playerArtist) playerArtist.textContent = track.artist;
        playerBar?.classList.add('visible');
        audio.play().then(() => {
            isPlaying = true;
            playPauseIcon.className = 'fas fa-pause';
            updatePlayingIndicator(idx);
            showToast('Now Playing', `${track.title} — ${track.artist}`, 'music');
        }).catch(err => console.warn('Play error:', err));
    }

    function removePlayingIndicators() {
        document.querySelectorAll('.playing-indicator').forEach(el => el.remove());
        allPlayBtns.forEach(btn => { btn.querySelector('i').className = 'fas fa-play'; });
    }

    function updatePlayingIndicator(idx) {
        removePlayingIndicators();
        const btn  = allPlayBtns[idx];
        if (!btn) return;
        btn.querySelector('i').className = 'fas fa-pause';
        const card = btn.closest('.demo-card,.release-card,.featured-release,.hscroll-card');
        if (card) {
            const nameEl = card.querySelector('.demo-name,h4,.featured-name,h5');
            if (nameEl) {
                const ind = document.createElement('span');
                ind.className = 'playing-indicator';
                ind.innerHTML = '<span></span><span></span><span></span>';
                nameEl.appendChild(ind);
            }
        }
    }

    // Play / Pause button
    document.getElementById('playerPlayPause')?.addEventListener('click', () => {
        if (!audio.src) return;
        if (audio.paused) {
            audio.play();
            isPlaying = true;
            playPauseIcon.className = 'fas fa-pause';
            if (currentIdx >= 0) updatePlayingIndicator(currentIdx);
        } else {
            audio.pause();
            isPlaying = false;
            playPauseIcon.className = 'fas fa-play';
            removePlayingIndicators();
        }
    });

    // Prev / Next
    document.getElementById('playerPrev')?.addEventListener('click', () => {
        if (currentIdx > 0) loadTrack(currentIdx - 1);
    });
    document.getElementById('playerNext')?.addEventListener('click', () => {
        if (currentIdx < playlist.length - 1) loadTrack(currentIdx + 1);
    });

    // Progress
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progressFill)  progressFill.style.width = pct + '%';
        if (progressThumb) progressThumb.style.left  = pct + '%';
        if (currentTimeEl) currentTimeEl.textContent = fmtTime(audio.currentTime);
    });
    audio.addEventListener('loadedmetadata', () => {
        if (durationEl) durationEl.textContent = fmtTime(audio.duration);
    });
    audio.addEventListener('ended', () => {
        if (currentIdx < playlist.length - 1) {
            loadTrack(currentIdx + 1);
        } else {
            playPauseIcon.className = 'fas fa-play';
            isPlaying = false;
            removePlayingIndicators();
        }
    });

    // Seek
    progressBar?.addEventListener('click', e => {
        if (!audio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });

    // Volume
    audio.volume = 0.8;
    volumeBar?.addEventListener('click', e => {
        const rect = volumeBar.getBoundingClientRect();
        const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.volume = pct;
        if (volumeFill) volumeFill.style.width = (pct * 100) + '%';
        if (volumeIcon) volumeIcon.className =
            pct === 0 ? 'fas fa-volume-mute' :
            pct < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    });
    document.getElementById('playerMute')?.addEventListener('click', () => {
        audio.muted = !audio.muted;
        if (volumeIcon) volumeIcon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        if (volumeFill) volumeFill.style.width = audio.muted ? '0%' : (audio.volume * 100) + '%';
    });

    function fmtTime(sec) {
        if (!sec || isNaN(sec)) return '0:00';
        return Math.floor(sec / 60) + ':' + String(Math.floor(sec % 60)).padStart(2, '0');
    }

    // ─── AUDIO VISUALIZER ────────────────────────
    const vizCanvas = document.getElementById('audioVisualizer');
    if (vizCanvas && audio) {
        const vCtx = vizCanvas.getContext('2d');
        const VW   = vizCanvas.width;
        const VH   = vizCanvas.height;
        let audioCtx, analyser, source, dataArray, bufferLen;
        let vizReady = false;
        let idleFrame;

        function drawIdle() {
            vCtx.clearRect(0, 0, VW, VH);
            const bars = 40, barW = VW / bars - 1;
            for (let i = 0; i < bars; i++) {
                const bh = (Math.sin(Date.now() * 0.002 + i * 0.4) * 0.3 + 0.4) * VH * 0.6;
                const y  = (VH - bh) / 2;
                vCtx.fillStyle = 'rgba(124,58,237,0.18)';
                vCtx.beginPath();
                vCtx.roundRect ? vCtx.roundRect(i*(barW+1), y, barW, bh, 1) : vCtx.rect(i*(barW+1), y, barW, bh);
                vCtx.fill();
            }
            idleFrame = requestAnimationFrame(drawIdle);
        }
        drawIdle();

        function setupViz() {
            if (vizReady) return;
            vizReady = true;
            try {
                audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
                analyser   = audioCtx.createAnalyser();
                analyser.fftSize = 128;
                bufferLen  = analyser.frequencyBinCount;
                dataArray  = new Uint8Array(bufferLen);
                source     = audioCtx.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(audioCtx.destination);
                cancelAnimationFrame(idleFrame);
                drawViz();
            } catch(e) { console.warn('Visualizer error:', e); }
        }

        function drawViz() {
            requestAnimationFrame(drawViz);
            analyser.getByteFrequencyData(dataArray);
            vCtx.clearRect(0, 0, VW, VH);
            const barW = (VW / bufferLen) * 2;
            let x = 0;
            for (let i = 0; i < bufferLen; i++) {
                const bh  = (dataArray[i] / 255) * VH;
                const y   = (VH - bh) / 2;
                const hue = 260 + (dataArray[i] / 255) * 80;
                vCtx.fillStyle = `hsla(${hue},80%,65%,0.85)`;
                vCtx.beginPath();
                vCtx.roundRect ? vCtx.roundRect(x, y, barW-1, bh, 1) : vCtx.rect(x, y, barW-1, bh);
                vCtx.fill();
                x += barW;
            }
        }

        audio.addEventListener('play', setupViz, { once: true });
    }

    // ─── 3D TILT ─────────────────────────────────
    function applyTilt(cards) {
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const r  = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
                const ry = ((e.clientX - r.left) / r.width  - 0.5) * 10;
                card.style.transition = 'transform .1s ease';
                card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.01)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform .5s var(--ease)';
                card.style.transform  = '';
            });
        });
    }
    applyTilt(document.querySelectorAll('.release-card'));
    applyTilt(document.querySelectorAll('.demo-card'));
    applyTilt(document.querySelectorAll('.hscroll-card'));

    // ─── HORIZONTAL SCROLL ───────────────────────
    document.querySelectorAll('.hscroll-track').forEach(track => {
        let isDown = false, startX, scrollLeft;
        track.addEventListener('mousedown', e => {
            isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => isDown = false);
        track.addEventListener('mouseup',    () => isDown = false);
        track.addEventListener('mousemove',  e => {
            if (!isDown) return;
            e.preventDefault();
            track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 2;
        });
        const section = track.closest('.hscroll-section');
        section?.querySelector('.hscroll-prev')?.addEventListener('click', () => {
            track.scrollBy({ left: -260, behavior: 'smooth' });
        });
        section?.querySelector('.hscroll-next')?.addEventListener('click', () => {
            track.scrollBy({ left: 260, behavior: 'smooth' });
        });
    });

    // ─── CONTACT FORM ────────────────────────────
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn  = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Sending...</span>';
        btn.disabled  = true;
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
            showToast('Message Sent!', "Joey will hit you back soon 🎶", 'success');
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }, 1800);
    });

}); // end DOMContentLoaded
