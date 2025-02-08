import { useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { Outlet } from 'react-router';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoaderCard from './components/LoaderCard';

export default function Layout() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [changeColor, setChangeColor] = useState(false);
  const onchangeMode = (mode) => {
    const body = document.querySelector('body');
    body.className = mode;
    console.log(mode);
    console.log(body.className);
  };
  return (
    <div className="bg-black/70">
      {load ? (
        <div className="loyaut-loader">
          <LoaderCard />
        </div>
      ) : (
        <div className="layoute-container">
          <Header />
          <div
            className="container-layout"
            onClick={() => setChangeColor(false)}
          >
            <Outlet />
          </div>
          <div
            className={`color__switcher ${
              changeColor && 'color__switcher--open'
            }`}
            style={{ position: 'absolute' }}
          >
            <button
              onClick={() => setChangeColor((prevState) => !prevState)}
              className="color_switcher_button"
            >
              <i>
                <IoMdSettings />
              </i>
            </button>
            <h1 className="color__switcher__title">Rang tanlang</h1>
            <div className="color__list ">
              <div
                className="color__item bg6_"
                onClick={() => onchangeMode('bg6')}
              ></div>

              <div
                className="color__item bg1_"
                onClick={() => onchangeMode('bg1')}
              ></div>
              <div
                className="color__item bg2_"
                onClick={() => onchangeMode('bg2')}
              ></div>

              <div
                className="color__item bg3_"
                onClick={() => onchangeMode('bg3')}
              ></div>
              <div
                className="color__item bg4_"
                onClick={() => onchangeMode('bg4')}
              ></div>
              <div
                className="color__item bg5_"
                onClick={() => onchangeMode('bg5')}
              ></div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
