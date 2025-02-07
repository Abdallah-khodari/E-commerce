import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-3">
          <Slider {...settings}>
            <img
              src={img3}
              alt="Coffee"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
            <img
              src={img2}
              alt="Coffee"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
            <img
              src={img1}
              alt="Coffee"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
          </Slider>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <img
            src={img2}
            alt=""
            className="w-full h-32 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105"
          />
          <img
            src={img1}
            alt=""
            className="w-full h-32 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
