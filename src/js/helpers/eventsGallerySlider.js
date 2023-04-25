import Swiper, {Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode, Scrollbar} from "swiper/swiper-bundle";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation, Grid, FreeMode, Scrollbar]);

export default function eventsGallerySlider() {
  const section = document.querySelector('.events-gallery')
  if (!section) return

  const swiper = new Swiper(".events-gallery__slider", {
    slidesPerView: "auto",
    spaceBetween: 0,
    breakpoints: {
      769: {
        spaceBetween: 76
      }
    },
    navigation: {
      nextEl: section.querySelector('.js-next-slide'),
      prevEl: section.querySelector('.js-prev-slide'),
    },
    scrollbar: {
      el: section.querySelector('.swiper-scrollbar'),
    },
  })
}
