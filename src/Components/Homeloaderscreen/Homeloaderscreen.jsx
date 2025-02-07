import React from 'react'
import { Hourglass, InfinitySpin } from 'react-loader-spinner';

export default function Homeloaderscreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      <InfinitySpin
        visible={true}
        width="300"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
