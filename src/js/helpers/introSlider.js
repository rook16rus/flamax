import Swiper, {Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode} from "swiper/swiper-bundle";
import gsap from 'gsap';

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode]);

export default function introSlider() {
  const intro = document.querySelector('.intro');
  if (!intro) return

  const tl = gsap.timeline();

  const swiper = new Swiper('.intro__slider', {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: intro.querySelector('.js-next-slide'),
      prevEl: intro.querySelector('.js-prev-slide'),
    },
    autoplay: {
      delay: 10000,
      waitForTransition: false,
      disableOnInteraction: false
    },
    pagination: {
      type: "bullets",
      el: intro.querySelector('.slider-pagination'),
      renderBullet: (index, className) => {
        return `<span class="${className}"><div class="slider-pagination__bullet-progressbar"></div></span>`
      }
    }
  })

  runProgressbar();
  swiper.on('slideChangeTransitionStart', runProgressbar);

  function runProgressbar() {
    tl.restart();
    tl.clear();

    const progressbar = intro.querySelector('.swiper-pagination-bullet-active .slider-pagination__bullet-progressbar');
    tl.to(progressbar, {
      transform: "scaleX(1)",
      duration: 10,
      ease: "none"
    })
  }
}
