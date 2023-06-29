import loadApi from "./loadApi";

export default function contactsMap() {
  let map = document.querySelector('#map');
  if (!map) return;

  const url = `https://api-maps.yandex.ru/2.1/?apikey=${map.dataset.apiKey}&lang=ru_RU`;
  loadApi('yandex', url, async () => {
    const url = map.dataset.url;

    const request = await fetch(url);
    const json  = await request.json();

    ymaps.ready(() => {
      init(json);
    })
  })

  function init(data) {
    const mapElement = document.querySelector('#map');
    const zoom = mapElement.dataset.zoom;
    const marker = mapElement.dataset.marker;
    const coords = mapElement.dataset.coordinates.split(',');

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

    const clusterer = new ymaps.Clusterer({
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
      preset: 'islands#invertedRedClusterIcons'
    })

    data.forEach(place => {
      clusterer.add(addMarker(
        place.coords.split(','),
        map,
        marker,
        place.office,
        place.address,
        place.link
      ));
    })

    map.geoObjects.add(clusterer);
  }

  function addMarker(coords, map, markerIcon, office, address, link) {
    const marker = new ymaps.Placemark(coords, {
      balloonContent: `
          <div class="balloon">
            <div class="balloon__office">${office}</div>
            <address class="balloon__address">${address}</address>
            <a class="balloon__link button button--big button--red" href="${link}">Подробнее</a>
          </div>
      `
    }, {
      iconLayout: 'default#image',
      iconImageHref: markerIcon,
      iconImageSize: [44, 44],
      iconImageOffset: [-22, -22],
      hideIconOnBalloonOpen: false
    });

    return marker
  }
}
