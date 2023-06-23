import React, { useEffect, useState } from "react";
import { AuthType } from "../interface/auth";
import { useForm } from "react-hook-form";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
let userSchema = yup.object({
  name: yup.string().required().min(6).trim(),
  email: yup.string().required().min(6).email(),
  password: yup.string().required().min(6).trim(),
  confirmPassword: yup
    .string()
    .required()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { name, password, email, confirmPassword } = data;
      const newData = {
        name,
        email,
        password,
        confirmPassword,
      };
      await signup(newData);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  });
  return (
    <form onSubmit={onSubmit} className="mx-auto p-2">
      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Username:
          <input
            type="text"
            id="username"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("name", { required: true, minLength: 6 })}
          />
        </label>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Email:
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
          />
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Password:
          <input
            id="password"
            type="password"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("password", { required: true, minLength: 6 })}
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Confirm Password:
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("confirmPassword", { required: true, minLength: 6 })}
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="mb-5">
        <button
          type="submit"
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3"
        >
          Register
        </button>
        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3">
          <Link to={"/login"} className="p-4">Login</Link>
        </button>
      </div>
    </form>
  );
}

export default Register;
