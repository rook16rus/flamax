import loadApi from "./loadApi";

export default function contactsMap() {
  let map = document.querySelector('#map');
  if (!map) return;

  const url = `https://api-maps.yandex.ru/2.1/?apikey=${map.dataset.apiKey}&lang=ru_RU`;
  loadApi('yandex', url, () => {
    ymaps.ready(init);
  })

  function init() {
    const mapElement = document.querySelector('#map');
    const zoom = mapElement.dataset.zoom;
    const marker = mapElement.dataset.marker;
    const coords = mapElement.dataset.coordinates.split(',');
    const office = mapElement.dataset.office;
    const address = mapElement.dataset.address;

    map = new ymaps.Map('map', {
      center: [+coords[0], +coords[1] + 0.0002],
      zoom
    }, {
      searchControlProvider: "yandex#search",
      suppressMapOpenBlock: true
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.controls.remove('zoomControl'); // удаляем контрол зума

    addMarker([...coords], map, marker, office, address);
  }

  function addMarker(coords, map, markerIcon, office, address) {
    const marker = new ymaps.Placemark(coords, {
      balloonContent: `
          <div class="balloon">
            <div class="balloon__office">${office}</div>
            <address class="balloon__address">${address}</address>
          </div>
      `
    }, {
      iconLayout: 'default#image',
      iconImageHref: markerIcon,
      iconImageSize: [44, 44],
      iconImageOffset: [-22, -22],
      hideIconOnBalloonOpen: false
    });

    map.geoObjects.add(marker);
  }
}
