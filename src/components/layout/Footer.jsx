import { FaPhoneAlt, FaInternetExplorer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';
import { SlSocialFacebook } from 'react-icons/sl';
import { LiaTelegram } from 'react-icons/lia';
import { FaInstagram } from 'react-icons/fa';
import '../../index.css';

export default function Footer() {
  return (
    <footer className="bg-[#0a1821] py-10 text-white">
      <div className="container mx-auto px-6 flex sm:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">AQILLI KUTUBXONA</h2>
          <p className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" /> (+998 71) 233-54-70
          </p>
          <p className="flex items-center">
            <FaInternetExplorer className="mr-2" />{' '}
            <a href="http://fati.uz/">fati.uz</a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-12">
          <ul className="mb-6 md:mb-0">
            <li className="bar-list-item-menu">
              <Link className="text-white" to="/library-categories">
                Kutubxona
              </Link>
            </li>
            <li className="bar-list-item-menu">
              <Link className="text-white" to="/news">
                Yangiliklar
              </Link>
            </li>
            <li className="bar-list-item-menu">
              <Link className="text-white" to="/aboutus">
                Biz haqimizda
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <a
            href="#"
            className="text-white w-10 h-10 flex justify-center items-center rounded-full bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-white w-10 h-10 flex justify-center items-center rounded-full bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            <SlSocialFacebook />
          </a>
          <a
            href="#"
            className="text-white w-10 h-10 flex justify-center items-center rounded-full bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            <LiaTelegram />
          </a>
          <a
            href="#"
            className="text-white w-10 h-10 flex justify-center items-center rounded-full bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-400">
        <a href="#" className="text-white text-2xl font-bold">
          Aqlli kutubxona
        </a>
        <p className="text-sm text-gray-400 mt-2">
          &copy; Copyright 2023. Barcha huquqlar RL tomonidan himoyalangan
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .container {
            flex-direction: column;
          }
          .container > div {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
