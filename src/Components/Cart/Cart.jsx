import React, { useContext } from "react";
import { Cartcontext } from "../../context/Cartcontext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
    Totalprice,
    products,
    DeleteItem,
    HandelupadteItem,
    DeleteTheCart,
  } = useContext(Cartcontext);
  async function HandleDeleteItem(id) {
    const back = DeleteItem(id);
    if (back) {
      toast.success("Product Deleted Successfully", { position: "top-right" });
    } else {
      toast.error("An error occurred. Please try again", {
        position: "top-right",
      });
    }
  }
  function HandelDeleteCart(){
    Swal.fire({
      title: "",
      text: "Are You Sure To delete All The Cart Items",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
          if (result.isConfirmed) {
            DeleteTheCart()
            Swal.fire({
              title:'Cart Deleted',
              icon:'success'
            })
          }
        });
  }
  
  return (
    <div className="w-full max-w-screen-lg mx-auto mt-20 p-2 sm:p-4">
      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product.product._id}
            className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 gap-4"
          >
            <LazyLoadImage
              src={product.product.imageCover}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
              alt={product.product.title}
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-gray-900 dark:text-white font-medium truncate">
                {product.product.title?.split(" ",4).join(" ")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {product.price} EGP
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  HandelupadteItem(product.product._id, product.count - 1)
                }
                disabled={product.count === 1}
                className={`px-2 py-1 text-white rounded-md ${
                  product.count === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500"
                }`}
              >
                -
              </button>
              <span className="font-medium text-gray-900 dark:text-white">
                {product.count}
              </span>
              <button
                onClick={() =>
                  HandelupadteItem(product.product._id, product.count + 1)
                }
                className="px-2 py-1 text-white bg-green-500 rounded-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => HandleDeleteItem(product.product._id)}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-black bg-white py-3 text-center font-bold mt-5 shadow-md rounded-lg">
        Total Cart Price {Totalprice} EGP
      </div>

      <div className="flex justify-center pt-3">
        <i
          onClick={HandelDeleteCart}
          className="fa-solid fa-trash-can text-rose-600 text-xl sm:text-2xl cursor-pointer hover:text-rose-800"
        ></i>
      </div>

      <div className="flex justify-center items-center mt-5">
        <Link to={"/Paynow"} className="w-1/2">
          <button className="w-full p-2 rounded-lg text-white duration-300 bg-green-500 hover:bg-blue-500">
            Pay Now
          </button>
        </Link>
      </div>
    </div>
  );
}
