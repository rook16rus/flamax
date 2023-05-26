export default function header() {
  const header = document.querySelector('.header');
  if (!header) return

  const pageWrapper = document.querySelector('.page-wrapper');
  const intro = document.querySelector('.js-intro-block');

  /*const burger = document.querySelector('.header__burger');
  const mobileNavigation = document.querySelector('.header__mobile')

  burger.addEventListener('click', function (e) {
    e.currentTarget.classList.toggle('active');
    mobileNavigation.classList.toggle('active');
    header.classList.toggle('active');
  })*/


  if (intro) {
    intro.style.setProperty('--header-height', header.clientHeight + 'px');
  } else {
    pageWrapper.style.setProperty('--header-height', header.clientHeight + 'px');
  }

  // window.addEventListener('scroll', () => {
  //   if (header.getBoundingClientRect().top > document.documentElement.getBoundingClientRect().top) {
  //     header.classList.add('header--fixed');
  //   } else {
  //     header.classList.remove('header--fixed');
  //   }
  // });
}
