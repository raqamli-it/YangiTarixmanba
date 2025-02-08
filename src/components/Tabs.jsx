import * as reactIcons from 'https://cdn.skypack.dev/react-icons@4.8.0/md';
import { useEffect, useRef, useState } from 'react';

const {
  MdAttachMoney,
  MdFavorite,
  MdLocalFireDepartment,
  MdTrendingDown,
  MdTrendingUp,
} = reactIcons;

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

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const lastActive = useRef(activeTab);
  const active = useDebounce(activeTab, 100);
  const activeTxt = useDebounce(
    activeTab,
    140 * Math.abs(activeTab - lastActive.current),
  );

  const tabs = [
    {
      title: 'Arxeolgiya',
      icon: (
        <MdFavorite className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: `Xalq og'zaki ijodi`,
      icon: (
        <MdAttachMoney className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Btiklar',
      icon: (
        <MdTrendingUp className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Tarixiy yodgorliklar',
      icon: (
        <MdTrendingDown className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Yozma asarlar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Tangalar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
      ),
      bgClass: 'bg-[#252424]',
    },
    {
      title: 'Yozma asarlar',
      icon: (
        <MdLocalFireDepartment className="w-6 h-6 transition-all duration-300 text-[white]" />
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

  return (
    <main className={`flex min-h-screen items-center `}>
      <div className="relative w-[content] bg-custom-color z-0  h-[100vh] overflow-hidden overflow-y-scroll ">
        <div className="w-full  h-[max-content] mx-auto rounded-full  p-3 flex flex-col gap-1 items-center">
          {tabs.map(({ title, bgClass, icon }, index) => (
            <div
              key={title}
              onClick={() => {
                lastActive.current = activeTab;
                setActiveTab(index);
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
                    ? 'top-0'
                    : active < index
                    ? '-top-full'
                    : 'top-full'
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
                    activeTxt === index ? 'bg-[red]' : bgClass
                  } rounded-full w-10 h-10 xxs:w-12 xxs:h-12 lg:w-14 lg:h-14 flex items-center justify-center transition-all duration-300 scale-100 group-hover:bg-opacity-60 group-hover:scale-110 `}
                >
                  {icon}
                </span>
                <span
                  className={`hidden md:block transition-all duration-300 ${
                    activeTxt === index ? 'text-[white]' : 'text-[blue]'
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
  );
};

export default Tabs;
