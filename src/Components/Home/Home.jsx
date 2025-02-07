import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import HomeSlider from "../Homeslider/Homeslider";
import Categoriesslider from "../Categoriesslider/Categoriesslider";
import Homeloaderscreen from "../Homeloaderscreen/Homeloaderscreen";
import { Link } from "react-router-dom";
import { Cartcontext } from "../../context/Cartcontext";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

export default function Home() {
  const { Addtocart, Addtowhishlist,allwishlist } = useContext(Cartcontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 


  async function HandelAddtocart(id) {
    const res = await Addtocart(id);
    if (res) {
      toast.success("Product Added successfully", { position: "top-left" });
    } else {
      toast.error("You Must Login first", { position: "top-right" });
    }
  }

  function getProducts({ queryKey }) {
    const [, page] = queryKey;
    const limit = page === 1 ? 25 : 31;
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: { limit, page },
    });
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: getProducts,
    keepPreviousData: true,
  });

  const allProducts = data?.data.data;

  if (isLoading) return <Homeloaderscreen />;

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong, please try again!",
    });
  }

  const filteredProducts = allProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
    <>
      <HomeSlider />
      <Categoriesslider />

      <div className="flex justify-center items-center">
        <input
          type="text"
          className="mt-10 mb-10 rounded-lg w-1/2 focus:outline-dotted p-2"
          placeholder="Search For Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts?.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white shadow-lg p-4 group transition-transform duration-300 hover:shadow-xl"
          >
            <Link to={`/productdetails/${product._id}`}>
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
                    className={`fa-solid fa-heart text-2xl cursor-pointer ${
                      wishlistSet.has(product._id)
                        ? "text-red-600"
                        : "text-black"
                    }`}
                    onClick={(e) => handleWishlistToggle(product._id, e)}
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
                  HandelAddtocart(product._id);
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

      <nav className="flex justify-center mt-6">
        <ul className="flex space-x-2 text-sm">
          {[1, 2].map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
