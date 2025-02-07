import './App.css';
import { createBrowserRouter, RouterProvider,createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Authcontextprovider from './context/Authcontext';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
import Productdetails from './Components/Productdetails/Productdetails';
import Cartcontextprovider from './context/Cartcontext';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Paynow from './Components/Paynow/Paynow';
import Brands from './Components/Brands/Brands';
import Allorders from './Components/Alloreders/Allorders';
import Brandproducts from './Components/Brandproducts/Brandproducts';
import Catrgoryproducts from './Components/Categoryproducts/Categoryproducts';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Resetcode from './Components/resetcode/Resetcode';
import Wishlist from './Components/wishlist/Wishlist';
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
      { path: "home", element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "productdetails/:id", element: <Productdetails /> },
      { path: "//cart", element: <Cart /> },
      { path: "Paynow", element: <Paynow /> },
      { path: "Brands", element: <Brands /> },
      { path: "allorders", element: <Allorders /> },
      { path: "brandproducts/:id", element:<Brandproducts/>},
      {path:"category/:id",element:<Catrgoryproducts/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'restcode',element:<Resetcode/>},
      {path:'wishlist',element:<Wishlist/>}

    ],
  },
]);
const client=new QueryClient();
function App() {
  
  return (
    <QueryClientProvider client={client}>
      <Authcontextprovider>
        <Toaster/>
        <Cartcontextprovider>
          <RouterProvider router={router} />

        </Cartcontextprovider>
</Authcontextprovider>
    </QueryClientProvider>
  );

}
export default App;
