/* =========================================================
   Graduation Invitation · interactions & effects
   ========================================================= */
(() => {
'use strict';

const EVENT_DATE = new Date('2026-05-09T09:30:00+07:00');

const SLIDES = [
    'Sau gần 1 năm đi làm thì cuối cùng cũng đến ngày tốt nghiệp',
    'Mùa Hè Xanh 2022 - Chiến dịch MHX đầu tiên, rất vui',
    'Lần đầu tiên đi du ca 2022',
    'Leader team 2 - Các em đều giỏi và nhiệt huyết',
    'Sinh nhật Đội 14 tuổi - Tiết mục văn nghệ mà mình thấy đặc sắc nhất là do chính team mình thể hiện',
    'Du ca 2023 - Thời tiết 10 độ nhưng vẫn ngồi ở giữa cầu Đông Trù đàn hát',
    'Mùa Hè Xanh 2023 - Với vai trò trưởng mảng Nhân Sự & Kỉ luật, không như 2022 nhưng vẫn vui',
    'Trung thu 2023',
    'Lễ kiện toàn 2023 - Vai trò là trưởng mảng Nhân Sự',
    'Game Day 2023',
    'Tập huấn áo Xanh 2023',
    'Giáng sinh 2023',
    'Sinh nhật Đội 15 tuổi - Một cột mốc quan trọng',
    'Đảm nhiệm vai trò Đội Phó - Đầy thử thách',
    'Lễ kiện toàn 2024 - Một bước tiến mới',
    'Tặng quà tri ân - BCH và BQL k14',
    'Tết Yêu Thương 2024 - Làng Trẻ em SOS Việt Trì Phú Thọ',
    'CTES Super Cup SS4 - Được giải 3',
    'Lễ Trao áo Xanh K15',
    'Hỗ trợ chùa Phúc Long',
    'Du ca Phố Đi Bộ Hồ Gươm - Mọi người đến hát cùng rất đông',
    'Tặng quà cho các em nhỏ ở bệnh viện Nhi Thanh Nhàn 1/6/2024',
    'Mùa Hè Xanh 2024 - Hợp Thành, Phú Lương, Thái Nguyên',
    'Ban Chỉ Huy K15 - Rất nhiệt huyết và tài năng',
    'Trung Thu 2024 - Đây cũng được coi là hoạt động cuối cùng mình tham gia tổ chức',
    'BCH K15 - Những người đồng đội cùng nhau trải qua nhiều hoạt động ý nghĩa',
    'Tuyển quân K16 - Những người sẽ tiếp nối truyền thống tốt đẹp của Đội',
    'Lễ tập huấn áo Xanh K16',
    'Sinh nhật Đội 16 tuổi - Một cột mốc quan trọng cho thế hệ tiếp theo',
    'Lửa trại Sinh nhật Đội 16 tuổi',
    'Lễ Kiện toàn K16 - Chào đón những người thủ lĩnh tương lai và mình chính thức rời khỏi BCH. Hôm đó rất xúc động',
    'Sinh nhật Đội 17 tuổi - Một thế hệ mới đã trưởng thành và sẵn sàng tiếp bước truyền thống của Đội',
    'CTES Super Cup SS6 - Được giải 3',
    '20/10 cho các chị em trong CTES',
    'Giải tứ hùng - Được giải nhất',
    'CTES Super Cup SS7 - Cuối cùng cũng vô địch',
    'Chụp ảnh lưu niệm',
    'Bảo vệ ĐATN - Nhất hội đồng, mình rất vui vì đã hoàn thành mục tiêu',
    'Chinh phục Yên Tử 2026',
    'Cảm ơn tất cả mọi người đã đồng hành cùng mình trong suốt quãng thời gian qua.'
].map((caption, i) => ({
    src: `images/web/image_${i + 1}.webp`,
    thumb: `images/thumb/image_${i + 1}.webp`,
    caption
}));

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[(Math.random() * arr.length) | 0];
const pad = n => String(n).padStart(2, '0');

function splitWords(el, highlight = []) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => {
        const hl = highlight.some(h => w.toLowerCase().includes(h)) ? ' hl' : '';
        return `<span class="w${hl}" style="--i:${i}">${w}</span>`;
    }).join(' ');
}

/* =========================================================
   Sky: twinkling stars, gold dust, shooting stars
   ========================================================= */
function initSky() {
    const c = $('#sky');
    const ctx = c.getContext('2d');
    let w, h, dpr, stars = [], dust = [], meteors = [];

    function resize() {
        dpr = Math.min(devicePixelRatio || 1, 2);
        w = innerWidth; h = innerHeight;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round((w * h) / 4200);
        stars = Array.from({ length: n }, () => ({
            x: Math.random() * w, y: Math.random() * h * 1.6,
            r: Math.random() * 1.3 + .2, p: Math.random() * Math.PI * 2,
            s: rand(.5, 2), z: rand(.05, .35),
            gold: Math.random() < .12
        }));
        dust = Array.from({ length: Math.round(n / 9) }, () => newDust(true));
    }
    function newDust(anywhere) {
        return { x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10, r: rand(.6, 2.2), vy: rand(.15, .5), vx: rand(-.15, .15), a: rand(.2, .7), p: Math.random() * 6 };
    }
    resize();
    addEventListener('resize', resize);

    let t = 0;
    function frame() {
        t += 1 / 60;
        ctx.clearRect(0, 0, w, h);
        const sy = scrollY;

        for (const s of stars) {
            const y = ((s.y - sy * s.z) % (h * 1.6) + h * 1.6) % (h * 1.6);
            if (y > h) continue;
            const a = .35 + .65 * Math.abs(Math.sin(t * s.s + s.p));
            ctx.globalAlpha = a;
            ctx.fillStyle = s.gold ? '#fbe3a6' : '#ffffff';
            ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 7); ctx.fill();
            if (s.r > 1.2 && a > .9) {
                ctx.globalAlpha = a * .5;
                ctx.fillRect(s.x - 4, y - .3, 8, .6);
                ctx.fillRect(s.x - .3, y - 4, .6, 8);
            }
        }

        for (const d of dust) {
            d.y -= d.vy; d.x += d.vx + Math.sin(t + d.p) * .2;
            if (d.y < -10) Object.assign(d, newDust(false));
            ctx.globalAlpha = d.a * (.6 + .4 * Math.sin(t * 2 + d.p));
            const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
            g.addColorStop(0, 'rgba(251,227,166,1)'); g.addColorStop(1, 'rgba(251,227,166,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 3, 0, 7); ctx.fill();
        }

        if (Math.random() < .006) {
            meteors.push({ x: rand(w * .1, w), y: rand(0, h * .4), vx: -rand(7, 11), vy: rand(3, 5), life: 1 });
        }
        ctx.lineCap = 'round';
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.x += m.vx; m.y += m.vy; m.life -= .018;
            if (m.life <= 0) { meteors.splice(i, 1); continue; }
            const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
            g.addColorStop(0, `rgba(255,248,220,${m.life})`); g.addColorStop(1, 'rgba(255,248,220,0)');
            ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.8;
            ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10); ctx.stroke();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
    }
    if (reduced) { frame(); return; }
    requestAnimationFrame(frame);
}

/* =========================================================
   FX: fireworks, confetti, sparks, caps
   ========================================================= */
const FX = (() => {
    const c = $('#fx');
    const ctx = c.getContext('2d');
    const parts = [];
    const rockets = [];
    let running = false, w, h;
    const GOLD = ['#fbe3a6', '#e8c27a', '#ffffff', '#f6c065', '#ffd9a0'];
    const PARTY = ['#fbe3a6', '#e8c27a', '#ffffff', '#8fb6ff', '#f59ec4', '#a7e8c8'];

    function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        w = innerWidth; h = innerHeight;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener('resize', resize);

    function start() { if (!running) { running = true; requestAnimationFrame(loop); } }

    function drawCap(p) {
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.scale(1, Math.abs(Math.cos(p.flip)) * .7 + .3);
        const s = p.size;
        ctx.fillStyle = '#121a44';
        ctx.beginPath(); ctx.moveTo(0, -s * .5); ctx.lineTo(s, 0); ctx.lineTo(0, s * .5); ctx.lineTo(-s, 0); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#e8c27a'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.fillStyle = '#0b1030';
        ctx.fillRect(-s * .45, s * .2, s * .9, s * .35);
        ctx.strokeStyle = '#fbe3a6'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s * .7, s * .2, s * .75, s * .75); ctx.stroke();
        ctx.fillStyle = '#fbe3a6'; ctx.beginPath(); ctx.arc(s * .75, s * .8, 2.4, 0, 7); ctx.fill();
        ctx.restore();
    }

    function loop() {
        ctx.clearRect(0, 0, w, h);

        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            r.x += r.vx; r.y += r.vy; r.vy += .06;
            parts.push({ type: 'spark', x: r.x, y: r.y, vx: rand(-.3, .3), vy: rand(0, .6), life: .5, decay: .04, size: 1.4, color: '#ffe8b0', g: 0, drag: .95 });
            if (r.vy >= -1 || r.y <= r.ty) { rockets.splice(i, 1); burst(r.x, r.y, r.palette); }
        }

        ctx.globalCompositeOperation = 'lighter';
        for (let i = parts.length - 1; i >= 0; i--) {
            const p = parts[i];
            p.vx *= p.drag; p.vy = p.vy * p.drag + p.g;
            p.x += p.vx; p.y += p.vy;
            p.life -= p.decay;
            if (p.life <= 0 || p.y > h + 60) { parts.splice(i, 1); continue; }

            if (p.type === 'spark') {
                ctx.globalAlpha = Math.min(1, p.life);
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (p.twinkle ? (Math.random() > .3 ? 1 : .3) : 1), 0, 7); ctx.fill();
            }
        }
        ctx.globalCompositeOperation = 'source-over';
        for (const p of parts) {
            if (p.type === 'confetti') {
                p.rot += p.vr; p.flip += p.vf;
                ctx.save();
                ctx.globalAlpha = Math.min(1, p.life * 2);
                ctx.translate(p.x, p.y); ctx.rotate(p.rot);
                ctx.scale(1, Math.cos(p.flip));
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                ctx.restore();
            } else if (p.type === 'cap') {
                p.rot += p.vr; p.flip += p.vf;
                ctx.globalAlpha = Math.min(1, p.life * 2);
                drawCap(p);
            }
        }
        ctx.globalAlpha = 1;

        if (parts.length || rockets.length) requestAnimationFrame(loop);
        else { running = false; ctx.clearRect(0, 0, w, h); }
    }

    function burst(x, y, palette = GOLD) {
        const n = (reduced ? 30 : 90) + (Math.random() * 30 | 0);
        const color = pick(palette), color2 = pick(palette);
        const ring = Math.random() < .3;
        for (let i = 0; i < n; i++) {
            const a = (Math.PI * 2 * i) / n + rand(-.05, .05);
            const sp = ring ? 4.6 : rand(1.2, 5.2);
            parts.push({ type: 'spark', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(.9, 1.3), decay: rand(.010, .016), size: rand(1.2, 2.4), color: i % 3 ? color : color2, g: .045, drag: .975, twinkle: Math.random() < .4 });
        }
        start();
    }

    function rocket(x, palette) {
        const ty = rand(h * .12, h * .42);
        rockets.push({ x, y: h + 10, vx: rand(-1, 1), vy: -Math.sqrt(2 * .06 * (h - ty)) - .5, ty, palette });
        start();
    }

    function show(count = 6, spread = 2600) {
        for (let i = 0; i < count; i++) setTimeout(() => rocket(rand(w * .15, w * .85), pick([GOLD, PARTY])), (i / count) * spread + rand(0, 200));
    }

    function confetti(x = w / 2, y = h * .4, n = 140) {
        for (let i = 0; i < n; i++) {
            const a = rand(-Math.PI, 0), sp = rand(4, 13);
            parts.push({ type: 'confetti', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(1.4, 2.2), decay: .006, size: rand(7, 12), color: pick(PARTY), g: .18, drag: .97, rot: rand(0, 6), vr: rand(-.2, .2), flip: rand(0, 6), vf: rand(.08, .25) });
        }
        start();
    }

    function sparkle(x, y, n = 14) {
        for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2), sp = rand(.6, 3);
            parts.push({ type: 'spark', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(.5, .9), decay: .025, size: rand(.8, 2), color: pick(GOLD), g: .03, drag: .94, twinkle: true });
        }
        start();
    }

    function trail(x, y) {
        parts.push({ type: 'spark', x, y, vx: rand(-.4, .4), vy: rand(-.2, .6), life: .6, decay: .03, size: rand(.6, 1.6), color: pick(GOLD), g: .02, drag: .96, twinkle: true });
        start();
    }

    function caps(n = 18) {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                const x = rand(w * .1, w * .9);
                parts.push({ type: 'cap', x, y: h + 30, vx: rand(-2.5, 2.5), vy: -rand(13, 19) * Math.sqrt(h / 800), life: 3, decay: .006, size: rand(16, 26), g: .32 * Math.sqrt(h / 800) * .9, drag: .995, rot: rand(-.5, .5), vr: rand(-.12, .12), flip: rand(0, 6), vf: rand(.05, .15) });
                start();
            }, i * 70);
        }
        setTimeout(() => confetti(w / 2, h * .35, 120), 700);
    }

    return { burst, show, confetti, sparkle, trail, caps };
})();

/* =========================================================
   Intro envelope + music
   ========================================================= */
function initIntro() {
    const intro = $('#intro'), env = $('#envelope'), bgm = $('#bgm'), btn = $('#music-btn');
    bgm.volume = .45;

    const setPlaying = on => btn.classList.toggle('is-playing', on);
    bgm.addEventListener('play', () => setPlaying(true));
    bgm.addEventListener('pause', () => setPlaying(false));
    btn.addEventListener('click', () => (bgm.paused ? bgm.play().catch(() => {}) : bgm.pause()));

    let opened = false;
    env.addEventListener('click', () => {
        if (opened) return;
        opened = true;
        bgm.play().catch(() => {});
        env.classList.add('is-open');
        setTimeout(() => {
            intro.classList.add('is-gone');
            document.body.classList.remove('is-locked');
            document.body.classList.add('is-open');
            btn.classList.add('is-ready');
            FX.show(reduced ? 2 : 9, 3600);
        }, 1500);
        setTimeout(() => intro.remove(), 2700);
    });
}

/* =========================================================
   Countdown / memory counter
   ========================================================= */
function initCounter() {
    const label = $('#counter-label');
    const el = { d: $('#c-d'), h: $('#c-h'), m: $('#c-m'), s: $('#c-s') };
    function set(k, v) {
        if (el[k].textContent !== v) {
            el[k].textContent = v;
            el[k].classList.remove('tick'); void el[k].offsetWidth; el[k].classList.add('tick');
        }
    }
    function update() {
        let diff = EVENT_DATE - Date.now();
        const past = diff < 0;
        label.textContent = past ? 'Đã trôi qua kể từ ngày tốt nghiệp' : 'Đếm ngược đến ngày tốt nghiệp';
        diff = Math.abs(diff);
        const s = Math.floor(diff / 1000);
        set('d', String(Math.floor(s / 86400)));
        set('h', pad(Math.floor(s / 3600) % 24));
        set('m', pad(Math.floor(s / 60) % 60));
        set('s', pad(s % 60));
    }
    update();
    setInterval(update, 1000);
}

/* =========================================================
   Gallery
   ========================================================= */
function initGallery() {
    const stage = $('#stage'), frame = $('#stage-frame'), bg = $('#stage-bg');
    const caption = $('#stage-caption'), cur = $('#count-cur'), bar = $('#stage-progress');
    const thumbs = $('#thumbs'), playBtn = $('#play');
    const DURATION = 6000;
    let index = 0, playing = true, hover = false, visible = false, elapsed = 0, last = performance.now();

    $('#count-total').textContent = SLIDES.length;

    const slides = SLIDES.map((s, i) => {
        const d = document.createElement('div');
        d.className = 'slide';
        d.innerHTML = `<img alt="${s.caption.replace(/"/g, '&quot;')}" decoding="async" draggable="false">`;
        frame.appendChild(d);

        const t = document.createElement('button');
        t.setAttribute('aria-label', `Ảnh ${i + 1}`);
        t.innerHTML = `<img src="${s.thumb}" alt="" loading="lazy">`;
        t.addEventListener('click', () => go(i));
        thumbs.appendChild(t);
        return d;
    });

    function load(i) {
        const img = slides[(i + SLIDES.length) % SLIDES.length].firstChild;
        if (!img.src) img.src = SLIDES[(i + SLIDES.length) % SLIDES.length].src;
    }

    function go(i) {
        index = (i + SLIDES.length) % SLIDES.length;
        load(index); load(index + 1); load(index - 1);
        slides.forEach((s, k) => s.classList.toggle('on', k === index));
        bg.style.backgroundImage = `url(${SLIDES[index].thumb})`;
        cur.textContent = pad(index + 1);
        caption.textContent = SLIDES[index].caption;
        splitWords(caption);
        $$('button', thumbs).forEach((t, k) => t.classList.toggle('on', k === index));
        const t = thumbs.children[index];
        thumbs.scrollTo({ left: t.offsetLeft - thumbs.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
        elapsed = 0;
    }

    $('#prev').addEventListener('click', () => go(index - 1));
    $('#next').addEventListener('click', () => go(index + 1));
    playBtn.addEventListener('click', () => {
        playing = !playing;
        playBtn.innerHTML = `<i class="fas fa-${playing ? 'pause' : 'play'}"></i>`;
    });
    $('#expand').addEventListener('click', () => Lightbox.open(SLIDES, index, i => go(i)));
    frame.addEventListener('click', () => Lightbox.open(SLIDES, index, i => go(i)));

    if (finePointer) {
        stage.addEventListener('mouseenter', () => (hover = true));
        stage.addEventListener('mouseleave', () => (hover = false));
    }
    stage.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
    });

    let sx = null, sy = null;
    stage.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', e => {
        if (sx === null) return;
        const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
        sx = null;
    });

    new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: .3 }).observe(stage);

    function tick(now) {
        const dt = now - last; last = now;
        if (playing && !hover && visible && !document.hidden && !Lightbox.isOpen()) {
            elapsed += dt;
            if (elapsed >= DURATION) go(index + 1);
        }
        bar.style.transform = `scaleX(${Math.min(elapsed / DURATION, 1)})`;
        requestAnimationFrame(tick);
    }

    go(0);
    requestAnimationFrame(tick);
}

/* =========================================================
   Lightbox (photos + campus map)
   ========================================================= */
const Lightbox = (() => {
    const box = $('#lightbox'), img = $('#lb-img'), cap = $('#lb-caption'), view = $('#lb-view');
    let list = [], i = 0, onChange = null, z = 1, tx = 0, ty = 0;

    function apply() { img.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`; }
    function reset() { z = 1; tx = ty = 0; apply(); }
    function zoom(d) { z = Math.min(4, Math.max(1, z + d)); if (z === 1) tx = ty = 0; apply(); }

    function show(k) {
        i = (k + list.length) % list.length;
        img.src = list[i].src;
        img.alt = list[i].caption;
        cap.textContent = list.length > 1 ? `${i + 1} / ${list.length} · ${list[i].caption}` : list[i].caption;
        reset();
        if (onChange) onChange(i);
    }
    function open(l, k = 0, cb = null) {
        list = l; onChange = cb;
        box.classList.toggle('single', l.length < 2);
        show(k);
        box.classList.add('on');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        box.classList.remove('on');
        box.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    $('#lb-close').addEventListener('click', close);
    $('#lb-prev').addEventListener('click', () => show(i - 1));
    $('#lb-next').addEventListener('click', () => show(i + 1));
    $('#lb-zoom-in').addEventListener('click', () => zoom(.5));
    $('#lb-zoom-out').addEventListener('click', () => zoom(-.5));
    $('#lb-zoom-reset').addEventListener('click', reset);
    view.addEventListener('click', e => { if (e.target === view) close(); });
    view.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY < 0 ? .25 : -.25); }, { passive: false });
    img.addEventListener('dblclick', () => (z > 1 ? reset() : zoom(1)));

    document.addEventListener('keydown', e => {
        if (!box.classList.contains('on')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft' && list.length > 1) show(i - 1);
        if (e.key === 'ArrowRight' && list.length > 1) show(i + 1);
        if (e.key === '+' || e.key === '=') zoom(.5);
        if (e.key === '-') zoom(-.5);
    });

    let drag = null;
    img.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, tx, ty, moved: false }; img.setPointerCapture(e.pointerId); img.style.transition = 'none'; });
    img.addEventListener('pointermove', e => {
        if (!drag) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
        if (z > 1) { tx = drag.tx + dx; ty = drag.ty + dy; apply(); }
    });
    img.addEventListener('pointerup', e => {
        img.style.transition = '';
        if (drag && z === 1 && list.length > 1) {
            const dx = e.clientX - drag.x;
            if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
        }
        drag = null;
    });

    return { open, isOpen: () => box.classList.contains('on') };
})();

/* =========================================================
   Scroll reveals, quote, signature, progress
   ========================================================= */
function initScroll() {
    const hero = $('.hero-big');
    hero.innerHTML = [...hero.textContent].map((ch, i) => ch === ' ' ? ' ' : `<span class="ch" style="--i:${i}">${ch}</span>`).join('');

    const quote = $('[data-words]');
    splitWords(quote, ['khao', 'khát', 'vũ', 'trụ']);

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal, [data-words], .signature').forEach(el => io.observe(el));

    const progress = $('#scroll-progress');
    const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* =========================================================
   Pointer effects: tilt, glow, sparkle trail, click bursts
   ========================================================= */
function initPointer() {
    if (finePointer && !reduced) {
        $$('.tilt').forEach(el => {
            const max = el.classList.contains('letter') ? 4 : 9;
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
                el.style.transform = `perspective(900px) rotateX(${(.5 - py) * max}deg) rotateY(${(px - .5) * max}deg) translateY(-4px)`;
                el.style.setProperty('--mx', `${px * 100}%`);
                el.style.setProperty('--my', `${py * 100}%`);
            });
            el.addEventListener('pointerleave', () => (el.style.transform = ''));
        });

        let lastT = 0;
        addEventListener('pointermove', e => {
            const now = performance.now();
            if (now - lastT > 28) { lastT = now; FX.trail(e.clientX, e.clientY); }
        }, { passive: true });
    }

    addEventListener('pointerdown', e => {
        if (e.target.closest('button, a, input, textarea, iframe, .lightbox, .intro, .stage')) return;
        FX.sparkle(e.clientX, e.clientY, reduced ? 6 : 18);
    });
}

/* =========================================================
   Campus map, form, cap toss
   ========================================================= */
function initMisc() {
    $('#campus-open').addEventListener('click', () => Lightbox.open([{ src: 'images/web/map.webp', caption: 'Sơ đồ khuôn viên Đại học Bách Khoa Hà Nội' }]));

    const form = $('#attendanceForm'), btn = $('#submit-btn'), ok = $('#form-success');
    form.addEventListener('submit', () => {
        btn.disabled = true;
        btn.classList.add('is-loading');
        ok.classList.remove('visible');
        setTimeout(() => {
            form.reset();
            btn.disabled = false;
            btn.classList.remove('is-loading');
            ok.classList.add('visible');
            const r = btn.getBoundingClientRect();
            FX.confetti(r.left + r.width / 2, r.top, 160);
        }, 1200);
    });

    const toss = $('#toss-btn');
    let cool = false;
    toss.addEventListener('click', () => {
        if (cool) return;
        cool = true;
        FX.caps(reduced ? 6 : 22);
        setTimeout(() => FX.show(4, 1500), 900);
        setTimeout(() => (cool = false), 2500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSky();
    initIntro();
    initCounter();
    initGallery();
    initScroll();
    initPointer();
    initMisc();
});
})();
