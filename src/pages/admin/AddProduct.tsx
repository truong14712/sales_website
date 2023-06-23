import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productType } from "../../interface/product";
import * as yup from "yup";
import { getAllCategories } from "../../api/categories";
import { CategoriesType } from "../../interface/categories";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  insertProduct(data: productType): void;
};
let productSchema = yup.object({
  name: yup.string().required().min(6).trim(),
  price: yup.number().required(),
  image: yup.string().required().trim(),
  description: yup.string().required().trim(),
  categoryId: yup.string().required(),
});
const AddProduct = ({ insertProduct }: Props) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoriesType[]>([]);
  useEffect(() => {
    (async () => {
      const data: any = await getAllCategories();
      setCategories(data);
    })();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>({
    resolver: yupResolver(productSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    insertProduct(data);
    alert("Thêm sản phẩm thành công");
    navigate("/admin/dashboard/products");
  });

  return (
    <div className="container mx-auto w-[1280px] my-5 text-left">
      <span className="text-xl my-4 bg-green-700 text-white p-2 rounded hover:bg-green-600">
        <Link className="" to={"/admin/dashboard/products"}>
          Back
        </Link>
      </span>
      <form onSubmit={onSubmit} className="my-4">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            placeholder="name"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("name", { required: true, minLength: 6 })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            placeholder="price"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("price", { required: true, minLength: 6 })}
          />
        </div>
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <div className="mb-5">
          <label
            htmlFor="image"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Image
          </label>
          <input
            type="text"
            placeholder="image"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("image", { required: true, minLength: 6 })}
          />
        </div>
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Description
          </label>
          <input
            type="text"
            placeholder="description"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("description", { required: true, minLength: 6 })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Categories
        </label>
        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
          {...register("categoryId")}
        >
          {categories.map((value: any) => {
            return (
              <option key={value._id} value={value._id}>
                {value?.name}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
