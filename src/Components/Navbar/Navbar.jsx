import { useNavigate, NavLink, Link } from "react-router-dom";
import freshcart from "../../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import Swal from "sweetalert2";
import { Cartcontext } from "../../context/Cartcontext";

export default function Navbar() {
  const { numberofitems, Getcartdetails, Getwishlist } =
    useContext(Cartcontext);
  const { token, settoken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        settoken(null);
        Swal.fire("Logged Out!", "", "success");
        navigate("/login");
      }
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-200 border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={freshcart} className="h-8" alt="Freshcart Logo" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/home"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Brands"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Brands
              </NavLink>
            </li>
            {token && (
              <span
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </span>
            )}
            {token && (
              <li>
                <Link
                  to="/wishlist"
                  onClick={() => {
                    Getwishlist();
                    setIsOpen(false);
                  }}
                  className="block relative py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Wish List
                </Link>
              </li>
            )}
            <Link
              to="/cart"
              onClick={() => {
                Getcartdetails();
                setIsOpen(false);
              }}
            >
              {token && (
                <li className="cursor-pointer relative">
                  <i className="fa-solid fa-cart-shopping text-xl hover:text-blue-500 duration-150"></i>
                  <span className="text-black absolute bottom-3 right--1 rounded-sm">
                    {numberofitems}
                  </span>
                </li>
              )}
            </Link>
            <li>
              {!token && (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="visible py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
