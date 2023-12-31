import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getAllOrder } from "../../../api/order";
import { order_status } from "../../../utils/ordersStatus";
import Button from "../../../components/Button";
const OrderManagement = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      const response = await getAllOrder();
      setData(response);
      console.log(response);
    })();
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected + 1);
  };
  return (
    <div className="container mx-auto my-4 p-3">
      <h3 className="text-[32px] ">Quản lý đặt hàng</h3>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Email
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Payment
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              PhoneNumber
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Total
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Chuc nang
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(startIndex, endIndex).map((value: any) => {
            return (
              <tr
                key={value._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4 text-[16px] max-w-[300px]">
                  {value?.name}
                </td>
                <td className="px-4 py-4 text-[16px] w-[200px]">
                  {value?.email}
                </td>
                <td className="px-4 py-4 text-[16px]">{value?.payment}</td>
                <td className="px-4 py-4 text-[16px]">{value?.phoneNumber}</td>
                <td className="px-4 py-4 text-[16px]">
                  {order_status[value.status]}
                </td>
                <td className="px-4 py-4 text-[16px]">{value.total}</td>
                <td className="px-4 py-4 text-[16px] ">
                  {order_status[value.status] === "Hoàn thành" ? (
                    ""
                  ) : (
                    <Link to={`update/${value._id}`}>
                      <Button text={"Update"} />
                    </Link>
                  )}
                  <Link to={`detail/${value._id}`}>
                    <Button text={"Details"} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-lg">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={
              "flex justify-center items-center mx-auto container my-4"
            }
            activeClassName={"text-white bg-green-500"}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel="<"
            pageClassName="mx-2 p-3 rounded-md"
            pageLinkClassName=" p-3 text-lg"
            disabledClassName={"bg-gray-200"}
            previousClassName="bg-gray-400 text-white p-3 rounded-md"
            nextClassName="bg-gray-400 text-white p-3 rounded-md"
          />
        </div>
    </div>
  );
};

export default OrderManagement;
