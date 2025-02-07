import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Categoriesloader from "../Components/Categoriesloader/Categoriesloader";
import { AuthContext } from "./Authcontext";
const Cartcontext = createContext();
export default function Cartcontextprovider({ children }) {
  const [Totalprice, setTotalprice] = useState(0);
  const [products, setproducts] = useState(null);
  const [CartId, setCartId] = useState(null);
  const [numberofitems, setnumberofitems] = useState(0);
  const [loadaing, setloading] = useState(false);
  const[allwishlist,setallwishlist]=useState(null)
  const{token}=useContext(AuthContext)
  useEffect(() => {
    Getcartdetails();
    if(token){
      Getcartdetails()
    }
  }, [token]);
  useEffect(()=>{
    Getwishlist()
  },[])
  function resetvalues() {
    setnumberofitems(0);
    setTotalprice(0);
    setproducts(null);
  }
  async function Addtocart(id) {
    setloading(true);
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTotalprice(res.data.data.totalCartPrice);
        setproducts(res.data.data.products);
        setCartId(res.data.cartId);
        setnumberofitems(res.data.numOfCartItems);

        Getcartdetails();
        return true;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        setloading(false);
      });
    return res;
  }
  async function Getcartdetails() {
    const res2 = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotalprice(res.data.data.totalCartPrice);
        setproducts(res.data.data.products);
        setCartId(res.data.cartId);
        setnumberofitems(res.data.numOfCartItems);

        return true;
      })
      .catch((error) => {
        return false;
      });
    return res2;
  }
  async function DeleteItem(id) {
    setloading(true);
    const back = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotalprice(res.data.data.totalCartPrice);
        setproducts(res.data.data.products);
        setCartId(res.data.cartId);
        setnumberofitems(res.data.numOfCartItems);

        return true;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        setloading(false);
      });
    return back;
  }

  async function HandelupadteItem(id, productCount) {
    setloading(true);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: productCount,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTotalprice(res.data.data.totalCartPrice);
        setproducts(res.data.data.products);
        setCartId(res.data.cartId);
        setnumberofitems(res.data.numOfCartItems);
        console.log(CartId);

        toast.success(res.data.status, { position: "top-center" });
      })
      .catch((error) => {
        toast.error(res.data.status, { position: "top-center" });
      })
      .finally(() => {
        setloading(false);
      });
  }
  async function DeleteTheCart() {
    setloading(true);
    const res = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setnumberofitems(0);
        setTotalprice(0);
        setproducts(null);
        setCartId(null);

        return true;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        setloading(false);
      });
  }
  if (loadaing) {
    return <Categoriesloader />;
  }
 function Addtowhishlist(id) {
   setloading(true);
   axios
     .post(
       "https://ecommerce.routemisr.com/api/v1/wishlist",
       { productId: id },
       {
         headers: { token: localStorage.getItem("token") },
       }
     )
     .then((res) => {
       toast.success("Added to Wishlist");
       setallwishlist((prev) => [...prev, { _id: id }]); 
     })
     .catch((error) => {
       toast.error(error.response.data.message);
     })
     .finally(() => {
       setloading(false);
     });
 }
  async function Getwishlist() {
    setloading(true)
   await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setallwishlist(res?.data.data)
        
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setloading(false)
      });
  }
function removeitemfromwishlist(id) {
  axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers: { token: localStorage.getItem("token") },
    })
    .then(() => {
      toast.success("Removed from Wishlist");
      setallwishlist((prev) => prev.filter((item) => item._id !== id)); 
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
}
  return (
    <Cartcontext.Provider
      value={{
        Totalprice,
        products,
        numberofitems,

        CartId,

        Addtocart,

        Getcartdetails,
        DeleteItem,
        HandelupadteItem,
        DeleteTheCart,
        resetvalues,
        Addtowhishlist,
        Getwishlist,
        allwishlist,
        removeitemfromwishlist,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export { Cartcontext };
