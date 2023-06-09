/* ######

Как пользоваться:

Пример:

###### */

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function anchorLinks() {
    const OFFSET = 150;
    const DURATION = 2;
    const scrollByHash = (hash) => {
      let elementToScroll;

      try {
        elementToScroll = document.querySelector(hash)
      } catch {
        elementToScroll = null;
      }

        if (elementToScroll) {
            if (window.menuOpen && typeof window.closeMenu === 'function') {
                window.closeMenu();
            } else if (window.activeModal && typeof window.closeModal === 'function') {
                window.closeModal(window.activeModal);
            }

            gsap.to(window, {
                duration: DURATION,
                ease: 'power2.out',
                scrollTo: {
                    y: elementToScroll,
                    autoKill: false,
                    offsetY: OFFSET,
                },
            });
        } else {
            /*console.error('No element to scroll');*/
        }
    };
    document.addEventListener('click', (event) => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            const url = new URL(link.href);
            const pageUrl = new URL(window.location);

            if (pageUrl.pathname !== url.pathname) return;

            if (hash) {
                event.preventDefault();
                scrollByHash(hash);

              const links = document.querySelectorAll('a');

              links.forEach(link => {
                link.classList.remove('active');
              })

              link.classList.add('active');

              //localStorage.setItem("activeItem", hash);
            }
        }
    });

    if (window.location.hash) {
        scrollByHash(window.location.hash);

        document.querySelectorAll("a").forEach(link => link.classList.remove('active'))

        const activeLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (activeLink) {
          activeLink.classList.add('active')
        }
    }
}
