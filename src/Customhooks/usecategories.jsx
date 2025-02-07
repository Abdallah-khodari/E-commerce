import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query';

export default function usecategories() {
  function getallcategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: ["allcategories"],
    queryFn: getallcategories,
  });
  const allcategories = res.data?.data.data;
  return res;
}
