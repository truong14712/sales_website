import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const { setNumber, number } = useContext<any>(Context);

  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(0);
  const user: any = localStorage.getItem("user");
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const dataNew = JSON.parse(cartData);
      if (dataNew) {
        const quantity = dataNew.length;
        setNumber(quantity);
      }
    }
  }, []);
  useEffect(() => {}, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      id="header"
      className="w-full z-30 top-10 py-1  shadow-lg border-b border-blue-400 bg-[#fef4f4]"
    >
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg
            className="fill-current text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
              <li>
                <Link
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  to="/products"
                >
                  Products
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="relative py-2">
          <Link to={"/cart"}>
            <div className="t-0 absolute left-3">
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                {number}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="file: mt-4 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
        <div
          className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          {user ? (
            <div>
              <p className="mb-2 text-base">
                Wel come,{JSON.parse(user).user.name}
              </p>
              <button
                onClick={handleLogout}
                className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="auth flex items-center w-full md:w-full">
              <button className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">
                <Link to={"/login"}>Login</Link>
              </button>
              <button className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">
                <Link to={"/register"}>Register</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
