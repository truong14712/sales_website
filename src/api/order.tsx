import instance from "./instance";
import { orderType } from "../interface/order";

export const getAllOrder = () => {
  return instance.get("/orders");
};
export const addOrder = (data: any) => {
  return instance.post("/orders", data);
};
export const getOneOrder = (id: number | string) => {
  return instance.get("/orders/" + id);
};
export const updateOrder = (order: any) => {
  return instance.patch(`orders/updateStatus`, order);
};
