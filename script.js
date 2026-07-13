// Image carousel with floating animation
const photoCards = document.querySelectorAll('.photo-card');
let currentImageIndex = 0;

if (photoCards.length > 0) {
  photoCards[currentImageIndex].classList.add('active');
  setInterval(() => {
    photoCards[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % photoCards.length;
    photoCards[currentImageIndex].classList.add('active');
  }, 2000);
}

// Publications gallery interaction
const publications = [
  {
    src: '../pic7.jpeg',
    alt: 'Boeing BUILD 5.0 Regional Champion',
    caption: 'Boeing BUILD 5.0 Regional Champion'
  },
  {
    src: '../pic2.jpeg',
    alt: 'Tech Health News highlight',
    caption: 'Tech Health News • Instrole wearable review'
  },
  {
    src: '../pic3.jpeg',
    alt: 'Movement Science Review highlight',
    caption: 'Movement Science Review • Parkinson’s mobility paper'
  },
  {
    src: '../pic4.jpeg',
    alt: 'Healthcare Today highlight',
    caption: 'Healthcare Today • Fall prediction innovation'
  }
];

const galleryMain = document.querySelector('.gallery-main');
const galleryCaption = document.querySelector('.gallery-caption');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const prevButton = document.querySelector('.gallery-nav.prev');
const nextButton = document.querySelector('.gallery-nav.next');
let galleryIndex = 0;

function updateGallery(index) {
  galleryIndex = index;
  const item = publications[galleryIndex];
  if (!item || !galleryMain || !galleryCaption) return;

  galleryMain.src = item.src;
  galleryMain.alt = item.alt;
  galleryCaption.textContent = item.caption;

  galleryThumbs.forEach((thumb) => {
    const thumbIndex = Number(thumb.dataset.index);
    const active = thumbIndex === galleryIndex;
    thumb.classList.toggle('active', active);
    thumb.setAttribute('aria-selected', String(active));
  });
}

galleryThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    updateGallery(Number(thumb.dataset.index));
  });
});

if (prevButton) {
  prevButton.addEventListener('click', () => {
    updateGallery((galleryIndex - 1 + publications.length) % publications.length);
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    updateGallery((galleryIndex + 1) % publications.length);
  });
}

updateGallery(galleryIndex);

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    const statusDiv = document.getElementById('form-status');
    
    // Construct email subject and body
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Open email client with pre-filled form data
    window.location.href = `mailto:oreejoy@gmail.com?subject=${subject}&body=${body}`;
    
    // Show confirmation message
    statusDiv.textContent = 'Opening your email client... Please complete sending the email from there.';
    statusDiv.style.color = '#10b981';
    statusDiv.style.marginTop = '1rem';
    statusDiv.style.fontSize = '0.95rem';
    
    // Reset form after brief delay
    setTimeout(() => {
      contactForm.reset();
      statusDiv.textContent = '';
    }, 2000);
  });
}
