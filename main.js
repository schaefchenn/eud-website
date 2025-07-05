document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Hamburger Menü toggeln
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // optional für Animation
  });

  // Dropdowns per Klick öffnen/schließen (für mobile)
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');

    trigger.addEventListener('click', e => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  });

  // Dropdown und Hamburger schließen beim Scrollen
  window.addEventListener('scroll', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  });
});