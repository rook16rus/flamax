export default function tabsSwipe() {
  const tabsBlock = document.querySelector('.tabs-block');
  if (!tabsBlock || !matchMedia('(max-width: 768px)').matches) return

  const tabsContentsWrapper = tabsBlock.querySelector('.tabs-block__contents');
  const tabsContents = tabsContentsWrapper.querySelectorAll('.tabs-block__content');
  const tabs = tabsBlock.querySelectorAll('.tabs-block__tab');


  tabsContentsWrapper.addEventListener('touchstart', handleTouchStart, false);
  tabsContentsWrapper.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        /* right swipe */
        const activeIndex = [...tabs].findIndex(tab => tab.classList.contains('tab-active'));

        tabs.forEach(tab => tab.classList.remove('tab-active'));
        tabsContents.forEach(tabsContent => tabsContent.classList.remove('active'));

        if (activeIndex + 1 < tabs.length) {
          tabs[activeIndex + 1].classList.add('tab-active');
          tabsContents[activeIndex + 1].classList.add('active');
        } else {
          tabs[0].classList.add('tab-active');
          tabsContents[0].classList.add('active');
        }
      } else {
        /* left swipe */
        const activeIndex = [...tabs].findIndex(tab => tab.classList.contains('tab-active'));

        tabs.forEach(tab => tab.classList.remove('tab-active'));
        tabsContents.forEach(tabsContent => tabsContent.classList.remove('active'));

        if (activeIndex - 1 >= 0) {
          tabs[activeIndex - 1].classList.add('tab-active');
          tabsContents[activeIndex - 1].classList.add('active');
        } else {
          tabs[tabs.length - 1].classList.add('tab-active');
          tabsContents[tabs.length - 1].classList.add('active');
        }
      }
    } else {
      if ( yDiff > 0 ) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}
