import React from 'react'
import {  TailSpin } from 'react-loader-spinner';

export default function Categoriesloader() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
  
    </div>
  );
}
