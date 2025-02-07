import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Categoriesloader from "../Categoriesloader/Categoriesloader";

export default function Resetcode() {
  const [loading, setLoading] = useState(false);

  const resetcode = useFormik({
    initialValues: { sendedcode: "" },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          { resetCode: values.sendedcode }
        );
        toast.success("Code verified successfully!");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      {loading ? (
        <Categoriesloader />
      ) : (
        <form
          onSubmit={resetcode.handleSubmit}
          className="flex flex-col items-center justify-center mt-20"
        >
          <label htmlFor="sendedcode" className="mb-5 mt-3 font-bold">
            Please Enter the Sent Code
          </label>
          <input
            type="text"
            id="sendedcode"
            name="sendedcode"
            value={resetcode.values.sendedcode}
            onChange={resetcode.handleChange}
            className="w-1/2 mx-auto rounded-xl border p-2"
          />
          <button
            type="submit"
            className="text-xl mt-5 hover:bg-blue-500 duration-200 text-white bg-green-400 p-2 rounded-md"
          >
            Verify
          </button>
        </form>
      )}
    </div>
  );
}
