import React, { useEffect, useState } from "react";
import { productType } from "../../interface/product";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CategoriesType } from "../../interface/categories";
import { getAllCategories } from "../../api/categories";
interface IProducts {
  products: productType[];
  setSearchResults: any;
  searchResults: any;
}
const Products = ({ products, setSearchResults, searchResults }: IProducts) => {
  const [data, SetData] = useState<productType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>();
  const [filter, setFilter] = useState<productType[]>();
  useEffect(() => {
    (async () => {
      const response: any = await getAllCategories();
      setCategories(response);
    })();
  }, []);
  const [status, setStatus] = useState(false);

  const product_filter = (id: string | number) => {
    const filter = products.filter(
      (value: any) => value.categoryId?._id === id
    );
    setFilter(filter);
  };
  useEffect(() => {
    SetData(products);
  }, [products]);
  useEffect(() => {}, [data]);
  const handleInput = (e: any) => {
    const value = e.target.value.trim().toLowerCase();
    if (!value) return setSearchResults(products);

    const resultsArray = products.filter((item) => {
      return (
        item.name.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value) ||
        item.price?.toFixed().includes(value)
      );
    });
    setSearchResults(resultsArray);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
  };
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = filter
    ? Math.ceil(filter.length / itemsPerPage)
    : Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected + 1);
  };
  const handleStatus = () => {
    setStatus(!status);
  };
  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <>
      <div className="container mx-auto ">
        <form
          className="flex items-center p-3 container"
          onSubmit={(e) => onSubmit(e)}
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              onChange={(e) => handleInput(e)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </form>
      </div>
      <div className="flex my-4 justify-center">
        {categories &&
          status !== true &&
          categories?.map((value: CategoriesType) => {
            return (
              <div
                className="p-4 text-lg cursor-pointer"
                onClick={() => product_filter(value._id)}
                onChange={handleStatus}
              >
                {value.name}
              </div>
            );
          })}
      </div>
      <div className="container mx-auto my-5 lg:mt-0 lg:px-2 lg:w-5/5 grid  gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filter &&
          filter.map((value) => {
            return (
              <div className="p-2 border rounded" key={value._id}>
                <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                  <h4 className="mt-2 text-base font-medium text-gray-700 dark:text-gray-200">
                    {value.name}
                  </h4>
                  <div>
                    <img src={value.image} alt="" className="max-w-[250px] " />
                  </div>
                  <p className="text-blue-500">
                    Giá {value.price.toLocaleString("de-DE")}
                  </p>
                </div>
                <Link to={`/products/detail/${value._id}`}>
                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3 my-3">
                    Detail
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="container mx-auto my-5 lg:mt-0 lg:px-2 lg:w-5/5 grid  gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!filter &&
          searchResults
            .slice(startIndex, endIndex)
            .map((value: productType) => {
              return (
                <div className="p-2 border rounded" key={value._id}>
                  <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                    <h4 className="mt-2 text-base font-medium text-gray-700 dark:text-gray-200">
                      {value.name}
                    </h4>
                    <div>
                      <img
                        src={value.image}
                        alt=""
                        className="max-w-[250px] "
                      />
                    </div>
                    <p className="text-blue-500">
                      Giá {value.price.toLocaleString("de-DE")}
                    </p>
                  </div>
                  <Link to={`/products/detail/${value._id}`}>
                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none mx-3 my-3">
                      Detail
                    </button>
                  </Link>
                </div>
              );
            })}
      </div>
      {!filter && (
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
            pageRangeDisplayed={5}
            marginPagesDisplayed={10}
            disabledClassName={"bg-gray-200"}
            previousLabel="< previous"
            pageClassName="mx-2 p-4 rounded-md"
            pageLinkClassName="p-4 text-lg"
            previousClassName="bg-gray-400 text-white p-3 rounded-md"
            nextClassName="bg-gray-400 text-white p-3 rounded-md"
          />
        </div>
      )}
    </>
  );
};

export default Products;
