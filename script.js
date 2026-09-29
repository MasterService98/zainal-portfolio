/**
 * MUHAMMAD ZAINAL EFENDI - PORTFOLIO & PERSONAL BIO INTERACTIVITY
 * Zain Corp Studio | Ready for Vercel Deployment
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
    // Format to WIB (Asia/Jakarta)
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
     3. DYNAMIC TYPING ROTATOR
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
      typingSpeed = 50;
    } else {
      typingElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
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
      // Audio autoplay policy catch
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

    const hoverTargets = document.querySelectorAll('a, button, .bento-card, .project-card, .photo-frame');
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
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * 3;
            const dirY = (dy / dist) * force * 3;
            this.x -= dirX;
            this.y -= dirY;
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
     10. PROJECT FILTERS & MODAL PREVIEW
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
          card.style.animation = 'fadeInUpAnim 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Data for Modal Preview
  const projectsData = {
    '1': {
      title: 'Perakitan & Wiring Power Amplifier Audio',
      tag: 'Audio & Elektronika Daya',
      corp: 'Hardware Lab',
      image: 'audioenginer1.jpeg',
      description: 'Dokumentasi perakitan modul penguat daya audio profesional. Mencakup penataan trafo toroid berkapasitas tinggi, kapasitor bank filter daya, sistem pendinginan heatsink bertingkat, serta proteksi speaker untuk menghasilkan keluaran audio bertenaga dan stabil.',
      tech: ['Power Electronics', 'PCB Circuit Design', 'Toroidal Transformer', 'Capacitor Bank Filter', 'Class H/TD Architecture']
    },
    '2': {
      title: 'Pengujian True RMS & Kalibrasi DSP Audio Interface',
      tag: 'Pengukuran & Kalibrasi',
      corp: 'Audio Instrumentation',
      image: 'audioenginer2.jpeg',
      description: 'Pengujian nilai resistansi impedansi output (terbaca 51.59 kΩ pada multimeter digital Pro\'sKit MT-1707 True RMS), kontinuitas jalur sinyal, dan kalibrasi tegangan output pada perangkat audio interface 32-bit 96 kHz 256 DSP guna memastikan integritas sinyal tanpa distorsi.',
      tech: ['True RMS Multimeter', 'Pro\'sKit MT-1707', 'DSP 32-bit 96kHz', 'Impedance & Continuity Testing']
    },
    '3': {
      title: 'Sistem Refrigerasi & Air Conditioning (RAC)',
      tag: 'RAC & Tata Udara',
      corp: 'HVAC-R Field',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&auto=format&fit=crop&q=80',
      description: 'Pemeliharaan dan penanganan instalasi sistem tata udara & pendingin ruangan, mencakup pengelasan pemipaan tembaga, proses pemvakuman sistem tertutup untuk membuang uap air, pengukuran tekanan kerja refrigeran dengan manifold gauge, serta pengecekan ampere kompresor.',
      tech: ['Siklus Refrigerasi', 'AC Split & Inverter', 'Vacuum Evacuation', 'Manifold Pressure Testing', 'Electrical Control Wiring']
    },
    '4': {
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
     11. CONTACT FORM TO MAILTO INTERACTION
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
     12. NAVBAR SCROLL & BACK TO TOP BUTTON
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
     13. MOBILE MENU TOGGLE
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

  // Close mobile nav when clicking a link
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuOpenIcon?.classList.remove('d-none');
      menuCloseIcon?.classList.add('d-none');
    });
  });

  console.log('🚀 Muhammad Zainal Efendi portfolio initialized successfully. Ready for Vercel deployment.');
});
