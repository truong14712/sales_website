import instance from "./instance";
const getAllCategories = () => {
  return instance.get("/categories");
};
const getOneCategories = (id: number | string) => {
  return instance.get("/categories/" + id);
};
const addCategories = (data: any) => {
  return instance.post(`/categories`, data);
};
const updateCategories = (data: any) => {
  const { _id, __v, ...updateData } = data;
  return instance.put("/categories/" + data._id, updateData);
};
const removeCategories = (id: number|string) => {
  return instance.delete("/categories/" + id);
};

export {
  getAllCategories,
  getOneCategories,
  removeCategories,
  updateCategories,
  addCategories,
};
