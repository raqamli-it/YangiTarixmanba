import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from '../config/dataService';
import { endpoints } from '../config/endpoints';
import { IoMdEye } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { FaPlay, FaStar } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import SkletonFilter from '../components/SkletonFilter';
import { LuRotate3D } from 'react-icons/lu';
import { FaGlobeAmericas } from 'react-icons/fa';
import { GrTextWrap } from 'react-icons/gr';
import { BiSolidVideos } from 'react-icons/bi';
import { FaImages } from 'react-icons/fa';
import { PiFileAudioFill } from 'react-icons/pi';
import { IoCloseOutline } from 'react-icons/io5';
import { CiPause1 } from 'react-icons/ci';
import { TiArrowLoop } from 'react-icons/ti';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardDetailMap from '../components/CardDetailMap';
import { saveAs } from 'file-saver';
import VideoLink from '../components/VideoLink';
import MyErrorBoundary from '../components/MyErrorBoundary';
import { IoIosSearch } from 'react-icons/io';

export default function Shablon() {
  const [filters1, setFilters1] = useState([]);
  const [search, setSearch] = useState('');
  const [periodFilter, setPeriodFilter] = useState([]);
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [ochil, setOchil] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileSize = 1024;
  const [isSticky, setIsSticky] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleDownload = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setProgress(0);
    const pdfUrl = 'path/to/your/pdf/file.pdf';
    await fetch(pdfUrl)
      .then((response) => {
        const total = parseInt(response.headers.get('content-length'), 10);
        const reader = response.body.getReader();
        let receivedLength = 0;
        return new Response(
          new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  receivedLength += value.length;
                  setProgress((receivedLength / total) * 100);
                  controller.enqueue(value);
                  push();
                });
              }
              push();
            },
          }),
        );
      })
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, 'downloaded-file.pdf');
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const navigate = useNavigate();
  const route = useParams();
  const searchInputRef = useRef(null);

  const togglePeriod = (periodId) => {
    setPeriodFilter((prev) => {
      if (periodFilter.includes(periodId)) {
        return periodFilter.filter((j) => j !== periodId);
      } else {
        return [...periodFilter, periodId];
      }
    });
    // if (selectedPeriods.includes(periodId)) {
    //   setSelectedPeriods([]);
    //   setPeriodFilter(null);
    // } else {
    //   setSelectedPeriods([periodId]);
    //   setPeriodFilter(periodId);
    // }
    setCurrentPage(1); // Filter o'zgarganda birinchi sahifaga o'tish
  };

  const toggleFilter = (filterId) => {
    setFilters1((prevFilters) => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter((id) => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
    setCurrentPage(1); // Filter o'zgarganda birinchi sahifaga o'tish
  };

  const toggleSearch = (text) => {
    setSearch(text);
    setCurrentPage(1);
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters1.length > 0) {
        filters1.forEach((filter) => {
          queryParams.append('filters', filter);
        });
      }
      if (periodFilter.length > 0) {
        periodFilter.forEach((filter) => {
          queryParams.append('period_filter', filter);
        });
      }
      if (search) {
        queryParams.append('search', search.trim());
        // console.log(search);Davr
      }
      queryParams.append('page', page);
      console.log(queryParams.toString());
      const fullUrl = `${endpoints.categoryResourceApiById(
        `${route?.id}/`,
      )}?${queryParams.toString()}`;
      console.log(fullUrl);
      const response = await DataService.get(fullUrl);
      setApiData(response);
      setTotalPages(Math.ceil(response.resources.count / 20)); // Sahifa sonini hisoblash (20 elementdan iborat deb hisobladik)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrentPage(1); // Sahifa yuklanganda currentPage ni 1 ga o‘rnatish
  }, [route.id]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms kechikish
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchData(currentPage);
  }, [filters1, periodFilter, debouncedSearch, route.id, currentPage]);

  const handleCategoryClick = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Sahifalashni yaratish
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 mx-1 rounded ${
              i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i}
          </button>,
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        i !== 1 &&
        i !== totalPages
      ) {
        pages.push(
          <button
            key={`dots-${i}`}
            className="px-2 py-1 mx-1 rounded bg-gray-200"
          >
            ...
          </button>,
        );
      }
    }

    return (
      <div className="flex items-center justify-center m-14">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {'<'}
        </button>

        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    const value = searchInputRef.current?.value || '';
    toggleSearch(value);
  };

  return (
    <>
      <div className="bg-transparent flex justify-between gap-5 py-10 lg:flex-col">
        <div className="sticky p-11 w-[35%] text-white lg:w-4/5 lg:mx-auto sm:w-full">
          <div className={`w-[100%]`}>
            <div className="w-full pb-[40px] ">
              {apiData?.category ? (
                <div>
                  <h4 className="p-[20px] flex justify-center text-[30px] ">
                    {apiData?.category}
                  </h4>
                </div>
              ) : (
                <SkletonFilter />
              )}
              <div className="search-box-bigs flex justify-center items-center py-8 bg-transparent">
                <div className="search-box relative w-full max-w-md">
                  <input
                    ref={searchInputRef}
                    className="bg-transparent search-inp w-full py-3 px-5 pr-14 text-white border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    placeholder="Izlash"
                    required
                  />
                  <span className="search-btn absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
                    <button onClick={handleSearch}>
                      <IoIosSearch className="text-2xl" />
                    </button>
                  </span>
                </div>
              </div>

              {apiData?.period_filters?.length > 0 ? (
                <div className="transition-all duration-500 px-5">
                  <button
                    onClick={() => setOchil(!ochil)}
                    className={
                      ochil
                        ? ' w-[100%] text-[20px] bg-[#40403F] rounded hover:bg-[#191a19] transition-all duration-500 py-[15px]'
                        : ' w-[100%] text-[20px] hover:bg-[#1E201E] transition-all duration-500 py-[15px]'
                    }
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    Chog'lar
                    <span
                      style={{
                        fontSize: '16px',
                        position: 'absolute',
                        right: '20px',
                        top: '30%',
                        transition: 'transform 0.3s',
                        transform: ochil ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {ochil && (
                      <motion.div
                        className="p-5 bg-[#43434223] overflow-x-hidden mx-auto"
                        initial={{ opacity: 0, y: '-30%', scale: 0.5 }}
                        animate={{ opacity: 1, y: '0%', scale: 1 }}
                        exit={{ opacity: 0, y: '-30%', scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {apiData?.period_filters?.map((period) => (
                          <li
                            key={period?.id}
                            className="py-[15px] cursor-pointer hover:bg-[#3E3E3E] flex items-center justify-between "
                            onClick={() => {
                              setPeriodFilter(period.id);
                              togglePeriod(period.id);
                            }}
                          >
                            <span className="truncate w-[60%]">
                              {period?.title}
                            </span>
                            <input
                              type="checkbox"
                              className="w-[20px]"
                              //checked={selectedPeriods.includes(period.id)}
                              readOnly
                              onChange={() => {
                                if (selectedPeriods.includes(period.id)) {
                                  // Agar tanlangan bo'lsa, o'chirish
                                  setSelectedPeriods(
                                    selectedPeriods.filter(
                                      (id) => id !== period.id,
                                    ),
                                  );
                                } else {
                                  // Aks holda, qo'shish
                                  setSelectedPeriods([
                                    ...selectedPeriods,
                                    period.id,
                                  ]);
                                }
                              }}
                            />
                          </li>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                ''
              )}
              <div className="transition-all duration-500">
                {apiData?.filter_categories?.map((category) => (
                  <div key={category.id} className="px-5">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={
                        openCategory === category.id
                          ? ' w-[100%] text-[20px] bg-[#40403F] rounded hover:bg-[#191a19] transition-all duration-500 py-[15px]'
                          : ' w-[100%] text-[20px] rounded hover:bg-[#1E201E] transition-all duration-500 py-[15px]'
                      }
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {category.title}
                      <span
                        style={{
                          fontSize: '16px',
                          position: 'absolute',
                          right: '20px',
                          top: '30%',
                          transition: 'transform 0.3s',
                          transform:
                            openCategory === category.id
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                        }}
                      >
                        ▼
                      </span>
                    </button>
                    <AnimatePresence>
                      {openCategory === category.id && (
                        <motion.div
                          className="  bg-[#43434043]"
                          initial={{ opacity: 0, y: '-30%', scale: 0.5 }}
                          animate={{ opacity: 1, y: '0%', scale: 1 }}
                          exit={{ opacity: 0, y: '-30%', scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {apiData?.filters
                            ?.filter(
                              (filter) =>
                                filter.filter_category === category.id,
                            )
                            .map((filter) => (
                              <li
                                key={filter.id}
                                className="py-[15px] px-[20px] cursor-pointer hover:bg-[#3E3E3E] flex items-center justify-between "
                                onClick={() => toggleFilter(filter.id)}
                              >
                                <span>{filter.title}</span>
                                <input
                                  type="checkbox"
                                  className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-red transition duration-200 ease-in-out hover:bg-red"
                                  checked={filters1.includes(filter.id)} // Check if filter is selected
                                  readOnly
                                />
                              </li>
                            ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[65%] lg:w-[95%] lg:mx-auto">
          {apiData?.resources?.results?.length > 0 &&
            apiData?.resources?.results.map((e, i) => (
              <div
                className="w-full flex items-start gap-1 h-[300px] sm:h-[86vh] sm:flex-col"
                key={e?.id}
              >
                <div className="w-[30%] xl:w-2/5 h-[95%] sm:w-full sm:h-[300px]">
                  <img
                    className="bg-black h-[85%] w-full sm:mx-auto sm:block rounded"
                    onClick={() => navigate(`/cardDetail/${e?.id}`)}
                    src={`${e?.image}`}
                  />

                  <div className="w-[100%] flex justify-between md:px-0 text-white pt-[15px]">
                    <span className="flex gap-[3px] text-[15px] items-center">
                      <IoMdEye className="text-[18px] md:text-[16px]" />
                      <span>20534</span>
                    </span>

                    <span className="flex gap-[3px] text-[15px] items-center">
                      <FaStar className="text-[16px] md:text-[16px]" />
                      <span>2900</span>
                    </span>

                    <span className="flex gap-[3px] text-[15px] items-center">
                      <MdMessage className="text-[16px] md:text-[16px]" />
                      <span>2900</span>
                    </span>
                  </div>
                </div>

                <div className="w-[67%] h-[95%] justify-between p-[10px] sm:h-[300px] flex items-center flex-col sm:w-full">
                  <h2 className="line-clamp-3 text-white w-[100%]  text-[30px] md:text-[24px] sm:text-[20px] xl:leading-9 font-normal sm:leading-6">
                    {e?.title}
                  </h2>
                  <p className="md:text-lg text-white w-[100%] line-clamp-2 flex gap-2 md:text-[16px]">
                    <span>{e?.attributes[0]?.title}</span>:
                    <span>{e?.attributes[0]?.description}</span>
                  </p>

                  <div className="flex gap-[20px] items-center flex-wrap w-[100%]">
                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      disabled={
                        e?.audios && e?.audios?.length > 0 ? false : true
                      }
                      onClick={() =>
                        document.getElementById(`audio${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.audios && e?.audios?.length > 0
                            ? '#fff'
                            : '#a9a7a7',
                        cursor:
                          e?.audios && e?.audios?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                    >
                      Eshtuv
                      <PiFileAudioFill className="text-[20px] md:text-[18px]" />
                    </button>

                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      onClick={() =>
                        document.getElementById(`rasm${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.galleries && e?.galleries?.length > 0
                            ? '#fff'
                            : '#a9a7a7',
                        cursor:
                          e?.galleries && e?.galleries?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      disabled={
                        e?.galleries && e?.galleries?.length > 0 ? false : true
                      }
                    >
                      Sur'at <FaImages className="text-[20px] md:text-[18px]" />
                    </button>

                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      onClick={() =>
                        document.getElementById(`text${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.files && e?.files?.length > 0 ? '#fff' : '#a9a7a7',
                        cursor:
                          e?.files && e?.files?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      disabled={e?.files && e?.files?.length > 0 ? false : true}
                    >
                      Matn <GrTextWrap className="text-[20px] md:text-[18px]" />
                    </button>

                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      onClick={() =>
                        document.getElementById(`map${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.locations && e?.locations?.length > 0
                            ? '#fff'
                            : '#a9a7a7',
                        cursor:
                          e?.locations && e?.locations?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      disabled={
                        e?.locations && e?.locations?.length > 0 ? false : true
                      }
                    >
                      Xarita
                      <FaGlobeAmericas className="text-[20px] md:text-[18px]" />
                    </button>

                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      onClick={() =>
                        document.getElementById(`modul${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.virtual_realities &&
                          e?.virtual_realities?.length > 0
                            ? '#fff'
                            : '#a9a7a7',
                        cursor:
                          e?.virtual_realities &&
                          e?.virtual_realities?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      disabled={
                        e?.virtual_realities && e?.virtual_realities?.length > 0
                          ? false
                          : true
                      }
                    >
                      3D <LuRotate3D className="text-[20px] md:text-[18px]" />
                    </button>

                    <button
                      className="flex gap-[10px] items-center  cursor-pointer  text-white"
                      onClick={() =>
                        document.getElementById(`videos${i}`).showModal()
                      }
                      style={{
                        color:
                          e?.videos && e?.videos?.length > 0
                            ? '#fff'
                            : '#a9a7a7',
                        cursor:
                          e?.videos && e?.videos?.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      disabled={
                        e?.videos && e?.videos?.length > 0 ? false : true
                      }
                    >
                      Ko'ruv
                      <BiSolidVideos className="text-[20px] md:text-[18px]" />
                    </button>
                  </div>
                  <dialog
                    id={`audio${i}`}
                    className="modal w-full bg-[#000000aa] h-full m-auto  "
                  >
                    <form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#fff]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <div className="w-full h-[90%] flex items-center ">
                      <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-lg">
                        {e?.audios?.map((n, i) => (
                          <AudioPlayer
                            src={n?.audio}
                            title={n?.title}
                            key={n?.id || i + 1}
                          />
                        ))}
                      </div>
                    </div>
                  </dialog>
                  <dialog
                    id={`rasm${i}`}
                    className="modal w-full  bg-[#000000aa] h-full m-auto  "
                  >
                    <form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#fff]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <Swiper className="mySwiper h-[80vh]">
                      {e?.galleries?.map((m) => (
                        <SwiperSlide
                          key={m?.id}
                          className="text-white bg-no-repeat bg-contain bg-center "
                          style={{ backgroundImage: `url(${m?.image})` }}
                        ></SwiperSlide>
                      ))}
                    </Swiper>
                  </dialog>
                  <dialog
                    id={`videos${i}`}
                    className="modal w-full bg-[#000000aa] h-full m-auto  "
                  >
                    <form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#fff]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <div className="h-[90%]">
                      {e?.videos?.map((r, index) => (
                        <MyErrorBoundary key={index}>
                          <VideoLink url={r?.link} id={r?.id} />
                        </MyErrorBoundary>
                      ))}
                    </div>
                  </dialog>
                  <dialog
                    id={`map${i}`}
                    className="bg-[#000000aa] w-full h-[100vh] m-auto"
                  >
                    <form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#fff]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <div className="flex justify-center items-center h-[85%]">
                      <CardDetailMap location={e?.locations} />
                    </div>
                  </dialog>
                  <dialog
                    id={`modul${i}`}
                    className="bg-[#000000aa] w-full h-[100vh] m-auto"
                  >
                    <form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#fff]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <div className="flex justify-center items-center h-[85%]">
                      <div className="relative  flex flex-col gap-[20px] items-center">
                        <div className="mt-4">
                          <div className="flex justify-between w-[400px] text-sm text-gray-500">
                            <span>0 KB</span>
                            <span>{fileSize} KB</span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>
                        <motion.button
                          onClick={handleDownload}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative px-6 py-3 font-bold text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full shadow-lg transition-transform transform ${
                            isLoading ? 'animate-pulse' : ''
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-white animate-spin"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </span>
                              Yuklanmoqda...
                            </>
                          ) : (
                            'PDF-ni yuklab olish'
                          )}
                        </motion.button>
                        <AnimatePresence>
                          {isSuccess && (
                            <motion.div
                              initial={{ opacity: 0, y: -50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -50 }}
                              transition={{ duration: 0.5 }}
                              className="absolute top-0 left-0 w-[400px] flex items-center justify-center bg-green-500 text-white font-bold rounded-full"
                              style={{ top: '-3rem' }} // Adjust the position above the button
                            >
                              Muvaffaqiyatli yuklandi!
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </dialog>
                  <div className="w-[100%] flex justify-end text-white ">
                    <div className="w-[20%] flex gap-[10px] ">
                      saqlash <FaStar className="text-[20px]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className=" bg-[#202020] h-[100px] flex justify-center items-center ">
        {renderPagination()}
      </div>
    </>
  );
}

// Audio

const AudioPlayer = ({ src, key, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handlePlaybackRateChange = (event) => {
    const rate = event.target.value;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const toggleLoop = () => {
    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  return (
    <div className="audio-player overflow-hidden" key={key}>
      <div className="audio-title">{title}</div>

      <audio ref={audioRef} src={src}></audio>
      <button onClick={togglePlayPause}>
        {isPlaying ? (
          <CiPause1 className="text-[25px]" />
        ) : (
          <FaPlay className="text-[25px]" />
        )}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
      />
      <div className="flex justify-between items-center w-[100%]">
        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <button onClick={toggleLoop} className="flex items-center">
          {isLooping ? (
            <TiArrowLoop className="text-[25px]" />
          ) : (
            <TiArrowLoop className="text-[#ccc] text-[25px]" />
          )}
        </button>
      </div>

      <label className="flex gap-2">
        Playback Speed:
        <select value={playbackRate} onChange={handlePlaybackRateChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </label>
    </div>
  );
};
