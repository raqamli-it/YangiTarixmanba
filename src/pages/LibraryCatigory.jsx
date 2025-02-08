import { useEffect, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { useScroll } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import library1 from '../img/libraryCategoriyImages/library1.png';
import { Link } from 'react-router-dom';
export default function LibraryCategory() {
  const { scrollY } = useScroll();
  const [apiData, setApiData] = useState([]);

  useMotionValueEvent(scrollY, 'change', (latest) => {});

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backend.tarixmanba.uz/api/library-categories/',
      );
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container-hero">
        <Breadcrumb catigory="Kutubxona" />

        <section>
          {/* Container */}
          <div className="mx-auto w-full max-w-7xl px-10 py-16 md:px-5 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-4 mb-6 sm:grid-cols-1">
                {apiData?.results?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#14293D] text-white rounded-lg overflow-hidden"
                  >
                    <div className="relative h-80 md:h-70">
                      <img
                        className="h-80 md:h-70 w-full object-cover"
                        src={item.image || library1} // Use image from API, fallback to library1
                        alt={item.title || 'Library'} // Use title from API, fallback to "Library"
                      />
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-[22px] md:text-[18px] font-semibold mt-2">
                          {item.title || 'Default Title'}{' '}
                          {/* Use title from API */}
                        </h2>
                      </div>
                      <Link to={`/libraryDetail/${item?.id}`}>
                        <button className="cursor-pointer h-14 w-14">
                          <svg
                            className="h-14 w-14 md:h-12 md:w-12"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M30.0001 52.5001C42.4265 52.5001 52.5001 42.4265 52.5001 30.0001C52.5001 17.5736 42.4265 7.5 30.0001 7.5C17.5736 7.5 7.5 17.5736 7.5 30.0001C7.5 42.4265 17.5736 52.5001 30.0001 52.5001Z"
                              fill="#14293D"
                              stroke="white"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                            <path
                              d="M31.4297 37.9454L39.375 30L31.4297 22.0547"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.625 30H39.3751"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
