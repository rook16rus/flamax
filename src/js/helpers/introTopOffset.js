export default function introTopOffset() {
  const intro = document.querySelector('.intro');
  if (!intro) return

  const header = document.querySelector('header');
  header.classList.remove("header--white");

  const pageWrapper = document.querySelector('.page-wrapper');
  pageWrapper.style.paddingTop = "";

  if (!matchMedia('(max-width: 1024px)').matches) return;


  pageWrapper.style.paddingTop = "0px";


  header.classList.add("header--white");
}
