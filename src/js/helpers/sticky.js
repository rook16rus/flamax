import 'sticksy'

export default function sticky() {
  const elements = document.querySelectorAll('.js-sticky-widget');

  elements.forEach(element => {
    const stickyEl = new Sticksy(element, { topSpacing: 150, listen: true });
  })
}
