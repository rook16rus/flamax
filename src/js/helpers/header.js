export default function header() {
  const header = document.querySelector('.header');
  const pageWrapper = document.querySelector('.page-wrapper');

  /*const burger = document.querySelector('.header__burger');
  const mobileNavigation = document.querySelector('.header__mobile')

  burger.addEventListener('click', function (e) {
    e.currentTarget.classList.toggle('active');
    mobileNavigation.classList.toggle('active');
    header.classList.toggle('active');
  })*/

  pageWrapper.style.setProperty('--header-height', header.clientHeight + 'px')

  window.addEventListener('scroll', () => {
    if (header.getBoundingClientRect().top > document.documentElement.getBoundingClientRect().top) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }
  });
}
