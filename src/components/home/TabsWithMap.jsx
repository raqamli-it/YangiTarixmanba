import * as reactIcons from 'https://cdn.skypack.dev/react-icons@4.8.0/md';
import { useEffect, useRef, useState } from 'react';
const { MdLocalFireDepartment } = reactIcons;
import { GiTwoCoins } from 'react-icons/gi';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { TbBuildingArch } from 'react-icons/tb';
import { MdCastle } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoNewspaperSharp } from 'react-icons/io5';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../style/home/_mapsHome.css'; // Custom CSS fayli
// Custom marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen';
const FullscreenControl = () => {
  const map = useMap();
  useEffect(() => {
    L.control
      .fullscreen({
        position: 'topleft',
      })
      .addTo(map);
  }, [map]);
  return null;
};
const TabsWithMap = () => {
  const [activeTab, setActiveTab] = useState(0);
  const lastActive = useRef(activeTab);
  const active = useDebounce(activeTab, 100);
  const activeTxt = useDebounce(
    activeTab,
    140 * Math.abs(activeTab - lastActive.current),
  );
  const tabse = [
    {
      title: 'Arxeolgiya',
      icon: (
        <MdCastle className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
      name: 'Tab 3',
      menus: [
        {
          name: 'Nex Locations',
          coords: [
            [36.2048, 138.2529],
            [34.0522, 118.2437],
            [12.2383, 1.5616],
            [22.9068, 43.1729],
            [9.7489, 83.7534],
          ],
        },
      ],
    },
    {
      title: `Xalq og'zaki ijodi`,
      icon: (
        <FaPeopleGroup className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
      name: 'Tab 2',
      menus: [
        {
          name: 'Other Locations',
          coords: [
            [36.2048, 138.2529],
            [61.524, 105.3188],
            [12.2383, 1.5616],
            [35.8617, 104.1954],
            [9.7489, 83.7534],
          ],
        },
      ],
    },
    {
      title: 'Btiklar',
      icon: (
        <IoNewspaperSharp className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
      name: 'Tab 1',
      menus: [
        {
          name: 'Multiple Locations',
          coords: [
            [41.2995, 102.401],
            [41.3112, 20.2797],
            [41.3275, 69.2816],
            [41.3905, 39.2049],
            [41.319, 90.2549],
          ],
        },
      ],
    },
    {
      title: 'Tarixiy yodgorliklar',
      icon: (
        <TbBuildingArch className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
      name: 'Tab 1',
      menus: [
        {
          name: 'Multiple Locations',
          coords: [
            [32.4279, 53.688],
            [41.3112, 20.2797],
            [26.8206, 30.8025],
            [41.3905, 39.2049],
            [41.319, 90.2549],
          ],
        },
      ],
    },
    {
      title: 'Yozma asarlar',
      icon: (
        <RiFilePaper2Fill className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
      menus: [
        {
          name: 'Multiple Locations',
          coords: [
            [37.0902, -95.7129],
            [36.2048, 138.2529],
            [35.9078, 127.7669],
            [25.2744, 133.7751],
            [41.319, 90.2549],
          ],
        },
      ],
    },
    {
      title: 'Tangalar',
      icon: (
        <GiTwoCoins className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },

    {
      title: 'Tarixiy xujjatlar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Muhirlar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: `San'at asarlari`,
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Matbuot',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Arxiv xujjatlar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: `Ko'r - eshit - tingla`,
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: `Me'morchilik`,
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
  ];

  const [selectedLocations, setSelectedLocations] = useState(tabse[0].menus);
  return (
    <div className="maps-container mt-[100px]">
      <main className={`flex  `}>
        <div className="relative w-[content]z-0  h-[80vh] overflow-hidden overflow-y-scroll tab-scrolls">
          <div className="w-full  h-[max-content] mx-auto rounded-full  p-3 flex flex-col gap-1 items-center">
            {tabse.map(({ title, bgClass, icon, menus }, index) => (
              <div
                key={title}
                onClick={() => {
                  lastActive.current = activeTab;
                  setActiveTab(index);
                  setSelectedLocations(menus);
                }}
                className={`selection:bg-transparent w-[260px] select-none relative overflow-hidden bg-[#959494] rounded-full`}
              >
                <div
                  style={{
                    transitionDelay:
                      100 * Math.abs(index - lastActive.current) + 'ms',
                  }}
                  className={`${bgClass} ${
                    active === index
                      ? 'right-0'
                      : active < index
                      ? '-right-full'
                      : 'right-full'
                  } w-full h-full absolute top-0  rounded-full duration-500`}
                ></div>
                <div
                  className={`!p-2 rounded-full cursor-pointer whitespace-nowrap flex  !gap-1 xl:gap-3 items-center lg:!pr-6 group xl:text-lg !font-medium relative`}
                  title={title}
                >
                  <span
                    style={{
                      transitionDelay:
                        10 * Math.abs(index - lastActive.current) + 'ms',
                    }}
                    className={`${
                      activeTxt === index ? 'bg-[#514f4f]' : bgClass
                    } rounded-full w-10 h-10 xxs:w-12 xxs:h-12 lg:w-14 lg:h-14 flex items-center justify-center transition-all duration-300 scale-100 group-hover:bg-opacity-60 group-hover:scale-110 `}
                  >
                    {icon}
                  </span>
                  <span
                    className={`hidden md:block transition-all duration-300 ${
                      activeTxt === index ? 'text-[white]' : ''
                    }`}
                  >
                    {title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MapContainer
        center={selectedLocations[0].coords[0]}
        zoom={3}
        className="home-map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocations[0]?.coords.map(
          (location, index) => (
            console.log(location),
            (
              <Marker key={index} position={location}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )
          ),
        )}
        <FullscreenControl />
      </MapContainer>
    </div>
  );
};

export default TabsWithMap;
