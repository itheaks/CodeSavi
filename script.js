const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.mobile-nav');

menuIcon.addEventListener('click', () => {
mobileNav.classList.toggle('active');
});