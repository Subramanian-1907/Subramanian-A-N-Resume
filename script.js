document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animation on page load
  document.body.style.opacity = '1';

  // Highlight active navbar link based on current URL
  const navLinks = document.querySelectorAll('nav.navbar a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Smooth page transition: fade out on nav click, then navigate
  navLinks.forEach(link => {
    if (
      !link.href.startsWith('mailto:') &&
      !link.href.startsWith('http') &&
      !link.href.startsWith('javascript:')
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.body.style.transition = 'opacity 0.4s ease-in-out';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    }
  });

  // Back To Top button behavior
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => (backToTopBtn.style.display = 'none'), 300);
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Floating labels on contact form inputs and textarea
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

  inputs.forEach(input => {
    const parent = input.parentNode;

    // Initialize label state on page load (in case input has value)
    if (input.value.trim() !== '') {
      parent.classList.add('focused');
    }

    input.addEventListener('focus', () => {
      parent.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        parent.classList.remove('focused');
      }
    });
  });

  // Simple client-side validation UI feedback for contact form
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      let isValid = true;
      form.querySelectorAll('input, textarea').forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          input.parentNode.classList.add('error-visible');
        } else {
          input.parentNode.classList.remove('error-visible');
        }
      });
      if (!isValid) e.preventDefault();
    });
  }
});
