import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
export default function Login() {
  const { token, settoken } = useContext(AuthContext);
  const [iserror, setiserror] = useState(null);
  const [isdone, setisdone] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (iserror) {
      Swal.fire({
        title: "Error",
        text: iserror,
        icon: "error",
      }).then(() => {
        setiserror(null);
      });
    }
  }, [iserror]);

  useEffect(() => {
    if (isdone) {
      Swal.fire({
        title: "Done",
        text: "You have Login successfully",
        icon: "success",
      });
    }
  }, [isdone]);
  let user = {
    email: "",
    password: "",
  };
 async function submit(values) {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      setisdone(true);
      localStorage.setItem('token', res.data.token);
      navigate("/home");      
      settoken(res.data.token)
      console.log(token);
      
    } catch (error) {
      setiserror(error.response?.data?.message);
    }
  }

  const UserLogin = useFormik({
    initialValues: user,
    onSubmit: submit,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  return (
    <div className="p-5">
      <h1 className="text-center font-bold text-4xl">Login Now</h1>
      <form
        className="max-w-sm mx-auto mt-10"
        onSubmit={UserLogin.handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={UserLogin.values.email}
            onChange={UserLogin.handleChange}
            onBlur={UserLogin.handleBlur}
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {UserLogin.errors.email && UserLogin.touched.email && (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {UserLogin.errors.email}
            </div>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            value={UserLogin.values.password}
            onChange={UserLogin.handleChange}
            onBlur={UserLogin.handleBlur}
            type="password"
            id="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {UserLogin.errors.password && UserLogin.touched.password && (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {UserLogin.errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p className="text-center"> Do Not Have An Account?</p>
        <NavLink
          to="/Register"
          className="block text-center py-2 px-3 font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Register Now
        </NavLink>
        <NavLink
          to="/forgetpassword"
          className="block text-center py-2 px-3 font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
           Forget Password ?
        </NavLink>
      </form>
    </div>
  );
}
