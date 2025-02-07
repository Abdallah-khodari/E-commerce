import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Homeloaderscreen from "../Homeloaderscreen/Homeloaderscreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cartcontext } from "../../context/Cartcontext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { jwtDecode } from "jwt-decode";

const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 2,
};

export default function Productdetails() {

   const { Addtocart } = useContext(Cartcontext);
  
    const { id } = useParams();

  async function getproductdetails() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => res.data); 
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Productdetails", id],
    queryFn: () => getproductdetails(), 
  });

  if (isLoading) return <Homeloaderscreen />;
  if (isError)
    return (
      <p className="text-red-500 text-center">Error fetching product details</p>
    );
async function HandelAddtocart(){
  const res =await Addtocart(id)
    if(res){

        toast.success('Product Added successfuly',{position:'top-left'})
        
        
    } else {
toast.error('You Must Login First ',{position:'top-left'})
        
    }
}
 

  const Productdetailsobj = data?.data || {};

  const images = Productdetailsobj?.images || [];

  return (
    <div className="container mx-auto p-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="w-full max-w-md mx-auto">
          <Slider
            {...settings}
            className="rounded-lg overflow-hidden shadow-md"
          >
            {images.map((image, index) => (
              <div key={index} className="p-2">
                <LazyLoadImage
                  src={image}
                  alt="product"
                  className="w-full h-100 object-cover rounded-lg" 
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {Productdetailsobj?.title || "Product Name"}
          </h1>
          <p className="text-gray-600">
            {Productdetailsobj?.description || "Product Description"}
          </p>

          <div className="text-lg font-semibold">
            {Productdetailsobj?.priceAfterDiscount ? (
              <>
                <p className="line-through text-red-500">
                  {Productdetailsobj?.price} EGP
                </p>
                <p className="text-green-600 text-2xl">
                  {Productdetailsobj?.priceAfterDiscount} EGP
                </p>
              </>
            ) : (
              <p className="text-gray-800 text-2xl">
                {Productdetailsobj?.price} EGP
              </p>
            )}
          </div>

          <button
            onClick={HandelAddtocart}
            className="bg-green-600 hover:bg-blue-600 transition-all duration-300 text-white px-6 py-3 rounded-lg font-medium text-lg shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
