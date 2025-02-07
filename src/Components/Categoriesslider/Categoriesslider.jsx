import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categoriesloader from "../Categoriesloader/Categoriesloader";
import usecategories from "./../../Customhooks/usecategories";

export default function Categoriesslider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const res = usecategories();
  const allcategories = res.data?.data.data;

  if (res.isLoading) {
    return <Categoriesloader />;
  }

  return (
    <div className="hidden lg:block xl:block">
      <h2 className="p-5 text-3xl font-bold text-gray-800">
        Shop All Categories
      </h2>
      <Slider {...settings} className="overflow-hidden p-5">
        {allcategories?.map((category) => (
          <div key={category._id} className="px-2">
            <div className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-lg transition-transform transform hover:scale-110"
              />
              <h2 className="text-center text-lg font-semibold mt-2 text-gray-700">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
