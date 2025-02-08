import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import dateFormat from 'dateformat';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';

import weather_cloud from '../img/weather-cloude-sun.svg';
import rain from '../img/rain-16.png';
import sun from '../img/weather-cloude-sun.svg';
import cloud from '../img/cloud.png';
import snow from '../img/snow.png';

function WeatherSide({ t }) {
  const regionObj = {
    tashkent: 'Toshkent',
    andijan: 'Andijon',
    bukhara: 'Buxoro',
    urgench: 'Urganch',
    samarkand: 'Samarqand',
    nurafshon: 'Nurafshon',
    nukus: 'Nukus',
    navoiy: 'Navoi',
    namangan: 'Namangan',
    jizzakh: 'Jizzax',
    gulistan: 'Guliston',
    fergana: "Farg'ona",
    termez: 'Termiz',
    qarshi: 'Qarshi',
  };

  const [city, setCity] = useState();
  const [daily, setDaily] = useState();
  useEffect(() => {
    fetch(
      `https://www.meteo.uz/index.php/forecast/map?date=${dateFormat(
        new Date(),
        'yyyy-mm-dd',
      )}&day_part=day&expand=city`,
      { headers: { Accept: 'application/json' } },
    )
      .then((data) => data.json())
      .then((res) => {
        setCity(Object.keys(res));
        let arr = [];
        for (let key in res) {
          let obj = res[key];
          obj['name'] = regionObj[key];
          arr.push(obj);
        }

        setDaily(arr);
      });
  }, []);

  return (
    <div className="weather__row" style={{ width: 300, marginRight: 30 }}>
      <div className="col-lg-12" style={{ justifyContent: 'flex-end' }}>
        <Swiper
          // direction="vertical"
          width={250}
          effect="slide"
          speed={1000}
          // height={10}
          className="swiper-wrapper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          modules={[Autoplay]}
          spaceBetween={30}
        >
          {daily?.slice(0, 14).map((res, i) => (
            <SwiperSlide key={i}>
              <div className="weater-wrap">
                <p>{t(res.name)}</p>
                <div className="div-weater">
                  {res.icon == 'partly_cloudy' ? (
                    <img src={weather_cloud} />
                  ) : res.icon == 'rain' ? (
                    <img src={rain} />
                  ) : res.icon == 'mostly_clear' ? (
                    <img src={sun} />
                  ) : res.icon == 'fog' ? (
                    <img src={cloud} />
                  ) : res.icon == 'snow' ? (
                    <img src={snow} />
                  ) : (
                    <img src={weather_cloud} />
                  )}
                  <p>
                    {Math.floor(res?.air_t_min) > 0
                      ? '+' + Math.floor(res?.air_t_min) + '°'
                      : Math.floor(res?.air_t_min) < 0
                      ? `${Math.floor(res?.air_t_min)}°`
                      : Math.floor(res?.air_t_min) + '°'}
                  </p>
                  <p>...</p>
                  <p>
                    {Math.floor(res?.air_t_max) > 0
                      ? '+' + Math.floor(res?.air_t_max) + '°'
                      : Math.floor(res?.air_t_max) < 0
                      ? `${Math.floor(res?.air_t_max)}°`
                      : Math.floor(res?.air_t_max) + '°'}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default withTranslation()(WeatherSide);
