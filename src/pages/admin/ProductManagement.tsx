import { productType } from "../../interface/product";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

interface IProducts {
  products: productType[];
  deleteProduct(id: number | string): void;
}
const ProductManagement = ({ products, deleteProduct }: IProducts) => {
  const [data, SetData] = useState<productType[]>([]);
  useEffect(() => {
    console.log(products);
    SetData(products);
  }, [products]);
  const removeProduct = (id: number | string) => {
    const confirm = window.confirm("Ban co muon xoa khong");
    if (confirm) {
      deleteProduct(id);
    }
  };
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected + 1);
  };
  return (
    <>
      <div className="container mx-auto my-4 p-3">
        <h3 className="text-[32px] ">Quản lý sản phẩm</h3>
        <div className="text-left my-4">
          <Link
            className="hover:shadow-form rounded-md bg-[#544cf3] py-3 px-8 text-base font-semibold text-white outline-none hover:bg-[#726bf7] "
            to="/admin/dashboard"
          >
            Back
          </Link>
        </div>
        <div className="my-4 text-right">
          <Link
            className="hover:shadow-form rounded-md bg-[#80df50] py-3 px-8 text-base font-semibold text-black outline-none hover:bg-[#8df757]"
            to="/admin/dashboard/product/add"
          >
            Add product
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 text-[16px]">
                Product name
              </th>
              <th scope="col" className="px-4 py-3 text-[16px]">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-[16px]">
                Image
              </th>
              <th scope="col" className="px-4 py-3 text-[16px]">
                Chuc nang
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(startIndex, endIndex).map((value: any) => {
              return (
                <tr
                  key={value._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 text-[16px] max-w-[300px]">
                    {value?.name}
                  </td>
                  <td className="px-4 py-4 text-[16px] w-[200px]">
                    {value?.price.toLocaleString("de-DE")}
                  </td>
                  <td className="px-4 py-4 text-[16px]">
                    <img src={value?.image} className="max-w-[200px]" alt="" />
                  </td>
                  <td className="px-4 py-4 text-[16px] ">
                    <Link
                      to={`/admin/dashboard/products/update/${value?._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-3"
                    >
                      <button className="bg-blue-700 font-medium text-white p-3 rounded-md hover:bg-blue-500">
                        Update
                      </button>
                    </Link>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-3"
                      onClick={() => removeProduct(value?._id)}
                    >
                      <button className="bg-red-600 text-white p-3 rounded-md hover:bg-red-500">
                        Remove
                      </button>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-lg">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={
              "flex justify-center items-center mx-auto container my-4"
            }
            activeClassName={"text-white bg-green-500"}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel="< previous"
            pageClassName="mx-2 p-4 rounded-md"
            pageLinkClassName=" p-4 text-lg"
            disabledClassName={"bg-gray-200"}
            previousClassName="bg-gray-400 text-white p-3 rounded-md"
            nextClassName="bg-gray-400 text-white p-3 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
