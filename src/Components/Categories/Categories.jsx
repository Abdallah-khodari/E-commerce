import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Categoriesslider from "../Categoriesslider/Categoriesslider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Categories() {
  function getallcatgories() {
   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const res = useQuery({
    queryKey: ["allcategories"],
    queryFn: getallcatgories,
  });
  if (res.isLoading) {
     return<Categoriesslider />;
  }
  const allcategories = res.data?.data.data;
  // console.log(allcategories);
  
   return (
     <div className="container mx-auto mt-20 p-6">
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
         {allcategories?.map((category) => (
           <Link
             to={`/category/${category._id}`}
             key={category._id}
             className="relative group overflow-hidden rounded-lg shadow-lg"
           >
             <img
               src={category.image}
               alt={category.name}
               className="w-full h-48 object-cover transform transition-all duration-300 group-hover:scale-110"
             />

             <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <h2 className="text-white text-lg font-bold uppercase">
                 {category.name}
               </h2>
             </div>
           </Link>
         ))}
       </div>
     </div>
   );
}
