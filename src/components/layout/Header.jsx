import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lenta1 from '../../img/lenta1.png';
import lenta2 from '../../img/lenta2.png';
import lenta3 from '../../img/lenta3.png';
import lenta4 from '../../img/lenta4.png';
import lenta6 from '../../img/lenta6.png';
import lenta7 from '../../img/lenta7.png';
import lentaLeft from '../../img/lenta_left.png';
import lentaRight from '../../img/lenta_right.png';
import Marquee from 'react-fast-marquee';
import { IoIosSearch, IoIosArrowUp } from 'react-icons/io';
import { CgMenuRightAlt } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import ReactDatePicker from '../ReactDatePicker';
import Weather from '../Weather';
import { DataService } from '../../config/dataService';
import { endpoints } from '../../config/endpoints';
import '../../style/scss/_header.scss';
export default function Header() {
  ///////// Api ulangan joy
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await DataService.get(endpoints.categoryResourceApi);
      console.log('Manba  catigory Header dan ', response);
      setApiData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  /////////////////////// api end
  useEffect(() => {
    fetchData();
  }, []);

  ///////// hijriy

  const [time, setTime] = useState(new Date());
  const [showDRB, setShowDRB] = useState(false);
  const [showManba, setshowManba] = useState(false);
  useEffect(() => {
    document.querySelector('body').style.overflow = showDRB ? 'hidden' : 'auto';
  }, [showDRB]);

  const valRef = useRef(null);
  const valRefLogin = useRef(null);
  const valRefMax = useRef(null);

  const [drop, setDrop] = useState(false);
  const [maxDrop, setMaxDrop] = useState(false);
  const [loginDrop, setLoginDrop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOutside = (event) => {
    if (valRef.current && !valRef.current.contains(event.target)) {
      setDrop(false);
    }
  };

  const handleClickOutsideLogin = (event) => {
    if (valRefLogin.current && !valRefLogin.current.contains(event.target)) {
      setLoginDrop(false);
    }
  };

  const handleClickOutsideMax = (event) => {
    if (valRefMax.current && !valRefMax.current.contains(event.target)) {
      setMaxDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideLogin);
    document.addEventListener('mousedown', handleClickOutsideMax);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideLogin);
      document.removeEventListener('mousedown', handleClickOutsideMax);
    };
  }, []);

  // live time code
  useEffect(() => {
    // setTime(new Date())
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Har bir soniyada yangilanadi

    return () => clearInterval(intervalId); // Intervalni tozalas btn
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/search', { state: { query: searchQuery } });
    }
  };

  return (
    <header>
      <div className="header-top-box">
        <div className="pr-3">
          <Link className="logo-box" to="/">
            <h1>AQLLI KUTUBXONA</h1>
          </Link>
        </div>

        <div className="full__data__picer">
          <div className="live__time">
            <p>{time.toLocaleTimeString()}</p>
          </div>
          <div className="live__calendar">
            <ReactDatePicker />
          </div>
        </div>

        <div className="ob-havo">
          <Weather />
        </div>

        <div className="search-box-bigs">
          <div className="search-box">
            <input
              className="search-inp"
              type="text"
              placeholder="Izlash"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
              required
            />
            <span className="search-btn">
              <IoIosSearch
                onClick={() => {
                  handleSearch();
                }}
              />
            </span>
          </div>
          <div className="functionale">
            {/* ////////////////////////////////////////////////////////// menu bar  */}
            <div className="ham-menu">
              <CgMenuRightAlt
                className="hamburger"
                onClick={() => setShowDRB(!showDRB)}
              />

              <motion.div
                className="drop-bar-menu"
                style={{ display: showDRB ? 'block' : 'none' }}
                initial={{ scale: 0, x: 150 }}
                animate={{ scale: 1, x: showDRB ? 0 : 500 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 70,
                }}
              >
                <ul className="bar-menu-list">
                  <li className="close-drop-bar-menu">
                    <IoClose
                      onClick={() => setShowDRB(!showDRB)}
                      className="close-icon"
                    />
                    <p>{time.toLocaleTimeString()}</p>
                    {/* <div className="user">
                      <FaUserAlt /> Shaxsiy kabinet
                    </div> */}
                  </li>

                  <li className="bar-list-item wather-item-cont">
                    <Weather />
                  </li>
                  <li className="ham-calendar">
                    {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
                    <ReactDatePicker />
                  </li>
                  <li className="bar-list-item search-item-cont">
                    <form>
                      <input
                        className="bg-slate-500 h-8"
                        type="text"
                        placeholder="Izlash"
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleSearch();
                        }}
                        required
                      />
                      <div className="bar-src-btn " onClick={handleSearch}>
                        Qidruv
                      </div>
                    </form>
                  </li>

                  <li
                    className="bar-list-item-menu"
                    onClick={() => setshowManba(!showManba)}
                  >
                    <span>Manbalar</span>
                  </li>
                  <motion.li
                    className="bar-list-item-manba"
                    style={{ display: showManba ? 'block' : 'none' }}
                    animate={{ x: showManba ? 0 : 100 }}
                    transition={{
                      type: 'spring',
                      stiffness: 60000,
                      damping: 190,
                    }}
                  >
                    <ul className="manba-bar-drop">
                      {apiData && apiData.length > 0 ? (
                        apiData.map((categoryResurs) => (
                          <li key={categoryResurs.id}>
                            <Link
                              className="bar-drop-link"
                              to={`/sources/archive/${categoryResurs.id}`}
                              onClick={() => {
                                setShowDRB(!showDRB),
                                  console.log(
                                    'tayoini kor1',
                                    typeof categoryResurs.id,
                                  );
                              }}
                            >
                              {/* <TbBuildingCastle /> */}
                              <img
                                className="w-[25px] h-[20px]  object-cover m-[2px]"
                                src={categoryResurs.icon}
                                alt=""
                              />
                              <span className="text-matn-color">
                                {categoryResurs.title}
                              </span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p>No data available</p>
                      )}
                    </ul>
                  </motion.li>
                  <li className="bar-list-item-menu">
                    <Link
                      onClick={() => setShowDRB(!showDRB)}
                      className="text-matn-color"
                      to="/library-categories"
                    >
                      Kutubxona
                    </Link>
                  </li>
                  <li className="bar-list-item-menu">
                    <Link
                      onClick={() => setShowDRB(!showDRB)}
                      className="text-matn-color"
                      to="/news"
                    >
                      Yangiliklar
                    </Link>
                  </li>

                  <li className="bar-list-item-menu">
                    <Link
                      onClick={() => setShowDRB(!showDRB)}
                      className="text-matn-color"
                      to="/aboutus"
                    >
                      Biz haqimizda
                    </Link>
                  </li>
                  {/* <li className="bar-list-item-menu">
                    <Link
                      onClick={() => setShowDRB(!showDRB)}
                      className="text-matn-color"
                      to="/login"
                    >
                      Kirish
                    </Link>
                  </li> */}
                </ul>
              </motion.div>
            </div>
            {/* menu bar- end  */}
          </div>
        </div>
      </div>

      <nav>
        <div className="nav-box">
          <div
            className="nav-drop"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <Link className="link">Manbalar</Link>
            <motion.div
              className="arr"
              animate={{ rotate: drop ? 1080 : 540 }}
              transition={{
                type: 'spring',
                stiffness: 560,
                damping: 50,
              }}
            >
              <IoIosArrowUp />
            </motion.div>
            <motion.ul
              className={drop ? 'menu-drop' : ''}
              ref={valRef}
              initial={{ scale: 0 }}
              animate={{ scale: 1, y: drop ? 3 : 100 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* //////////////////////////////////////////////////Manba: katigoryalar bar-src-btn */}
              {apiData && apiData.length > 0 ? (
                apiData.map((categoryResurs, index) => (
                  <motion.li
                    key={index}
                    className="dorop-item"
                    whileHover={{ x: 8, opacity: 0.5 }}
                  >
                    <Link
                      className="nav-drop-link"
                      to={`/sources/archive/${categoryResurs.id}`}
                    >
                      {/* <TbBuildingCastle /> */}
                      <img
                        className="w-[25px] h-[20px]  object-cover m-[2px]"
                        src={categoryResurs.icon}
                        alt=""
                      />
                      <span>{categoryResurs.title}</span>
                    </Link>
                  </motion.li>
                ))
              ) : (
                <p>No data available</p>
              )}
              {/* //////////////////////////////////////////////////Manba: katigoryalar  end*/}
            </motion.ul>
          </div>

          <div className="nav-menu">
            <Link to="/library-categories" className="link">
              Kutubxona
            </Link>
          </div>

          <div className="nav-menu">
            <Link to="/news" className="link">
              Yangiliklar
            </Link>
          </div>

          <div className="nav-menu">
            <Link className="link" to="/aboutus">
              Biz haqimizda
            </Link>
          </div>
        </div>
      </nav>
      {/* ////////////////////////////////////////////////////////Lenta */}
      <Marquee>
        <div className="header_img_pattern">
          <img src={lentaLeft} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
          <img src={lentaRight} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
          <img src={lentaLeft} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
          <img src={lentaRight} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
          <img src={lentaLeft} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
          <img src={lentaRight} alt="" />
          <img src={lenta1} alt="" />
          <img src={lenta2} alt="" />
          <img src={lenta3} alt="" />
          <img src={lenta4} alt="" />
          <img src={lenta6} alt="" />
          <img src={lenta7} alt="" />
        </div>
      </Marquee>
      {/* ////////////////////////////////////////////////////////Lenta end */}
    </header>
  );
}
