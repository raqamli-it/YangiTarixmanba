import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import bgPattern from '../../img/bg_pattern.png';
import { DataService } from '../../config/dataService';
import { endpoints } from '../../config/endpoints';

export default function HomeCardsArchi() {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.categoryApi_list);

      setApiData(response);
      console.error('card archi archi !!!!!!!!!!!! :', response.results);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="archi_bg">
      <div className="home__card__container">
        <div className="home__wrapper">
          {apiData?.results?.map((categoryApi) =>
            categoryApi?.resources?.results?.length > 0 ? (
              <div key={categoryApi?.id}>
                <div className="home__cards__title">
                  <h1>{categoryApi?.title}</h1>
                  <Link to={`/sources/archive/${categoryApi?.id}`}>
                    <button className="button">Barchasi →</button>
                  </Link>
                </div>
                {/* Tugmalar uchun unikal sinflar */}
                <div className="relative">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    navigation={{
                      nextEl: `.swiper-button-next-${categoryApi?.id}`,
                      prevEl: `.swiper-button-prev-${categoryApi?.id}`,
                    }}
                    breakpoints={{
                      800: { slidesPerView: 2, spaceBetween: 20 },
                      1075: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {categoryApi?.resources?.results?.map((cat, i) =>
                      i < 6 ? (
                        <SwiperSlide key={cat?.id}>
                          <div className="home-car-card">
                            <article className="card__article-car">
                              <img
                                src={cat?.image}
                                alt="image"
                                onError={(e) => {
                                  e.target.src =
                                    'http://raqamli.tarixmanba.uz/media/media/images/resource/1.jpg'; // Xatolik bo'lsa, tasvirni almashtirish
                                }}
                                className="card__img-car bg-black"
                              />
                              <div className="card__data-car">
                                <h2 className="card__title-car  line-clamp-2">
                                  {cat?.title}
                                </h2>
                                <Link
                                  className="card__button-car"
                                  to={`/cardDetail/${cat.id}`}
                                >
                                  Batafsil
                                </Link>
                              </div>
                            </article>
                          </div>
                        </SwiperSlide>
                      ) : (
                        ''
                      ),
                    )}
                  </Swiper>
                  {/* Tugmalarni joylash */}
                  <button
                    className={`swiper-button-prev swiper-button-prev-${categoryApi?.id}`}
                    aria-label="Previous"
                  ></button>
                  <button
                    className={`swiper-button-next swiper-button-next-${categoryApi?.id}`}
                    aria-label="Next"
                  ></button>
                </div>
              </div>
            ) : (
              ''
            ),
          )}
        </div>
        <div className="Left_pattern">
          <img src={bgPattern} alt="" />
        </div>
      </div>
    </div>
  );
}
