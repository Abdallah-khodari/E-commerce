import React, { useContext, useState } from "react";
import { Cartcontext } from "../../context/Cartcontext";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";

export default function Paynow() {
  const { CartId, resetvalues } = useContext(Cartcontext);
  const [iscash, setiscash] = useState(false);

  function createcashorder(values) {
    if (!values.city || !values.phone || !values.details) {
      toast.error("Please fill all fields", { position: "top-center" });
      return;
    }

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("Order Done", { position: "top-center" });
        resetvalues();
        values.details = "";
        values.phone = "";
        values.city = "";
        return true;
      })
      .catch((error) => {
        toast.error("An Error Occurred. Please Try Again", {
          position: "top-center",
        });
      });
  }
  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Port Said",
    "Suez",
    "Luxor",
    "Asyut",
    "Mansoura",
    "Tanta",
    "Zagazig",
    "Ismailia",
    "Faiyum",
    "Aswan",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Qena",
    "Sohag",
    "Hurghada",
    "Sharm El Sheikh",
    "Banha",
    "Kafr El Sheikh",
    "Arish",
    "Damietta",
    "Marsa Matruh",
    "El Wahat El Bahariya",
    "New Valley",
  ];
  const OrderForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: function (values) {
      if (iscash) {
        createcashorder(values);
      } else {
        createcheckout(values);
      }
    },
  });
  function createcheckout(values) {
    if (!values.city || !values.phone || !values.details) {
      toast.error("Please fill all fields", { position: "top-center" });
      return;
    }
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=https://e-commerce-three-lyart.vercel.app`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.location.href = res.data.session.url;
      })
      .catch((error) => {
        toast.error("an error please try again", { position: "top-center" });
      });
      
  
  
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <form onSubmit={OrderForm.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter details"
              onChange={OrderForm.handleChange}
              value={OrderForm.values.details}
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={OrderForm.values.phone}
              onChange={OrderForm.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="city">
              Choose a City
            </label>
            <select
              className="border p-2 w-full rounded-md"
              id="city"
              value={OrderForm.values.city}
              onChange={OrderForm.handleChange}
              name="city"
            >
              <option value="">Select a City</option>
              {egyptianCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            onClick={() => setiscash(true)}
            className="w-full p-3 text-white bg-blue-500 rounded-lg mb-4 hover:bg-blue-600"
          >
            Create Cash Order
          </button>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Pay With Visa
          </button>
        </form>
      </div>
    </div>
  );
}
