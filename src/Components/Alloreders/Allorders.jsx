import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useContext } from "react";
import { Cartcontext } from "../../context/Cartcontext";
import { CheckmarkIcon } from "react-hot-toast";

export default function Allorders() {
    const { products } = useContext(Cartcontext);
    const result=jwtDecode(localStorage.getItem('token'))
    function getuserorders(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${result.id}`)
         .then((res)=>{
         console.log(res);
    
         })
         .catch(()=>{
          console.log(error);
          
         });
    }
    
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto text-center">
        <CheckmarkIcon className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
          Payment Successful!
        </h2>
     
      </div>
      </div>

    
  );
}
