//import { YMaps, Map, Placemark } from 'react-yandex-maps';

const CardDetailMap = ({ location }) => {
  const mapState = {
    center:
      location && location.length > 0
        ? [parseFloat(location[0].latitude), parseFloat(location[0].longitude)]
        : [0, 0],
    zoom: 5,
  };
  const markers = location || [];

  return (
    <></>
    // <YMaps query={{ apikey: `efc8f45d-1ac0-4e45-832e-dc6fa8cf7f5d` }}>
    //   <Map defaultState={mapState} width="70%" height="500px">
    //     {markers.map((loc) => (
    //       <Placemark
    //         key={loc.id}
    //         geometry={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
    //         properties={{
    //           balloonContentHeader: loc.title,
    //           balloonContentBody: loc.title,
    //           balloonContentFooter: "qisqa ma'lumot", // Optional footer content
    //         }}
    //         options={{
    //           preset: 'islands#icon',
    //           iconColor: '#0095b6',
    //         }}
    //         modules={['geoObject.addon.balloon']}
    //       />
    //     ))}
    //   </Map>
    // </YMaps>
  );
};

export default CardDetailMap;
