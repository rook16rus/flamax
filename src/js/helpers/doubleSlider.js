import Swiper, {Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode} from "swiper/swiper-bundle";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode]);

export default function doubleSlider() {
  const containers = document.querySelectorAll('.js-double-slider-container');

  containers.forEach(container => {
    const slider = container.querySelector('.js-double-slider-main');
    const thumbSlider = container.querySelector('.js-double-slider-thumb');

    const thumbSwiper = new Swiper(thumbSlider, {
      slidesPerView: "auto",
      effect: "fade",
      allowTouchMove: false,
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      breakpoints: {
        768: {
          slidesPerView: 1
        }
      }
    })

    const swiper = new Swiper(slider, {
      slidesPerView: "auto",
      thumbs: {
        swiper: thumbSwiper
      },
      navigation: {
        nextEl: container.querySelector('.js-next-slide'),
        prevEl: container.querySelector('.js-prev-slide'),
      },
      pagination: {
        type: "bullets",
        el: container.querySelector('.slider-pagination')
      },
      breakpoints: {
        768: {
          slidesPerView: 1
        }
      }
    })
  })
}
