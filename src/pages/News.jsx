import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function News() {
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
  return (
    <>
      <Breadcrumb catigory={'Yangiliklar'} />

      <div className="mx-auto max-w-[1200px] grid gap-y-10 py-10 grid-cols-4 gap-5 px-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 md:w-4/5 sm:w-full">
        {newsApi?.map((value, idx) => (
          <div key={idx} className="h-[400px] relative">
            <div className="p-5 flex flex-col h-1/2 gap-10 justify-between bg-[#424242b4] text-white">
              <Link to="/" className="text-[18px] font-medium line-clamp-2">
                {value.title}
              </Link>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span>Yangiliklar</span>
                  <span>
                    {format(new Date(value.created_time), 'yyyy-MM-dd')}
                  </span>
                </div>
                <Link
                  to={`/news/newsDetail/${value.id}`}
                  className="bg-blue-500 px-5 flex items-center rounded-[12px] h-[38px]"
                >
                  Batafsil
                </Link>
              </div>
            </div>
            <img
              className="w-full h-[200px] absolute bottom-0"
              src={value.file}
              alt={value.file}
            />
          </div>
        ))}
      </div>
    </>
  );
}
export default News;
