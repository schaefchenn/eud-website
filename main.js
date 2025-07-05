document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Hamburger Menü toggeln
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Optional, falls du Animation möchtest
  });

  // Dropdowns per Klick öffnen/schließen (für mobile)
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');

    trigger.addEventListener('click', e => {
      e.preventDefault(); // verhindert Link-Navigation
      dropdown.classList.toggle('active');
    });
  });
});