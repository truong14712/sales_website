import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { orderType } from "../interface/order";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { addOrder } from "../api/order";
import { Context } from "../App";
import { toast } from "react-toastify";
let orderSchema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required(),
  phoneNumber: yup.number().required(),
  deliveryAddress: yup.string().required(),
  payment: yup.string(),
  status: yup.string(),
});
const Checkout = () => {
  const { setNumber, number } = useContext<any>(Context);

  const getCart = localStorage.getItem("cart");
  const cart = getCart ? JSON.parse(getCart) : [];
  const getTotal = localStorage.getItem("total");
  const total = getTotal && JSON.parse(getTotal);

  const navigate = useNavigate();
  if (cart.length === 0) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<orderType>({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addOrder({
        products: [...cart],
        name: data.name,
        email: data.email,
        payment: data.payment,
        total: JSON.parse(total),
        deliveryAddress: data.deliveryAddress,
        phoneNumber: data.phoneNumber,
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      toast.success("Đặt hàng thành công");
      setNumber(0);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.map((value: any) => {
              return (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={value.image}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">Name: {value.name}</span>
                    <span className="font-semibold">
                      Số lượng: {value.quantity}
                    </span>
                    <p className="mt-auto text-lg font-bold">
                      Into money: ${value.price * value.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form className="" onSubmit={onSubmit}>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              PhoneNumber
            </label>
            <div className="relative">
              <input
                type="text"
                id="phoneNumber"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="PhoneNumber"
                {...register("phoneNumber", {
                  required: true,
                  min: 1,
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Delivery address
            </label>
            <div className="relative">
              <input
                type="text"
                id="deliveryAddress"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Delivery address"
                {...register("deliveryAddress", {
                  required: true,
                })}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500">{errors.deliveryAddress.message}</p>
              )}
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Payment
            </label>
            <div className="relative">
              <input
                type="text"
                id="payment"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value="Payment on delivery"
                readOnly
                {...register("payment", {
                  required: true,
                })}
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${total}</p>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
