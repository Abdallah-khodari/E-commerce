import React, { useContext, useEffect } from 'react'
import { Cartcontext } from '../../context/Cartcontext'
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { allwishlist, Addtocart, removeitemfromwishlist } =
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
  return (
    <div className="grid mt-20  grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {allwishlist?.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white  shadow-lg p-4 group transition-transform duration-300 hover:shadow-xl"
        >
          <Link to={`/productdetails/${product.id}`}>
            <LazyLoadImage
              src={product.imageCover}
              alt={product.title}
              className="w-full h-[250px] sm:h-[280px] md:h-[300px] object-cover shadow-md"
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
                <i
                  className="fa-solid fa-trash text-2xl text-red-600 mt-4"
                  onClick={(e)=>{
                    e.preventDefault()
                    removeitemfromwishlist(product.id);
                  }}
                ></i>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <i className="fas fa-star"></i>
                <p className="text-gray-600">{product.ratingsAverage}</p>
              </div>
            </div>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                HandelAddtocart(product.id);
              }}
              whileHover={{ scale: 1.1 }}
              className="bg-green-500 w-full mt-3 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-blue-600 text-white p-2 text-center transition-all duration-200"
            >
              Add To Cart
            </motion.button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
