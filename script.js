/* ============================================================
   MUTHUPANDI M — PORTFOLIO  |  script.js
   ============================================================ */

'use strict';

/* ---- UTILITY HELPERS ---- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   1. NAVBAR — SCROLL EFFECTS + SPY LINK HIGHLIGHTING
   ============================================================ */
(function initNavbar() {
  const navbar    = $('#navbar');
  const navItems  = $$('.nav-item');
  const sections  = $$('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const midPoint = window.scrollY + window.innerHeight * 0.35;
    let currentSectionId = sections[0]?.id ?? '';

    sections.forEach(sec => {
      if (sec.offsetTop <= midPoint) {
        currentSectionId = sec.id;
      }
    });

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('active', href === `#${currentSectionId}`);
    });
  }

  updateActiveLink();
})();

/* ============================================================
   2. MOBILE MENU NAVIGATION
   ============================================================ */
(function initMobileNav() {
  const navToggle = $('#navToggle');
  const navLinks  = $('#navLinks');
  const navItems  = $$('.nav-item');

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinks && navToggle && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ============================================================
   3. SCROLL REVEAL EFFECT
   ============================================================ */
(function initScrollReveal() {
  const revealTargets = [
    'section > .container',
    '.edu-card',
    '.exp-card',
    '.skill-card',
    '.proj-card',
    '.cert-card',
    '.achieve-card',
    '.patent-card',
    '.contact-card',
    '.contact-form-card'
  ];

  revealTargets.forEach(sel => {
    $$(sel).forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(index % 3) * 60}ms`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  $$('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   4. TOAST NOTIFICATION SYSTEM
   ============================================================ */
const toast = $('#toast');
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ============================================================
   5. CLICK-TO-COPY FOR PHONE & EMAIL
   ============================================================ */
(function initContactCopy() {
  const emailCard = $('#emailCard');
  const phoneCard = $('#phoneCard');

  emailCard?.addEventListener('click', () => {
    const email = 'm.muthupandi2327@gmail.com';
    navigator.clipboard.writeText(email)
      .then(() => showToast('✓ Email address copied to clipboard'))
      .catch(() => showToast(`Copy failed. Email: ${email}`));
  });

  phoneCard?.addEventListener('click', () => {
    const phone = '+919363372647';
    navigator.clipboard.writeText(phone)
      .then(() => showToast('✓ Phone number copied to clipboard'))
      .catch(() => showToast(`Copy failed. Phone: ${phone}`));
  });
})();



/* ============================================================
   8. MODAL CONTROLS & BACKDROP
   ============================================================ */
const backdrop = $('#backdrop');
const allModals = $$('.modal');

function openModal(modalId) {
  const targetModal = $(`#${modalId}`);
  if (!targetModal) return;

  backdrop?.classList.add('open');
  targetModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  backdrop?.classList.remove('open');
  allModals.forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

backdrop?.addEventListener('click', closeAllModals);
$$('.modal__close').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

/* ---- Project Modal Content Map ---- */
const projectData = {
  'grass-cutting': {
    title: 'Grass Cutting Robot',
    tag: 'Robotics & Automation',
    tech: 'Arduino, DC Motors, Motor Driver, Ultrasonic Sensor, Servo Motor, Bluetooth Module',
    outcome: `Autonomous Grass-Cutting Robot Using Embedded Systems

This project focuses on the design and development of a smart grass-cutting robot using Arduino and mechatronics principles. The system integrates DC motors, a motor driver, ultrasonic sensor, servo motor, and Bluetooth module to enable efficient navigation and cutting operations.

The robot can be controlled via a mobile application using Bluetooth, allowing movement control (forward, backward, left, right) and activation of the cutting mechanism. An ultrasonic sensor is used for obstacle detection, ensuring safe operation by stopping the robot when an object is detected. A servo motor enables adjustment of cutting blade height.

The project was developed through stages including problem identification, ideation, prototyping, and testing. Compared to traditional machines, this model offers improved efficiency, portability, and ease of use.

Key Features:
- Bluetooth-based remote control
- Obstacle detection using ultrasonic sensor
- Adjustable cutting mechanism
- Four-wheel drive system
- Compact and portable design

Limitations:
- Limited Bluetooth range
- Increased system complexity

This project demonstrates practical application of embedded systems, robotics, and automation in solving real-world problems.`
  },
  'lpg-monitor': {
    title: 'Smart LPG Gas Level Monitoring System',
    tag: 'IoT & Automation',
    tech: 'HX711 Load Cell, Gas Sensor, Arduino, Status LEDs, Alert buzzer',
    outcome: `Smart LPG Gas Level Monitoring System

This project is designed to monitor LPG cylinder levels in real-time using a load cell and Arduino-based embedded system. It measures the remaining gas weight, calculates usage, and provides early alerts to prevent unexpected gas shortages.

The system integrates an HX711 load cell module for weight measurement and a gas sensor for leak detection, ensuring both efficiency and safety. Real-time data is displayed, and alerts are generated when gas levels are low or leakage is detected.

Key Features:
- Real-time LPG level monitoring using load cell
- Gas leakage detection for safety
- Low-level alert system
- Consumption tracking and estimation
- User-friendly display interface

Applications:
- Domestic gas monitoring
- Smart home safety systems

This project demonstrates practical implementation of embedded systems, IoT concepts, and safety automation.`
  },
  'gesture-fan': {
    title: 'Hand Gesture Controlled Fan Speed System',
    tag: 'Embedded Systems',
    tech: 'Webcam, OpenCV, Python, Serial Communication, Arduino, Motor Driver',
    outcome: `Hand Gesture Controlled Fan Speed System

This project demonstrates a contactless fan speed control system using hand gesture recognition. It combines computer vision and embedded systems to enable smart and hygienic automation.

The system uses a webcam and OpenCV to detect predefined hand gestures in real time. These gestures are processed using Python and transmitted to an Arduino via serial communication, which controls the fan speed through a motor driver.

Key Features:
- Contactless control using hand gestures
- Real-time gesture detection using OpenCV
- Arduino-based fan speed regulation
- Multi-level speed control (low, medium, high)
- Serial communication between Python and hardware

Applications:
- Smart homes
- Healthcare environments
- Industrial automation systems

This project demonstrates the integration of computer vision and embedded systems for intelligent human-machine interaction.`
  },
  'welding-ml': {
    title: 'Welding Defect Detection Using Machine Learning',
    tag: 'Machine Learning & AI',
    tech: 'Python, OpenCV, YOLOv8 Object Detection Model, Google Colab, Roboflow Annotation',
    outcome: `Welding Defect Detection Using Machine Learning

This project focuses on automating the detection of welding defects using an AI-based computer vision system. It replaces traditional manual inspection methods with a more accurate, efficient, and consistent deep learning approach.

The system utilizes the YOLOv8 object detection model trained on a custom dataset to identify welding defects such as cracks, porosity, and undercuts. The model is trained using Google Colab, with dataset preparation done using Roboflow.

Key Features:
- AI-based weld defect detection using YOLOv8
- Real-time inspection using camera input
- Detection of cracks, porosity, and undercuts
- Cloud-based model training
- Dataset annotation using Roboflow

Advantages:
- Reduces manual inspection dependency
- Improves accuracy and consistency
- Low-cost portable inspection system
- Faster industrial quality checking

Impact:
- Enhances welding quality
- Reduces rework and material waste
- Improves industrial productivity`
  },
  'onion-storage': {
    title: 'Smart Onion Storage System',
    tag: 'Smart Agriculture',
    tech: 'IoT Humidity/Temperature Sensors, Ultrasonic Misting, Bamboo, Lime Plaster',
    outcome: `Smart Onion Storage System

This project presents a sustainable IoT-based storage system for onions designed to reduce post-harvest losses by maintaining optimal temperature and humidity conditions.

The system uses sensors for monitoring and an ultrasonic misting system for environmental control. The structure is built using eco-friendly materials like bamboo and lime plaster for natural cooling.

Key Features:
- IoT-based temperature and humidity monitoring
- Ultrasonic misting system
- Eco-friendly storage structure
- Real-time automation control
- Sensor-based feedback system

Innovation:
- Combination of traditional materials with IoT
- Low-cost agricultural solution
- Sustainable engineering approach

Impact:
- Reduces onion spoilage
- Extends storage life
- Improves farmer income
- Environment-friendly solution`
  }
};

window.openProject = function(key) {
  const data = projectData[key];
  if (!data) return;

  $('#pm-tag').textContent = data.tag;
  $('#pm-title').textContent = data.title;
  $('#pm-tech').textContent = data.tech;
  $('#pm-outcome').textContent = data.outcome;

  openModal('projectModal');
};

/* ---- Certificate Modal Content Map ---- */
const certData = {
  'c1': {
    title: 'Welding Metallurgy',
    issuer: 'NPTEL / SWAYAM',
    img: 'https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?auto=format&fit=crop&w=400&q=80'
  },
  'c2': {
    title: 'Automation in Manufacturing',
    issuer: 'NPTEL / SWAYAM',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
  },
  'c3': {
    title: 'Metal Additive Manufacturing',
    issuer: 'NPTEL / SWAYAM',
    img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=400&q=80'
  },
  'c4': {
    title: 'Automotive Electrical – Bosch',
    issuer: 'Bosch',
    img: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=400&q=80'
  },
  'c5': {
    title: 'Software Development',
    issuer: 'Online Certification',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
  },
  'c6': {
    title: 'Computer Application Course',
    issuer: 'Institutional',
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80'
  }
};

window.openCert = function(key) {
  const data = certData[key];
  if (!data) return;

  $('#cm-title').textContent = data.title;
  $('#cm-issuer').textContent = data.issuer;
  
  // Use user-uploaded certificate custom image if it exists, otherwise fall back to placeholder
  const index = key.replace('c', '');
  const customImg = document.getElementById(`cert-img-${index}`);
  const modalImg = $('#cm-img');

  if (customImg && customImg.style.display !== 'none' && customImg.src) {
    modalImg.src = customImg.src;
  } else {
    modalImg.src = data.img;
  }

  openModal('certModal');
};

/* ============================================================
   9. INTERACTIVE CONTACT FORM SUBMISSION WITH VALIDATIONS
   ============================================================ */
(function initContactForm() {
  const form = $('#portfolioContactForm');
  const submitBtn = $('#submitBtn');
  const loader = $('#formLoader');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = $('#contactName');
    const emailInput = $('#contactEmail');
    const messageInput = $('#contactMessage');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Check empty fields
    if (!name || !email || !message) {
      showToast('⚠ Please fill in all required fields.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('⚠ Please enter a valid email address.');
      return;
    }

    // Trigger loading spinner and disable submit button
    if (loader) loader.style.display = 'block';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Simulate sending form details (1.5 seconds)
    setTimeout(() => {
      // Hide loader and restore button state
      if (loader) loader.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }

      // Reset form and prompt success message
      showToast('✓ Message sent successfully!');
      form.reset();
    }, 1500);
  });
})();

/* ============================================================
   10. DYNAMIC COPYRIGHT YEAR
   ============================================================ */
(function setFooterYear() {
  const yearPlaceholder = $('.footer__copy');
  if (yearPlaceholder) {
    const currentYear = new Date().getFullYear();
    yearPlaceholder.innerHTML = `&copy; ${currentYear} All Rights Reserved`;
  }
})();
