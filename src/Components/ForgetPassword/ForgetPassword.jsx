import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Categoriesloader from './../Categoriesloader/Categoriesloader';

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function sendresetcode(values) {
    setLoading(true); 

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email,
        }
      );

      toast.success(res.data.message, { duration: 3000 });
      navigate("/restcode");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
  }
}

  const submit = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendresetcode,
  });

  if (loading) {
    return <Categoriesloader />;
  }

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center mt-20"
        onSubmit={submit.handleSubmit}
      >
        <label htmlFor="email" className="mb-5 mt-3 font-bold">
          Please Enter Your Email
        </label>
        <input
          type="email"
          id="email"
          className="w-1/2 mx-auto rounded-xl"
          onChange={submit.handleChange}
          value={submit.values.email}
        />
        <button
          type="submit"
          className="text-clip text-xl mt-5 hover:bg-blue-500 duration-200 text-white bg-green-400 p-2 rounded-md"
          disabled={loading} 
        >
          {loading ? "Sending..." : "Send Code"}
        </button>
      </form>
    </div>
  );
}
