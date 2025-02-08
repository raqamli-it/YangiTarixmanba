import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeSliderLib = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Custom prev/next arrows
  const PrevArrow = (props) => (
    <button
      {...props}
      className="absolute top-2/4 left-4 z-10 transform -translate-y-2/4 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
    >
      Prev
    </button>
  );

  const NextArrow = (props) => (
    <button
      {...props}
      className="absolute top-2/4 right-4 z-10 transform -translate-y-2/4 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
    >
      Next
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <Slider {...settings}>
        <div className="px-2">
          <img className="rounded-lg" src="slide1.jpg" alt="Slide 1" />
        </div>
        <div className="px-2">
          <img className="rounded-lg" src="slide2.jpg" alt="Slide 2" />
        </div>
        <div className="px-2">
          <img className="rounded-lg" src="slide3.jpg" alt="Slide 3" />
        </div>
        {/* Other carousel slides */}
      </Slider>
    </div>
  );
};

export default HomeSliderLib;
