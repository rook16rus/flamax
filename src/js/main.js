// eslint-disable-next-line import/no-extraneous-dependencies
/*import 'focus-visible';*/
import lazyIMages from './modules/lazyIMages';
import documenReady from './helpers/documenReady';
import initModal from './modules/initModal';
import './helpers/lazyload';

import detectTouch from './helpers/detectTouch';
import setScrollbarWidth from './helpers/setScrollbarWidth';
import anchorLinks from './helpers/anchorLinks';

import initSliders from "./modules/initSliders";
import fancybox from "./helpers/fancybox";
import validation from "./helpers/validation";
import masks from "./helpers/masks";
import yandexMap from "./helpers/yandexMap";
import fileInputs from "./helpers/fileInputs";
import alignHeights from "./modules/alignHeights";
import inputPlaceholder from "./helpers/inputPlaceholder";
import customSelects from "./helpers/customSelects";
import accordions from "./helpers/accordions";
import introSlider from "./helpers/introSlider";
import doubleSlider from "./helpers/doubleSlider";
import tabs from "./helpers/tabs";
import header from "./helpers/header";
import introTopOffset from "./helpers/introTopOffset";
import eventsGallerySlider from "./helpers/eventsGallerySlider";
import sticky from "./helpers/sticky";
import tabsSwipe from "./helpers/tabsSwipe";
import timer from "./helpers/timer";
import navigationList from "./helpers/navigationList";

documenReady(() => {
  window.project_API = { };

  lazyIMages();
  initModal();
  initSliders();

  detectTouch();
  setScrollbarWidth();
  anchorLinks();
  validation();
  // masks();
  fancybox();
  yandexMap();
  fileInputs();
  // inputPlaceholder();
  customSelects();
  accordions();
  introSlider();
  doubleSlider();
  tabs();
  header();
  introTopOffset();
  eventsGallerySlider();
  sticky();
  tabsSwipe();
  timer();
});

document.fonts.ready.then((res) => {
  navigationList();
})

window.addEventListener('load', function () {
  document.body.classList.add('loaded');

  setTimeout(() => {
    document.body.classList.add('animatable')
  }, document.body.dataset.loaderTimer ? document.body.dataset.loaderTimer * 1 : 600);
});

window.addEventListener('resize', () => {
  introTopOffset();
})
