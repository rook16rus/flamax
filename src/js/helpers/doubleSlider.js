import Swiper, {Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode} from "swiper/swiper-bundle";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode]);

export default function doubleSlider() {
  const containers = document.querySelectorAll('.js-double-slider-container');

  containers.forEach(container => {
    const slider = container.querySelector('.js-double-slider-main');
    const thumbSlider = container.querySelector('.js-double-slider-thumb');

    const thumbSwiper = new Swiper(thumbSlider, {
      slidesPerView: 1,
      effect: "fade",
      allowTouchMove: false,
      fadeEffect: {
        crossFade: true
      },
    })

    const swiper = new Swiper(slider, {
      slidesPerView: 1,
      thumbs: {
        swiper: thumbSwiper
      },
      navigation: {
        nextEl: container.querySelector('.js-next-slide'),
        prevEl: container.querySelector('.js-prev-slide'),
      },
    })
  })
}
