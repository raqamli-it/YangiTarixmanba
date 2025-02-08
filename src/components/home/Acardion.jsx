import { useEffect, useState } from 'react';
import bgPattern from '../../img/bg_pattern.png';
import { useNavigate } from 'react-router-dom';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    function handleChange(event) {
      setMatches(event.matches);
    }

    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export default function Acardion() {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backend.tarixmanba.uz/api/category-resource/',
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

  return useMediaQuery('(max-width: 640px)') ? (
    <div className="w-[90%] py-14 mx-auto flex flex-col gap-y-8 md:w-full">
      <div className="wrapper-3d h-[360px] overflow-x-hidden w-full">
        <div className="items-3d">
          {apiData?.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="item-3d h-[300px]"
              tabIndex="0"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <h1
                onClick={() => navigate(`/sources/archive/${item.id}`)}
                className="title-3d text-[20px] text-white font-bold"
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="wrapper-3d h-[360px] overflow-x-hidden w-full">
        <div className="items-3d">
          {apiData?.slice(5, 9).map((item) => (
            <div
              key={item.id}
              className="item-3d h-[300px]"
              tabIndex="0"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <h1
                onClick={() => navigate(`/sources/archive/${item.id}`)}
                className="title-3d text-[20px] text-white font-bold"
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="wrapper-3d h-[360px] overflow-x-hidden w-full">
        <div className="items-3d">
          {apiData?.slice(9, 14).map((item) => (
            <div
              key={item.id}
              className="item-3d h-[300px]"
              tabIndex="0"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <h1
                onClick={() => navigate(`/sources/archive/${item.id}`)}
                className="title-3d text-[20px] text-white font-bold"
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="accardion_pattern">
        <img src={bgPattern} alt="" />
      </div>
    </div>
  ) : (
    <div className="w-[90%] py-14 mx-auto flex flex-col gap-y-8 md:w-full">
      <div className="wrapper-3d h-[360px] overflow-x-hidden w-full">
        <div className="items-3d">
          {apiData?.slice(0, 7).map((item) => (
            <div
              key={item.id}
              className="item-3d h-[300px]"
              tabIndex="0"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <h1
                onClick={() => navigate(`/sources/archive/${item.id}`)}
                className="title-3d text-[20px] text-white font-bold"
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="wrapper-3d h-[360px] overflow-x-hidden w-full">
        <div className="items-3d">
          {apiData?.slice(7, 14).map((item) => (
            <div
              key={item.id}
              className="item-3d h-[300px]"
              tabIndex="0"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <h1
                onClick={() => navigate(`/sources/archive/${item.id}`)}
                className="title-3d text-[20px] text-white font-bold"
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {/* Repeat for other slices */}
      <div className="accardion_pattern">
        <img src={bgPattern} alt="" />
      </div>
    </div>
  );
}
