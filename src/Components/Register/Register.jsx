import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';

export default function Register() {
  const[iserror,setiserror]=useState(null)
  const[isdone,setisdone]=useState(false)
  const navigate = useNavigate();
   useEffect(() => {
    if (iserror) {
      Swal.fire({
        title: 'Error',
        text: iserror,
        icon: 'error'
      });
    }
  }, [iserror]);
     useEffect(() => {
    if (isdone) {
      Swal.fire({
        title: 'Done',
        text: 'You have registered successfully',
        icon: 'success'
      });
    }
  }, [isdone]);
  let user = {
    name: "",
    phone: "",
    email: "",
    password: "",
    rePassword: ""
  };
 async function submit(values){
  try{
    const res=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    setisdone(true)
    
   setTimeout(() => {
      navigate('/login')
    }, 2000);
  } catch(error){
    console.log('error',error);
    setiserror(error.response.data.message)
    
  }
  
 }
 
  const register = useFormik({
    initialValues: user,
    onSubmit: submit,
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
      phone: Yup.string().required('Required').matches(/^01[0-2][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
      rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required')
    })
  });

  return (
    <div className="p-5">
      <h1 className="text-center font-bold text-4xl">Register Now</h1>
      <form className="max-w-sm mx-auto mt-10" onSubmit={register.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input
            value={register.values.name}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
          {register.errors.name && register.touched.name && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {register.errors.name}
</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Number</label>
          <input
            value={register.values.phone}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
          {register.errors.phone && register.touched.phone && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {register.errors.phone}
</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            value={register.values.email}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
          {register.errors.email && register.touched.email && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {register.errors.email}
</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
          <input
            value={register.values.password}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="password"
            id="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
          {register.errors.password && register.touched.password && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {register.errors.password}
</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat Password</label>
          <input
            value={register.values.rePassword}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />
          {register.errors.rePassword && register.touched.rePassword && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {register.errors.rePassword}
</div>}
        </div>
        <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        <p className="text-center">Back To Login</p>
       < NavLink to="/login" className="block text-center py-2 px-3 font-semibold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login Now</NavLink>
      </form>
    </div>
  );
}