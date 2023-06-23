import instance from "./instance";
import { productType } from "../interface/product";

const getAllProduct = () => {
  return instance.get("/products");
};
const getOneProduct = (id: number | string) => {
  return instance.get("/product/" + id);
};
const addProduct = (data: productType) => {
  return instance.post(`/product/add/`, data);
};
const updateProduct = (data: productType) => {
  const { _id, __v, ...updateData } = data;
  return instance.put("/product/update/" + _id, updateData);
};
const removeProduct = (id: number) => {
  return instance.delete("/product/delete/" + id);
};
const searchProduct = (data: string) => {
  return instance.get(`/products/search?name=${data}`);
};
// const pagingProduct = (data: string) => {
//   return instance.get(`/products/?_page=1&_limit=20`);
// };
export {
  getAllProduct,
  getOneProduct,
  removeProduct,
  updateProduct,
  addProduct,
  searchProduct,
};
