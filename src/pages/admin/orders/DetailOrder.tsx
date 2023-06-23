import React, { useEffect, useState } from "react";
import { getOneOrder } from "../../../api/order";
import { useParams } from "react-router";
import { productType } from "../../../interface/product";
type data = {
  _id: string;
  productId: string;
  quantity: number;
};
const DetailOrder = ({ products }: any) => {
  const [data, setData] = useState<any>();
  const { id } = useParams() as {
    id: string;
  };
  useEffect(() => {
    (async () => {
      const response: any = await getOneOrder(id);
      setData(response?.products);
    })();
  }, []);
  useEffect(() => {}, [data]);
  return (
    <div className="container mx-auto my-4 p-3">
      <h3 className="text-[32px] ">Chi tiết đơn hàng</h3>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Price
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Quantity
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: productType) => {
            const item = data?.find((item: data) => item._id === product._id);
            if (item) {
              return (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 text-[16px] max-w-[300px]">
                    {product?.name}
                  </td>
                  <td className="px-4 py-4 text-[16px] max-w-[300px]">
                    {product?.price}
                  </td>
                  <td className="px-4 py-4 text-[16px] max-w-[300px]">
                    {item?.quantity}
                  </td>
                  <td className="px-4 py-4 text-[16px] max-w-[300px]">
                    {product?.price * item?.quantity}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetailOrder;
