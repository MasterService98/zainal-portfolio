/**
 * MUHAMMAD ZAINAL EFENDI - PORTFOLIO & PERSONAL BIO INTERACTIVITY
 * Electronic & Electrical Engineer | RAC Specialist | Zain Corp Studio
 * Ready for Vercel Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* -------------------------------------------------------------
     1. DYNAMIC BIRTHDAY & AGE CALCULATOR (20 JUNI 2002)
  ------------------------------------------------------------- */
  function updateAgeAndBirthday() {
    const birthYear = 2002;
    const birthMonth = 5; // June (0-indexed)
    const birthDay = 20;

    const now = new Date();
    let currentAge = now.getFullYear() - birthYear;
    const hasHadBirthdayThisYear = (now.getMonth() > birthMonth) || 
      (now.getMonth() === birthMonth && now.getDate() >= birthDay);

    if (!hasHadBirthdayThisYear) {
      currentAge--;
    }

    // Next Birthday calculation
    let nextBdayYear = now.getFullYear();
    if (hasHadBirthdayThisYear) {
      nextBdayYear++;
    }
    const nextBday = new Date(nextBdayYear, birthMonth, birthDay);
    const diffTime = nextBday - now;
    const daysUntilNext = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Update DOM elements
    const badgeAge = document.getElementById('badgeAge');
    const calcYears = document.getElementById('calcYears');
    const calcDaysNext = document.getElementById('calcDaysNext');

    if (badgeAge) badgeAge.textContent = `${currentAge} Tahun`;
    if (calcYears) calcYears.textContent = currentAge;
    if (calcDaysNext) calcDaysNext.textContent = daysUntilNext > 0 ? daysUntilNext : 'Hari Ini! 🎉';
  }
  updateAgeAndBirthday();

  /* -------------------------------------------------------------
     2. REAL-TIME WIB (GMT+7) CLOCK (BLITAR, INDONESIA)
  ------------------------------------------------------------- */
  function updateWibClock() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeFormatter = new Intl.DateTimeFormat('id-ID', options);
    const timeString = timeFormatter.format(now).replace(/\./g, ':');

    const navLiveTime = document.getElementById('navLiveTime');
    const bentoWibTime = document.getElementById('bentoWibTime');
    const contactLiveClock = document.getElementById('contactLiveClock');

    if (navLiveTime) navLiveTime.textContent = `WIB ${timeString}`;
    if (bentoWibTime) bentoWibTime.textContent = timeString;
    if (contactLiveClock) contactLiveClock.textContent = `${timeString} WIB`;
  }
  setInterval(updateWibClock, 1000);
  updateWibClock();

  // Footer Year
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------
     3. DYNAMIC TYPING ROTATOR (ELECTRONIC, ELECTRICAL, RAC, AUDIO)
  ------------------------------------------------------------- */
  const typingElem = document.getElementById('typingText');
  const roles = [
    'Electronic & Electrical Engineer',
    'Refrigeration & AC (RAC)',
    'Audio Engineering & Hardware Tech',
    'Founder @ Zain Corp',
    'Kelahiran Blitar, 20 Juni 2002'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElem) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  /* -------------------------------------------------------------
     4. SYNTHESIZED WEB AUDIO SFX (ZERO EXTERNAL ASSET DEPENDENCY)
  ------------------------------------------------------------- */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq = 600, type = 'sine', duration = 0.08, volume = 0.1) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio policy catch
    }
  }

  // Sound toggle button
  const soundToggleBtn = document.getElementById('soundToggle');
  const soundOnIcon = soundToggleBtn?.querySelector('.icon-sound-on');
  const soundOffIcon = soundToggleBtn?.querySelector('.icon-sound-off');

  soundToggleBtn?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      playTone(700, 'sine', 0.1, 0.15);
      soundOnIcon?.classList.remove('d-none');
      soundOffIcon?.classList.add('d-none');
      showToast('Efek suara diaktifkan 🔊');
    } else {
      soundOnIcon?.classList.add('d-none');
      soundOffIcon?.classList.remove('d-none');
      showToast('Efek suara dimatikan 🔇');
    }
  });

  // Attach subtle click tone to interactive buttons
  document.querySelectorAll('button, .btn, .nav-link, .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playTone(520, 'sine', 0.05, 0.06);
    });
  });

  /* -------------------------------------------------------------
     5. THEME MOOD / PALETTE SWITCHER
  ------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggle');
  const themePalettes = ['default', 'palette-sunset', 'palette-emerald'];
  let currentPaletteIndex = 0;

  themeToggleBtn?.addEventListener('click', () => {
    document.body.classList.remove('palette-sunset', 'palette-emerald');
    currentPaletteIndex = (currentPaletteIndex + 1) % themePalettes.length;
    const nextPalette = themePalettes[currentPaletteIndex];

    if (nextPalette !== 'default') {
      document.body.classList.add(nextPalette);
    }

    playTone(850, 'triangle', 0.1, 0.12);
    const themeNames = {
      'default': 'Cyber Cyan & Coral',
      'palette-sunset': 'Sunset Amber & Rose',
      'palette-emerald': 'Emerald Glow'
    };
    showToast(`Palet Aksen: ${themeNames[nextPalette]}`);
  });

  /* -------------------------------------------------------------
     6. CUSTOM CURSOR FOLLOWER WITH MAGNETIC HOVER
  ------------------------------------------------------------- */
  const cursorDot = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .bento-card, .project-card, .photo-frame, .arcade-box');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '54px';
        cursorFollower.style.height = '54px';
        cursorFollower.style.borderColor = 'var(--accent-pink)';
        cursorFollower.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
      });
      target.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '32px';
        cursorFollower.style.height = '32px';
        cursorFollower.style.borderColor = 'var(--accent-cyan)';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
  }

  /* -------------------------------------------------------------
     7. 3D TILT EFFECT ON HERO PHOTO CARD
  ------------------------------------------------------------- */
  const heroCardWrapper = document.getElementById('heroCardWrapper');
  const heroCard = document.getElementById('heroCard');

  if (heroCardWrapper && heroCard && window.matchMedia('(pointer: fine)').matches) {
    heroCardWrapper.addEventListener('mousemove', (e) => {
      const rect = heroCardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroCardWrapper.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      heroCard.style.transition = 'transform 0.5s ease-out';
    });

    heroCardWrapper.addEventListener('mouseenter', () => {
      heroCard.style.transition = 'none';
    });
  }

  /* -------------------------------------------------------------
     8. CLICK-TO-COPY EMAIL WITH TOAST
  ------------------------------------------------------------- */
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'muhzainal980@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        playTone(950, 'sine', 0.12, 0.15);
        showToast(`Email ${email} berhasil disalin! 📋`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  /* -------------------------------------------------------------
     9. INTERACTIVE CANVAS PARTICLE MESH BACKGROUND
  ------------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = 1 - dist / 115;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* -------------------------------------------------------------
     10. PROJECT FILTERS & MODAL PREVIEW (16 REAL PROJECTS)
  ------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUpAnim 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Data for Modal Preview (All 16 real items)
  const projectsData = {
    '1': {
      title: 'Servis & Penggantian Kompresor AC Outdoor',
      tag: 'RAC & Pendingin',
      corp: 'HVAC-R Outdoor Field',
      image: 'porto1.jpeg',
      description: 'Dokumentasi pembongkaran casing unit outdoor AC Sharp R32, pemipaan tembaga, pemasangan unit kompresor pengganti, proses pemvakuman sistem sirkulasi dengan pompa vakum Lakoni, serta persiapan alat manifold gauge untuk memastikan sistem bebas uap air sebelum pengisian refrigeran.',
      tech: ['Kompresor Sharp R32', 'Pompa Vakum Lakoni', 'Manifold Gauge', 'Brazing Pipa Tembaga', 'Leak Detection']
    },
    '2': {
      title: 'Uji Arus Beban AC Kompresor (1.82 A)',
      tag: 'Pengukuran Arus & Kelistrikan',
      corp: 'Kyoritsu SNAP 2033',
      image: 'porto2.jpeg',
      description: 'Pengukuran arus listrik beban kerja kompresor AC saat beroperasi menggunakan tang ampere digital presisi Kyoritsu KEW SNAP 2033. Nilai arus terukur 1.82 A AC, menandakan beban kompresi berada dalam batas kerja aman dan efisien sesuai spesifikasi pabrikan.',
      tech: ['Kyoritsu KEW SNAP 2033', 'Digital AC/DC Clamp Meter', 'Arus Beban 1.82A', 'Proteksi Kompresor', 'Efisiensi Daya']
    },
    '3': {
      title: 'Pengkabelan Terminal I/O Mitsubishi MELSEC PLC',
      tag: 'PLC & Otomasi Industri',
      corp: 'Mitsubishi Electric',
      image: 'porto3.jpeg',
      description: 'Penataan dan pengkabelan blok terminal input/output sistem PLC Mitsubishi MELSEC. Menggunakan sepatu kabel berisolasi kuning dengan nomor pengenal kabel yang tertata rapi untuk memastikan konektivitas sinyal sensor, sakelar, dan aktuator berjalan stabil tanpa interferensi.',
      tech: ['Mitsubishi MELSEC PLC', 'Terminal Blok I/O', 'Wiring Sepatu Kabel', 'Sinyal Kontrol Industri', 'Standar Panel']
    },
    '4': {
      title: 'Tuning Parametric EQ & Crossover DSP Multi-Channel',
      tag: 'DSP Tuning & Audio Engineering',
      corp: 'Digital Signal Processing',
      image: 'porto4.jpeg',
      description: 'Konfigurasi dan penyelarasan kurva respon frekuensi menggunakan antarmuka software prosesor audio digital multi-channel (The Santoso V2.2.12). Pengaturan mencakup filter High-Pass (HP), Low-Pass (LP), Parametric Equalizer (PEQ), gain matrix, delay alignment, dan phase correction.',
      tech: ['DSP Control Software', 'Parametric EQ', 'Crossover Slope', 'Phase Alignment', 'Matrix Routing']
    },
    '5': {
      title: 'Panel Kontrol Kelistrikan & Catu Daya Industri',
      tag: 'Panel Kontrol & Distribusi',
      corp: 'Omron & Panasonic System',
      image: 'porto5.jpeg',
      description: 'Perakitan dan penataan panel kontrol kelistrikan industri yang mengintegrasikan power supply switching Omron S8VK-C24024 (24VDC), sirkuit pemutus arus Panasonic BBW-30 (5A), relai kontrol industri, serta jalur terminal distribusi daya dengan pengaman.',
      tech: ['Omron S8VK-C24024 24V', 'Panasonic Breaker BBW-30', 'Relay Switching', 'Industrial Panel Enclosure', 'Power Distribution']
    },
    '6': {
      title: 'Pengukuran Suhu Termal Presisi Laser (319.8 °C)',
      tag: 'Uji Termal & Instrumentasi',
      corp: 'Extech Instruments 42510A',
      image: 'porto6.jpeg',
      description: 'Pengukuran temperatur tinggi menggunakan termometer laser inframerah presisi Extech 42510A pada ruang elemen termal industri. Hasil pembacaan real-time menunjukkan suhu 319.8 °C dengan suhu puncak (MAX) mencapai 324.7 °C, memverifikasi disipasi panas kerja sistem.',
      tech: ['Extech 42510A Laser', 'Infrared Thermometer', 'Suhu Terbaca 319.8°C', 'Emisivitas 0.92', 'Monitoring Disipasi Panas']
    },
    '7': {
      title: 'Traction Battery Charger Industri 48V / 60A',
      tag: 'Kelistrikan Daya Tinggi',
      corp: 'Heavy Duty Traction System',
      image: 'porto7.jpeg',
      description: 'Pemeriksaan dan pemeliharaan unit pengisi daya baterai traksi bertegangan tinggi 48V dengan arus keluaran 60A. Menggunakan sistem input 3-phase, sirkuit pemutus arus proteksi, dan charge controller auto-equaliser untuk pengisian baterai forklift industri.',
      tech: ['Tegangan 48V DC', 'Arus 60A Output', '3-Phase Input System', 'Auto Equaliser Controller', 'Proteksi Tegangan Tinggi']
    },
    '8': {
      title: 'Inspeksi Mikroskopis Jalur Sirkuit PCB & Titik Solder',
      tag: 'Mikroelektronika & Analisis',
      corp: 'SMD Diagnostics Lab',
      image: 'porto8.jpeg',
      description: 'Analisis visual pembesaran tinggi di bawah mikroskop kerja untuk mendeteksi retakan solder mikroskopis (cold solder joint), degradasi jalur tembaga (PCB trace), serta memastikan tidak adanya jembatan timah mikro yang dapat menimbulkan hubungan pendek antar pin IC.',
      tech: ['Microscopic PCB Inspection', 'SMD Trace Analysis', 'Cold Joint Detection', 'High Precision Solder', 'Quality Control']
    },
    '9': {
      title: 'Perbaikan & Troubleshooting Modul SMPS Power Supply',
      tag: 'Catu Daya SMPS & Elektronika',
      corp: 'Switching Power Lab',
      image: 'porto9.jpeg',
      description: 'Analisis dan penggantian komponen pada papan catu daya switching (SMPS). Mencakup pengecekan dioda bridge penyearah AC-DC, trafo ferit frekuensi tinggi, transistor daya MOSFET dengan heatsink, serta kapasitor elektrolit low-ESR pada sisi output daya.',
      tech: ['SMPS Board MPW4603E', 'Switching Transformer', 'MOSFET Heatsink', 'Electrolytic Filter', 'Voltage Regulation']
    },
    '10': {
      title: 'Troubleshooting Perangkat Keras Mikrokontroler',
      tag: 'Hardware Micro & Embedded',
      corp: 'Precision Hardware Rework',
      image: 'porto10.jpeg',
      description: 'Pembongkaran teliti dan perbaikan perangkat elektronik berbasis chip mikrokontroler SMD. Pengujian jalur catu daya Micro-USB, slot memori SD card, jalur input tombol, serta jalur keluaran sinyal speaker audio internal.',
      tech: ['Microcontroller MCU Chip', 'Micro-USB Connector', 'SMD Passives', 'Precision Tool Rework', 'Signal Tracing']
    },
    '11': {
      title: 'Panel Otomasi Mitsubishi MELSEC FX3S-30M & Relai',
      tag: 'Otomasi PLC & Kontrol Panel',
      corp: 'Mitsubishi FX3S Series',
      image: 'porto11.jpeg',
      description: 'Perakitan dan penataan panel boks otomasi terpadu berbasis PLC Mitsubishi MELSEC FX3S-30M. Dilengkapi relai industri berindikator LED, terminal blok terindeks, dan pengkabelan rapi spiral wrap untuk sistem kontrol mesin otomatis.',
      tech: ['PLC FX3S-30M', 'Industrial Relay 24V', 'Terminal Block Indexing', 'Spiral Cable Wrap', 'Automation Logic']
    },
    '12': {
      title: 'Integrasi Modul Display LCD 16x2 Pembaca ID Kartu',
      tag: 'Antarmuka Display & Embedded',
      corp: 'Smart Card Interface',
      image: 'porto12.jpeg',
      description: 'Pengujian antarmuka tampilan karakter LCD 16x2 berlatar biru yang menampilkan status pembacaan kartu pintar ("ID Kartu:"). Mengintegrasikan jalur komunikasi paralel 4-bit / I2C dari mikrokontroler pemroses sinyal.',
      tech: ['LCD 16x2 Karakter', 'Smartcard ID Reader', 'Embedded Interface', 'Paralel/I2C Protocol', 'Real-time Display']
    },
    '13': {
      title: 'Sirkuit Antena Koil Induktif & Mikrokontroler STM8',
      tag: 'Sirkuit RFID & Frekuensi',
      corp: 'High Frequency Induction',
      image: 'porto13.jpeg',
      description: 'Detail sirkuit penginderaan frekuensi nirkabel yang menggabungkan koil antena induktif tembaga melingkar, kristal osilator 8.000 MHz untuk kestabilan clock, serta mikrokontroler STM8 untuk decoding sinyal kartu identitas.',
      tech: ['Koil Antena RFID', 'Crystal 8.000 MHz', 'STM8 Microcontroller', 'Resonant Tuning', 'SMD Capacitors']
    },
    '14': {
      title: 'Perakitan & Wiring Power Amplifier Audio Profesional',
      tag: 'Audio & Elektronika Daya',
      corp: 'Hardware Audio Lab',
      image: 'audioenginer1.jpeg',
      description: 'Dokumentasi perakitan modul penguat daya audio profesional. Mencakup penataan trafo toroid berkapasitas tinggi, kapasitor bank filter daya, sistem pendinginan heatsink bertingkat, serta proteksi speaker untuk menghasilkan keluaran audio bertenaga dan stabil.',
      tech: ['Power Electronics', 'Toroidal Transformer', 'Capacitor Bank Filter', 'Class H/TD Architecture', 'Speaker Protection']
    },
    '15': {
      title: 'Pengujian True RMS & Kalibrasi DSP Audio (51.59 kΩ)',
      tag: 'Pengukuran & Kalibrasi',
      corp: 'True RMS Instrumentation',
      image: 'audioenginer2.jpeg',
      description: 'Pengujian nilai resistansi impedansi output (terbaca 51.59 kΩ pada multimeter digital Pro\'sKit MT-1707 True RMS), kontinuitas jalur sinyal, dan kalibrasi tegangan output pada perangkat audio interface 32-bit 96 kHz 256 DSP guna memastikan integritas sinyal tanpa distorsi.',
      tech: ['Pro\'sKit MT-1707', 'True RMS Multimeter', 'DSP 32-bit 96kHz', 'Impedance 51.59 kΩ', 'Signal Integrity']
    },
    '16': {
      title: 'Video Motion Logo Zain Corp',
      tag: 'Motion Identity',
      corp: 'Official Zain Corp Media',
      isVideo: true,
      video: 'logo.mp4',
      image: 'ZainCorp.jpeg',
      description: 'Video animasi logo resmi Zain Corp sebagai representasi visual identitas modern dalam bidang keteknikan dan inovasi media digital.',
      tech: ['MP4 Video', 'Motion Graphics', 'Zain Corp Official', 'Digital Media']
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalImg = document.getElementById('modalImg');
  const modalVideo = document.getElementById('modalVideo');
  const modalTag = document.getElementById('modalTag');
  const modalCorp = document.getElementById('modalCorp');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');

  function openProjectModal(id) {
    const data = projectsData[id];
    if (!data || !projectModal) return;

    if (data.isVideo) {
      if (modalImg) modalImg.classList.add('d-none');
      if (modalVideo) {
        modalVideo.classList.remove('d-none');
        modalVideo.currentTime = 0;
        modalVideo.play().catch(() => {});
      }
    } else {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.classList.add('d-none');
      }
      if (modalImg) {
        modalImg.classList.remove('d-none');
        modalImg.src = data.image;
      }
    }

    modalTag.textContent = data.tag;
    modalCorp.textContent = data.corp;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalTech.innerHTML = data.tech
      .map(t => `<span class="modal-tech-badge">${t}</span>`)
      .join('');

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playTone(720, 'sine', 0.1, 0.1);
  }

  function closeProjectModal() {
    if (!projectModal) return;
    if (modalVideo) {
      modalVideo.pause();
    }
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalDismissBtn?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* -------------------------------------------------------------
     11. HERO PHOTO SWITCHER (CASUAL <-> STUDIO TECHNICIAN)
  ------------------------------------------------------------- */
  const photoSwitchBtn = document.getElementById('photoSwitchBtn');
  const heroMainImg = document.getElementById('heroMainImage');
  const photoSwitchText = document.getElementById('photoSwitchText');
  let currentPhotoState = 0; // 0: ZainCorp.jpeg, 1: personal.jpeg

  photoSwitchBtn?.addEventListener('click', () => {
    currentPhotoState = currentPhotoState === 0 ? 1 : 0;
    if (heroMainImg) {
      heroMainImg.style.opacity = '0';
      heroMainImg.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (currentPhotoState === 1) {
          heroMainImg.src = 'personal.jpeg';
          heroMainImg.alt = 'Foto Muhammad Zainal Efendi - Teknisi Studio Workwear';
          if (photoSwitchText) photoSwitchText.textContent = 'Foto Casual';
          showToast('Menampilkan Foto Studio Teknisi 🛠️');
        } else {
          heroMainImg.src = 'ZainCorp.jpeg';
          heroMainImg.alt = 'Foto Muhammad Zainal Efendi - Casual Persona';
          if (photoSwitchText) photoSwitchText.textContent = 'Foto Studio';
          showToast('Menampilkan Foto Casual Persona ✨');
        }
        heroMainImg.style.opacity = '1';
        heroMainImg.style.transform = 'scale(1)';
      }, 150);
    }
    playTone(650, 'sine', 0.08, 0.1);
  });

  /* -------------------------------------------------------------
     12. MINI GAME: CIRCUIT SPARK CATCHER
  ------------------------------------------------------------- */
  const gameCanvas = document.getElementById('gameCanvas');
  const gameScoreElem = document.getElementById('gameScore');
  const gameHighScoreElem = document.getElementById('gameHighScore');
  const gameLivesElem = document.getElementById('gameLives');
  const gameStatusText = document.getElementById('gameStatusText');
  const gameStartOverlay = document.getElementById('gameStartOverlay');
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  const gameStartBtn = document.getElementById('gameStartBtn');
  const gameRestartBtn = document.getElementById('gameRestartBtn');
  const finalScoreVal = document.getElementById('finalScoreVal');
  const newHighScoreMsg = document.getElementById('newHighScoreMsg');
  const touchLeftBtn = document.getElementById('touchLeftBtn');
  const touchRightBtn = document.getElementById('touchRightBtn');

  if (gameCanvas) {
    const gctx = gameCanvas.getContext('2d');
    let gameRunning = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('zaincorp_game_high') || '0', 10);
    let lives = 3;
    let items = [];
    let particles = [];
    let lastSpawn = 0;
    let spawnRate = 850;
    let slowTimeUntil = 0;
    let animId = null;

    if (gameHighScoreElem) gameHighScoreElem.textContent = highScore;

    const player = {
      x: gameCanvas.width / 2,
      y: gameCanvas.height - 35,
      width: 95,
      height: 14,
      speed: 9
    };

    const ITEM_TYPES = [
      { type: 'spark', label: '⚡', name: 'Volt', color: '#38bdf8', points: 10, radius: 14, speed: 2.6 },
      { type: 'battery', label: '🔋', name: 'Battery', color: '#34d399', points: 25, radius: 15, speed: 2.9 },
      { type: 'chip', label: '💎', name: 'IC Chip', color: '#a855f7', points: 50, radius: 16, speed: 3.3 },
      { type: 'rac', label: '❄️', name: 'RAC Cool', color: '#06b6d4', points: 30, radius: 15, speed: 2.3, isSlow: true },
      { type: 'surge', label: '⚠️', name: 'Korsleting', color: '#f43f5e', points: -20, radius: 16, speed: 3.5, isHazard: true }
    ];

    let keys = { left: false, right: false };

    window.addEventListener('keydown', (e) => {
      if (!gameRunning) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    });

    gameCanvas.addEventListener('mousemove', (e) => {
      if (!gameRunning) return;
      const rect = gameCanvas.getBoundingClientRect();
      const scaleX = gameCanvas.width / rect.width;
      player.x = (e.clientX - rect.left) * scaleX;
    });

    gameCanvas.addEventListener('touchmove', (e) => {
      if (!gameRunning || !e.touches[0]) return;
      const rect = gameCanvas.getBoundingClientRect();
      const scaleX = gameCanvas.width / rect.width;
      player.x = (e.touches[0].clientX - rect.left) * scaleX;
      e.preventDefault();
    }, { passive: false });

    touchLeftBtn?.addEventListener('touchstart', (e) => { keys.left = true; e.preventDefault(); });
    touchLeftBtn?.addEventListener('touchend', () => { keys.left = false; });
    touchRightBtn?.addEventListener('touchstart', (e) => { keys.right = true; e.preventDefault(); });
    touchRightBtn?.addEventListener('touchend', () => { keys.right = false; });

    touchLeftBtn?.addEventListener('mousedown', () => { keys.left = true; });
    touchLeftBtn?.addEventListener('mouseup', () => { keys.left = false; });
    touchRightBtn?.addEventListener('mousedown', () => { keys.right = true; });
    touchRightBtn?.addEventListener('mouseup', () => { keys.right = false; });

    function spawnItem() {
      const rand = Math.random();
      let selected;
      if (rand < 0.45) selected = ITEM_TYPES[0]; // ⚡
      else if (rand < 0.65) selected = ITEM_TYPES[1]; // 🔋
      else if (rand < 0.78) selected = ITEM_TYPES[2]; // 💎
      else if (rand < 0.88) selected = ITEM_TYPES[3]; // ❄️
      else selected = ITEM_TYPES[4]; // ⚠️ hazard

      items.push({
        ...selected,
        x: Math.random() * (gameCanvas.width - 60) + 30,
        y: -20,
        vy: selected.speed * (0.85 + Math.random() * 0.3)
      });
    }

    function createExplosion(x, y, color) {
      for (let i = 0; i < 14; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6.5,
          vy: (Math.random() - 0.5) * 6.5,
          radius: Math.random() * 3 + 1,
          color: color,
          alpha: 1
        });
      }
    }

    function startGame() {
      score = 0;
      lives = 3;
      items = [];
      particles = [];
      gameRunning = true;
      slowTimeUntil = 0;
      spawnRate = 850;
      if (gameScoreElem) gameScoreElem.textContent = '0';
      if (gameLivesElem) gameLivesElem.textContent = '⚡⚡⚡';
      if (gameStatusText) {
        gameStatusText.textContent = 'Bermain';
        gameStatusText.style.color = 'var(--accent-cyan)';
      }
      gameStartOverlay?.classList.add('hidden');
      gameOverOverlay?.classList.add('hidden');
      newHighScoreMsg?.classList.add('d-none');
      playTone(660, 'triangle', 0.15, 0.2);
      lastSpawn = performance.now();
      if (animId) cancelAnimationFrame(animId);
      requestAnimationFrame(gameLoop);
    }

    function gameOver() {
      gameRunning = false;
      playTone(220, 'sawtooth', 0.4, 0.25);
      if (gameStatusText) {
        gameStatusText.textContent = 'Korsleting!';
        gameStatusText.style.color = 'var(--accent-pink)';
      }
      if (finalScoreVal) finalScoreVal.textContent = score;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem('zaincorp_game_high', String(highScore));
        if (gameHighScoreElem) gameHighScoreElem.textContent = highScore;
        newHighScoreMsg?.classList.remove('d-none');
        playTone(980, 'sine', 0.3, 0.3);
      }

      gameOverOverlay?.classList.remove('hidden');
    }

    function updateGame(now) {
      if (keys.left) player.x -= player.speed;
      if (keys.right) player.x += player.speed;

      const halfW = player.width / 2;
      if (player.x < halfW) player.x = halfW;
      if (player.x > gameCanvas.width - halfW) player.x = gameCanvas.width - halfW;

      const isSlowed = now < slowTimeUntil;
      const currentRate = isSlowed ? spawnRate * 1.5 : spawnRate;
      if (now - lastSpawn > currentRate) {
        spawnItem();
        lastSpawn = now;
        if (spawnRate > 450) spawnRate -= 6;
      }

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += isSlowed ? item.vy * 0.5 : item.vy;

        const hitX = Math.abs(item.x - player.x) < (player.width / 2 + item.radius);
        const hitY = (item.y + item.radius >= player.y) && (item.y - item.radius <= player.y + player.height);

        if (hitX && hitY) {
          createExplosion(item.x, item.y, item.color);

          if (item.isHazard) {
            lives--;
            playTone(180, 'sawtooth', 0.2, 0.2);
            if (gameLivesElem) {
              gameLivesElem.textContent = lives === 2 ? '⚡⚡' : (lives === 1 ? '⚡' : '💀');
            }
            if (lives <= 0) {
              gameOver();
              return;
            }
          } else {
            score += item.points;
            if (gameScoreElem) gameScoreElem.textContent = score;

            if (item.isSlow) {
              slowTimeUntil = now + 5000;
              playTone(750, 'sine', 0.15, 0.2);
              showToast('RAC Chill aktif: Gerakan energi melambat ❄️');
            } else if (item.points === 50) {
              playTone(880, 'triangle', 0.15, 0.2);
            } else {
              playTone(580, 'sine', 0.08, 0.12);
            }
          }

          items.splice(i, 1);
          continue;
        }

        if (item.y > gameCanvas.height + 30) {
          items.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function drawGame() {
      gctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

      // Grid background
      gctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      gctx.lineWidth = 1;
      const gridSize = 38;
      for (let x = 0; x < gameCanvas.width; x += gridSize) {
        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x, gameCanvas.height);
        gctx.stroke();
      }
      for (let y = 0; y < gameCanvas.height; y += gridSize) {
        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(gameCanvas.width, y);
        gctx.stroke();
      }

      // Draw Player Voltage Core
      const px = player.x - player.width / 2;
      const py = player.y;

      gctx.shadowColor = '#38bdf8';
      gctx.shadowBlur = 18;
      gctx.fillStyle = '#38bdf8';
      gctx.beginPath();
      gctx.roundRect(px, py, player.width, player.height, 8);
      gctx.fill();

      const coreGrad = gctx.createLinearGradient(px, py, px + player.width, py);
      coreGrad.addColorStop(0, '#38bdf8');
      coreGrad.addColorStop(0.5, '#ffffff');
      coreGrad.addColorStop(1, '#818cf8');
      gctx.fillStyle = coreGrad;
      gctx.beginPath();
      gctx.roundRect(px + 4, py + 2, player.width - 8, player.height - 4, 6);
      gctx.fill();

      gctx.shadowBlur = 0;

      // Draw Falling Items
      for (let item of items) {
        gctx.shadowColor = item.color;
        gctx.shadowBlur = 14;

        gctx.fillStyle = item.color;
        gctx.beginPath();
        gctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        gctx.fill();

        gctx.shadowBlur = 0;
        gctx.font = '14px sans-serif';
        gctx.textAlign = 'center';
        gctx.textBaseline = 'middle';
        gctx.fillText(item.label, item.x, item.y + 1);
      }

      // Draw Particles
      for (let p of particles) {
        gctx.fillStyle = p.color;
        gctx.globalAlpha = Math.max(0, p.alpha);
        gctx.beginPath();
        gctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        gctx.fill();
        gctx.globalAlpha = 1;
      }
    }

    function gameLoop(now) {
      if (!gameRunning) return;
      updateGame(now);
      drawGame();
      animId = requestAnimationFrame(gameLoop);
    }

    gameStartBtn?.addEventListener('click', startGame);
    gameRestartBtn?.addEventListener('click', startGame);
  }

  /* -------------------------------------------------------------
     13. CONTACT FORM TO MAILTO INTERACTION
  ------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName')?.value.trim();
    const subject = document.getElementById('senderSubject')?.value.trim();
    const message = document.getElementById('senderMessage')?.value.trim();

    if (!name || !subject || !message) {
      showToast('Harap lengkapi semua kolom formulir.');
      return;
    }

    const emailBody = encodeURIComponent(`Halo Muhammad Zainal Efendi,\n\nNama saya: ${name}\n\nTopik: ${subject}\n\nPesan:\n${message}\n\nSalam,\n${name}`);
    const mailtoLink = `mailto:muhzainal980@gmail.com?subject=${encodeURIComponent(subject + ' - Kontak dari ' + name)}&body=${emailBody}`;

    playTone(880, 'sine', 0.15, 0.2);
    showToast('Membuka aplikasi email ke muhzainal980@gmail.com! 🚀');

    setTimeout(() => {
      window.location.href = mailtoLink;
      contactForm.reset();
    }, 700);
  });

  /* -------------------------------------------------------------
     14. NAVBAR SCROLL & BACK TO TOP BUTTON
  ------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playTone(600, 'sine', 0.08, 0.1);
  });

  /* -------------------------------------------------------------
     15. MOBILE MENU TOGGLE
  ------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuOpenIcon = document.getElementById('menuOpenIcon');
  const menuCloseIcon = document.getElementById('menuCloseIcon');

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      menuOpenIcon?.classList.add('d-none');
      menuCloseIcon?.classList.remove('d-none');
    } else {
      menuOpenIcon?.classList.remove('d-none');
      menuCloseIcon?.classList.add('d-none');
    }
  });

  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuOpenIcon?.classList.remove('d-none');
      menuCloseIcon?.classList.add('d-none');
    });
  });

  console.log('🚀 Muhammad Zainal Efendi portfolio & Mini Game initialized. Ready for Vercel.');
});
