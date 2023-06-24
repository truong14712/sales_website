import AddProduct from "./pages/admin/AddProduct";
import ProductManagement from "./pages/admin/ProductManagement";
import Error from "./pages/client/Error";
import Home from "./pages/client/Home";
import LayoutClient from "./layouts/client";
import ProductDetail from "./pages/client/ProductDetail";
import Products from "./pages/client/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import { addProduct, getAllProduct, removeProduct } from "./api/product";
import { productType } from "./interface/product";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/App.css";
import Register from "./components/Register";
import Dashboard from "./pages/admin/Dashboard";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Login from "./components/Login";
import Cart from "./components/Cart";
import { createContext } from "react";
import CategoryManagement from "./pages/admin/categories/CategoryManagement";
import {
  addCategories,
  getAllCategories,
  removeCategories,
} from "./api/categories";
import { CategoriesType } from "./interface/categories";
import AddCategory from "./pages/admin/categories/AddCategory";
import UpdateCategory from "./pages/admin/categories/UpdateCategory";
import Checkout from "./components/Checkout";
import OrderManagement from "./pages/admin/orders/OrderManagement";
import DetailOrder from "./pages/admin/orders/DetailOrder";
export const Context = createContext(null);
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import UpdateStatus from "./pages/admin/orders/UpdateStatus";
const App = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllProduct()
      .then((res: any) => {
        return res;
      })
      .then((data: any) => {
        setProducts(data);
        setSearchResults(data);
      });
  }, []);
  useEffect(() => {
    getAllCategories()
      .then((res) => res)
      .then((data: any) => setCategories(data));
  }, []);
  const deleteProduct = (id: number) => {
    removeProduct(id).then(() => {
      setProducts(products.filter((value: productType) => value._id !== id));
    });
  };
  const deleteCategory = (id: number) => {
    removeCategories(id).then(() => {
      setCategories(
        categories.filter((value: CategoriesType) => value._id !== id)
      );
    });
  };
  const insertProduct = async (data: productType) => {
    const addData: productType | any = await addProduct(data);
    setProducts([...products, addData.data]);
  };
  const insertCategory = async (data: CategoriesType) => {
    const addData: productType | any = await addCategories(data);
    setCategories([...categories, addData.data]);
  };
  localStorage.getItem("user");

  return (
    <Context.Provider value={{ number, setNumber }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route>
              <Route index path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <Products
                    products={products}
                    setSearchResults={setSearchResults}
                    searchResults={searchResults}
                  />
                }
              />
              <Route
                path="/products/detail/:id"
                element={
                  <ProductDetail products={products} categories={categories} />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/checkout" element={<Checkout />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route
              path="/admin/dashboard/products"
              element={
                <ProductManagement
                  products={products}
                  deleteProduct={deleteProduct}
                />
              }
            />
            <Route path="/admin/dashboard/" element={<Dashboard />} />
            <Route
              path="/admin/dashboard/products/update/:id"
              element={
                <UpdateProduct products={products} setProducts={setProducts} />
              }
            />
            <Route
              path="/admin/dashboard/product/add"
              element={<AddProduct insertProduct={insertProduct} />}
            />
            <Route
              path="/admin/dashboard/categories"
              element={
                <CategoryManagement
                  categories={categories}
                  deleteCategory={deleteCategory}
                />
              }
            />
            <Route
              path="/admin/dashboard/categories/add"
              element={<AddCategory insertCategory={insertCategory} />}
            />
            <Route
              path="/admin/dashboard/categories/update/:id"
              element={
                <UpdateCategory
                  categories={categories}
                  setCategories={setCategories}
                />
              }
            />
            <Route
              path="/admin/dashboard/orders"
              element={<OrderManagement />}
            />
            <Route
              path="/admin/dashboard/orders/detail/:id"
              element={<DetailOrder products={products} />}
            />
            <Route
              path="/admin/dashboard/orders/update/:id"
              element={<UpdateStatus />}
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Context.Provider>
  );
};

export default App;
