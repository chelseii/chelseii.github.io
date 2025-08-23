function scrollToPosition(postValue) {
    window.scrollTo({
        top: postValue,   
        behavior: 'smooth'  
    });
}

//-------Menu Buttons-------//
const sections = [
  { link: '#homeLink',      el: document.querySelector('.intro-box-container'), dot: '#dot1' },
  { link: '#aboutLink',     el: document.querySelector('.aboutme-container'),   dot: '#dot2' },
  { link: '#projectsLink',  el: document.querySelector('.projects-container'),  dot: '#dot3' },
  { link: '#experienceLink',el: document.querySelector('.experience-container'),dot: '#dot4' },
];

const HEADER_OFFSET = 10; 

function scrollToSection(el) {
  const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Attach menu link click handlers
sections.forEach(s => {
  const a = document.querySelector(s.link);
  if (!a || !s.el) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    scrollToSection(s.el);
  });
});

//-------Left Side Dots-------//
const dots = document.querySelectorAll('.dot');
function setActiveDot(sel) {
  dots.forEach(d => d.classList.remove('active'));
  const dot = document.querySelector(sel);
  if (dot) dot.classList.add('active');
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const match = sections.find(s => s.el === entry.target);
      if (match) setActiveDot(match.dot);
    }
  });
}, {
  root: null,
  rootMargin: "-20% 0px -70% 0px",  // triggers earlier
  threshold: 0                      
});

// observe all our sections
sections.forEach(s => s.el && io.observe(s.el));

// fallback if too short or iOS bug
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  let active = sections[0];
  for (const s of sections) {
    if (!s.el) continue;
    if (s.el.offsetTop <= scrollPos) active = s;
  }
  setActiveDot(active.dot);
});

//-------Project Modals-------//
function openModal(id) {
    document.getElementById(id).style.display = "block";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }


// arrays for each modal
const modalImageSets = {
    modalImage1: [
        "images/eyestrain/eyestrain1.png",
        "images/eyestrain/eyestrain2.png",
        "images/eyestrain/eyestrain3.png",
        "images/eyestrain/eyestrain4.png",
        "images/eyestrain/eyestrain5.png",
        "images/eyestrain/eyestrain6.png"
    ],
    modalImage2: [
        "images/movieapp/movieapp1.png",
        "images/movieapp/movieapp2.png",
        "images/movieapp/movieapp3.png",
        "images/movieapp/movieapp4.png",
        "images/movieapp/movieapp5.png",
        "images/movieapp/movieapp6.png"
    ],
    modalImage3: [
        "images/geodesk/geodeskgif1.mp4"
    ]
};

// indexes for each gallery
const modalCurrentIndexes = {
    modalImage1: 0,
    modalImage2: 0
};

function showImage(imgId) {
    const imageElement = document.getElementById(imgId);
    if (imageElement) {
        const index = modalCurrentIndexes[imgId];
        imageElement.src = modalImageSets[imgId][index];
    }
}

function nextImage(imgId) {
    modalCurrentIndexes[imgId] =
        (modalCurrentIndexes[imgId] + 1) % modalImageSets[imgId].length;
    showImage(imgId);
}

function prevImage(imgId) {
    modalCurrentIndexes[imgId] =
        (modalCurrentIndexes[imgId] - 1 + modalImageSets[imgId].length) %
        modalImageSets[imgId].length;
    showImage(imgId);

}

