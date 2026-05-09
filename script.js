const themeToggle = document.getElementById('themeToggle');
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const form = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const yearLabel = document.getElementById('currentYear');

function setCurrentYear() {
  if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

function toggleMenu() {
  nav.classList.toggle('open');
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.site-nav a[href="#${sectionId}"]`);

    if (!link) return;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formFeedback.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const subject = encodeURIComponent(`Contato via portfólio: ${name}`);
  const body = encodeURIComponent(`Nome: ${name}%0AEmail: ${email}%0A%0A${message}`);
  window.location.href = `mailto:wes.tiago15@gmail.com?subject=${subject}&body=${body}`;
  formFeedback.textContent = 'Abrindo seu cliente de email...';
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

if (form) {
  form.addEventListener('submit', handleFormSubmit);
}

window.addEventListener('scroll', () => {
  updateActiveLink();
  revealOnScroll();
});

window.addEventListener('load', () => {
  setCurrentYear();
  revealOnScroll();
  updateActiveLink();
});

