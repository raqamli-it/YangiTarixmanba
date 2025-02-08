import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// import image
import media1 from '../../img/Кўр, эшит, тингла/media1.jpg';
import media2 from '../../img/Кўр, эшит, тингла/media2.jpg';
import media3 from '../../img/Кўр, эшит, тингла/media3.jpg';
import media4 from '../../img/Кўр, эшит, тингла/media4.jpg';
import media5 from '../../img/Кўр, эшит, тингла/media5.jpg';
import media6 from '../../img/Кўр, эшит, тингла/media6.jfif';

export default function HomeCardMedia() {
  return (
    <div className="media_bg">
      <div className="home__card__container">
        <div className="home__wrapper">
          <div className="home__cards__title">
            <h1>Foto va Video manbalar</h1>

            <button className="button">Barchasi →</button>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              800: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1075: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="home__card">
                <img src={media1} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__card">
                <img src={media2} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__card">
                <img src={media3} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__card">
                <img src={media4} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__card">
                <img src={media5} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__card">
                <img src={media6} alt="" />
                <div className="home__info">
                  <h1>Horseshoe Bend, Arizona</h1>
                  <p>
                    Lorem ipsum is simply dummy text from the printing and
                    typing industry
                  </p>
                  <a href="#" className="home__btn">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
