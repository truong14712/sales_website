import React, { useEffect } from "react";
import { productType } from "../interface/product";
import { Link } from "react-router-dom";
import Button from "./Button";

const List = ({ value }: any) => {
  return (
    <Link className="p-2 border rounded" to={`/products/detail/${value._id}`}>
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <h4 className="mt-2 text-base font-medium text-gray-700 dark:text-gray-200">
          {value.name}
        </h4>
        <div>
          <img src={value.image} alt="" className="max-w-[250px] " />
        </div>
        <p className="text-blue-500">Giá {value.price}</p>
      </div>
    </Link>
  );
};

export default List;
