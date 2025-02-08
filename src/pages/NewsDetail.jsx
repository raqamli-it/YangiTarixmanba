import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';

function NewsDetail() {
  const { id } = useParams();
  const [newsApi, setNewsApi] = useState([]);

  const newsData = async () => {
    try {
      const respons = await fetch('https://backend.tarixmanba.uz/api/news/');
      const resp = await respons.json();
      setNewsApi(resp.results);
      console.log(resp, 'Kamoliddin News Page');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsData();
  }, []);

  const newsDataId = newsApi.filter((value) => value.id == id);

  console.log(newsDataId, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');

  const navigate = useNavigate();

  return (
    <div className="py-10 px-5">
      {newsDataId?.map((valueId, idx) => (
        <div
          key={idx}
          className="relative mx-auto w-1/2 xl:w-3/5 lg:w-4/5 md:w-[90%] sm:w-full"
        >
          <img
            className="w-full h-[350px] md:h-[300px]"
            src={valueId.file}
            alt={valueId.file}
          />
          <div className="p-5 flex flex-col h-1/2 text-center gap-5 justify-between bg-[#424242b4] text-white">
            <div className="text-white">
              <p className="text-[20px] text-center font-medium md:text-[18px]">
                {valueId.title}
              </p>
              <p className="text-justify md:text-[12px] mt-3">
                {valueId.content}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="w-32 hover:text-red-600 hover:text-[17px] h-[38px] transition duration-500 ease-in-out transform bg-blue-500 md:w-1/3 flex justify-center font-semibold items-center w-1/5 overflow-hidden"
              >
                Orqaga
              </button>
              <span>
                {format(new Date(valueId.created_time), 'yyyy-MM-dd')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsDetail;
