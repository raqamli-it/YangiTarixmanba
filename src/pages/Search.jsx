import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { DataService } from '../config/dataService';
import { IoMdEye } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { FaPlay, FaStar } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
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

export default function Search() {
  const [filters1, setFilters1] = useState([]);
  const [search, setSearch] = useState('');
  const [periodFilter, setPeriodFilter] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileSize = 1024;
  const [isSticky, setIsSticky] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const [query, setQuery] = useState(location.state || {});
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

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await DataService.get(
        `https://backend.tarixmanba.uz/api/search/?q=${query?.query || ''}`,
      );

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
    setQuery(location.state || {});
    fetchData(currentPage);
  }, [
    location.state,
    filters1,
    periodFilter,
    debouncedSearch,
    route.id,
    currentPage,
  ]);

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

  return (
    <>
      <div className="bg-transparent flex justify-between gap-5 py-10 lg:flex-col">
        <div className="w-[65%] lg:w-[95%] lg:mx-auto m-20">
          {apiData?.results?.resources?.length > 0 &&
            apiData?.results?.resources.map((e, i) => (
              <div
                className="w-full flex items-start gap-1 h-[300px] sm:h-[86vh] sm:flex-col"
                key={e?.id}
              >
                <div className="w-[30%] xl:w-2/5 h-[95%] sm:w-full sm:h-[300px]">
                  <img
                    className="bg-black h-[85%] w-full sm:mx-auto sm:block rounded"
                    onClick={() => navigate(`/cardDetail/${e?.id}`)}
                    src={`https://backend.tarixmanba.uz${e?.image}`}
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
