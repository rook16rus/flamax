import Swiper, {Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode} from "swiper/swiper-bundle";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode]);

export default function introSlider() {
  const intro = document.querySelector('.intro');
  if (!intro) return

  const swiper = new Swiper('.intro__slider', {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: intro.querySelector('.js-next-slide'),
      prevEl: intro.querySelector('.js-prev-slide'),
    },
    pagination: {
      type: "bullets",
      el: intro.querySelector('.slider-pagination')
    }
  })
}
