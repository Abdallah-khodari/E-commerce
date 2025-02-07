import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";
import Categoriesloader from "../Categoriesloader/Categoriesloader";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Cartcontext } from "../../context/Cartcontext";

export default function Catrgoryproducts() {
  const { Addtocart, Addtowhishlist, removeitemfromwishlist, allwishlist } =
    useContext(Cartcontext);
   async function HandelAddtocart(id) {
     const res = await Addtocart(id);
     if (res) {
       toast.success("Product Added successfuly", { position: "top-left" });
     } else {
       toast.error("You Must Login first", {
         position: "top-right",
       });
     }
   }
  const{id}=useParams()
  function getcategoryproducts(){
   return axios.get(
     `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
     {
      
     }
   );
  }
   const{data,isLoading,isError}=useQuery({
queryKey:["categoryproduts",id],
queryFn:getcategoryproducts
  })
const categoryproducts=data?.data.data 
console.log(categoryproducts);
if(isLoading){
  return <Categoriesloader/>
}
if(isError){
  return toast.error('Please Try Again',{position:'top-center'})
}
  const wishlistSet = new Set(allwishlist?.map((item) => item._id));
  function handleWishlistToggle(productId, e) {
    e.preventDefault();
    if (wishlistSet.has(productId)) {
      removeitemfromwishlist(productId);
    } else {
      Addtowhishlist(productId);
    }
  }


  return (
    <div>
      {categoryproducts?.length == 0 ? (
        <div className="h-screen flex items-center justify-center">
          <p className="font-bold text-2xl">
            There Are No Items For This Category
          </p>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 xl:grid-cols-5 gap-6">
            {categoryproducts?.map((product) => (
              <Link to={`/productdetails/${product._id}`}>
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white shadow-lg rounded-lg p-4 group transition-transform duration-300 hover:shadow-xl"
                >
                  <LazyLoadImage
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h2 className="text-green-500 mt-2 text-sm uppercase">
                    {product.category.name}
                  </h2>
                  <h3 className="text-lg font-bold text-gray-700 truncate">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      {product.priceAfterDiscount ? (
                        <>
                          <p className="line-through text-red-500 text-sm">
                            {product.price} EGP
                          </p>
                          <p className="text-black font-semibold">
                            {product.priceAfterDiscount} EGP
                          </p>
                        </>
                      ) : (
                        <p className="text-black font-semibold">
                          {product.price} EGP
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <i className="fas fa-star"></i>
                      <p className="text-gray-600">{product.ratingsAverage}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      HandelAddtocart(product._id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-green-500 w-full mt-3 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-blue-600 text-white p-2 text-center transition-all duration-200"
                  >
                    Add To Cart
                  </motion.button>
                  <i
                    className={`fa-solid fa-heart text-2xl mt-5 cursor-pointer ${
                      wishlistSet.has(product._id)
                        ? "text-red-600"
                        : "text-black"
                    }`}
                    onClick={(e) => handleWishlistToggle(product._id, e)}
                  ></i>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
