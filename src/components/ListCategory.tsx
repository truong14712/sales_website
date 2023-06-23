import React, { useEffect, useState } from "react";
import { productType } from "../interface/product";
import { getAllCategories } from "../api/categories";
import { CategoriesType } from "../interface/categories";
interface props {
  products: any;
}
const ListCategory = ({ products }: props) => {
  const [categories, setCategories] = useState<CategoriesType[]>();
  useEffect(() => {
    (async () => {
      const response: any = await getAllCategories();
      setCategories(response);
    })();
  }, []);
  const product_filter = (id: string | number) => {
    const test = products.filter((value: any) => value.categoryId?._id === id);
    console.log(test);
  };
  return (
    <div className="flex my-4 justify-center">
      {categories &&
        categories?.map((value: CategoriesType) => {
          return (
            <div
              className="p-4 text-lg cursor-pointer"
              onClick={() => product_filter(value._id)}
            >
              {value.name}
            </div>
          );
        })}
    </div>
  );
};

export default ListCategory;
