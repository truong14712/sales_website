import { useForm } from "react-hook-form";
import { AuthType } from "../interface/auth";
import { signin } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import instance from "../api/instance";
let userSchema = yup.object({
  email: yup.string().required().min(6).email().trim(),
  password: yup.string().required().min(6).trim(),
});
const Login = () => {
  const getUser = localStorage.getItem("user");
  const user: any = getUser ? JSON.parse(getUser) : [];
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(userSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { password, email } = data;
      const newData: AuthType = {
        email,
        password,
      };
      const save_user: any = await signin(newData);
      if (save_user.status === 200) {
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${save_user.accessToken}`;
      }

      localStorage.setItem("user", JSON.stringify(save_user));
      alert("Đăng nhập thành công");
      const user: any = localStorage.getItem("user");
      user && JSON.parse(user).user.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  });
  return (
    <div>
      <form onSubmit={onSubmit} className="mx-auto p-2">
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
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
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
          <button
            type="submit"
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3"
          >
            Login
          </button>
          <button
            type="submit"
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3"
          >
            <Link to={"/register"} className="p-4">
              Register
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
