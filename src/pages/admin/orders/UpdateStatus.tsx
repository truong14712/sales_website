import React, { useEffect, useState } from "react";
import { getOneOrder, updateOrder } from "../../../api/order";
import { useNavigate, useParams } from "react-router";
import { order_status } from "../../../utils/ordersStatus";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { orderType } from "../../../interface/order";
const UpdateStatus = () => {
  const [data, setData] = useState<orderType>();
  const { id } = useParams() as {
    id: string;
  };
  useEffect(() => {
    (async () => {
      const response: any = await getOneOrder(id);
      setData(response);
    })();
  }, []);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    // resolver: yupResolver(),
  });

  const onSubmit = handleSubmit(async (item) => {
    const { status } = item;
    const {
      name,
      email,
      phoneNumber,
      deliveryAddress,
      payment,
      total,
      products,
    }: any = data;
    updateOrder({
      status,
      _id: id,
      products,
      total,
      payment,
      deliveryAddress,
      phoneNumber,
      email,
      name,
    });
    toast.success("Sửa trạng thái thành công");
    navigate("/admin/dashboard/orders");
  });
  return (
    <div className="container mx-auto my-2">
      <form onSubmit={onSubmit}>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Status
        </label>
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("status")}
        >
          <option value={1}>{order_status[1]}</option>;
          <option value={2}>{order_status[2]}</option>;
          <option value={3}>{order_status[3]}</option>;
        </select>
        <button
          type="submit"
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none my-8"
        >
          Update status
        </button>
      </form>
    </div>
  );
};

export default UpdateStatus;
