export default function navigationList() {
  const navigation = document.querySelector('.intro-section .navigation-list');
  if (!navigation) return

  const title = document.querySelector(".page-navigation__title");
  const topNavigation = document.querySelector('.page-navigation');
  const marginTop = title.clientHeight + Number.parseFloat(getComputedStyle(topNavigation).marginBottom);
  const htmlFontSize = parseInt(window.getComputedStyle(document.documentElement).fontSize);

  navigation.style.marginTop = +(-marginTop / htmlFontSize).toFixed(1) + 0.6 + "rem";
}
