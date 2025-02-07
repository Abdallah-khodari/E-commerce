import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import Homeloaderscreen from '../Homeloaderscreen/Homeloaderscreen';
import { Link } from 'react-router-dom';
import Categoriesloader from '../Categoriesloader/Categoriesloader';
export default function Brands() {
  function getallbrands(){
    return axios.get ('https://ecommerce.routemisr.com/api/v1/brands')
 
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productbrand"],
    queryFn: getallbrands,
  });
  if (isLoading) {
     return <Categoriesloader />;
  }
  if(isError){
    toast.error('pleasr try again later')
  }
  console.log(isLoading);
  
const allbrands=data?.data.data
console.log(allbrands);

  
  
  return (
    <>
      <div className="grid mt-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 box-border lg:grid-cols-5  gap-6">
        {allbrands?.map((brand) => (
          <Link to={`/brandproducts/${brand._id}`}>
            <div
              key={brand._id}
              className="flex flex-col items-center box-border bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-24 h-24 object-contain rounded-full shadow-md"
              />
              <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
        
      </div>
    </>
  );
}
