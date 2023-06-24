import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { productType } from "../../interface/product";
import { getAllProduct, getOneProduct } from "../../api/product";
import { Context } from "../../App";
import { getAllCategories } from "../../api/categories";
import { CategoriesType } from "../../interface/categories";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import List from "../../components/List";
interface Prop {
  products: productType[];
  categories: CategoriesType[];
}
const ProductDetail = ({ products, categories }: Prop) => {
  const { setNumber, number } = useContext<any>(Context);

  const { id } = useParams() as {
    id: string;
  };
  const [data, SetData] = useState<productType>();
  const [cart, setCart] = useState<any>([]);
  const [same, setSame] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const res: any = await getOneProduct(id);
      SetData(res);
    })();
  }, []);
  useEffect(() => {}, []);
  // Lấy dữ liệu giỏ hàng từ local storage
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);
  useEffect(() => {
    const newData: any = { ...data };
    const sameProduct = products.filter((value: any) => {
      return value.categoryId?._id === newData.categoryId?._id;
    });
    setSame(sameProduct);
  }, [data]);
  const addToCart = (product: any) => {
    const existingProductIndex = cart.findIndex(
      (item: any) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng của nó.
      let newCart = [...cart];
      newCart[existingProductIndex].quantity++;
      toast.success("Thêm vào giỏ hàng thành công");

      setCart(newCart);
    } else {
      // Ngược lại thì thêm sản phẩm mới vào mảng.
      product.quantity = 1;
      let newNumber = number + 1;
      toast.success("Thêm vào giỏ hàng thành công");
      setNumber(newNumber);
      cart.push(product);
    }
    // Lưu mảng giỏ hàng mới nhất vào localStorage.
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div className="container my-5 mx-auto">
      <div className="flex justify-center items-center">
        <img src={data?.image} alt="" className="max-w-[220px]" />
      </div>
      <div className="my-2 text-base font-medium text-gray-700 dark:text-gray-200">
        {data?.name}
      </div>
      <div className="my-2 text-base text-gray-600 dark:text-gray-200 ">
        Giá {data?.price.toLocaleString("de-DE")}
      </div>
      <div className="my-2 text-base text-gray-600 dark:text-gray-200 mx-4">
        {data?.description}
      </div>
      <div className="bg-white p-4 ">
        <div className="text-xl my-4 font-semibold border-t pt-1">
          Sản phẩm tương tự
        </div>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:p-3 mb-3 similar_product lg:grid-cols-3">
          {same.map((value: productType) => {
            return <List key={value._id} value={value} />;
          })}
        </div>
      </div>
      <div className="mx-4">
        <button
          className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={() => addToCart(data)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mx-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span className="mx-1">Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
