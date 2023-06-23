import { useContext, useEffect, useState } from "react";
import { productType } from "../interface/product";

import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Context } from "../App";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<any>([]);
  const { setNumber, number } = useContext<any>(Context);
  const [total, setTotal] = useState<number>();

  // Lấy dữ liệu giỏ hàng từ local storage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);
  useEffect(() => {
    const newCart = [...cart];
    const bill = newCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotal(bill);
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);
  const addToCart = (product: productType) => {
    const existingProductIndex = cart.findIndex(
      (item: productType) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng của nó.
      let newCart = [...cart];
      newCart[existingProductIndex].quantity++;
      setCart(newCart);
    } else {
      // Ngược lại thì thêm sản phẩm mới vào mảng.
      product.quantity = 1;
      cart.push(product);
    }

    // Lưu mảng giỏ hàng mới nhất vào localStorage.
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const decreaseQuantityInCart = (productIdToDecrease: number) => {
    const existingProductIndex = cart.findIndex(
      (item: productType) => item._id === productIdToDecrease
    );
    if (
      existingProductIndex !== -1 &&
      cart[existingProductIndex].quantity === 1
    ) {
      // Xóa sản phẩm khỏi giỏ hàng khi số lượng của nó là 1.
      const newCart = [...cart];
      const confirm = window.confirm("Bạn có muốn xóa không");
      if (confirm) {
        newCart.splice(existingProductIndex, 1);
        setCart(newCart);
        let newNumber = number - 1;
        setNumber(newNumber);
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else if (
      existingProductIndex !== -1 &&
      //tránh lấy vi trí === 0 và nên ít hơn không.
      cart[existingProductIndex].quantity > 1
    ) {
      // Giảm số lượng sản phẩm đi một đơn vị nếu số lượng của nó lớn hơn 1.
      let newCart = [...cart];
      newCart[existingProductIndex].quantity--;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const removeFromCart = (productIdToRemove: string) => {
    // Lọc ra các phần tử không bị xóa đi. Trống [] khi không tìm thấy ID trong ds ít nhất 1 phần tử
    const confirm = window.confirm("Bạn có muốn xóa không");
    if (confirm) {
      const newCart = cart.filter(({ _id }: any) => _id !== productIdToRemove);
      setCart(newCart);
      let newNumber = number - 1;
      setNumber(newNumber);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    // Lưu giở hàng mới sau khi bỏ sản phẩm vào localStorage
  };

  return (
    <div>
      <table className="w-full text-sm  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Product name
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Price
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Quantity
            </th>
            <th scope="col" className="px-4 py-3 text-[16px]">
              Action
            </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((value: any) => {
            return (
              <tr
                key={value._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4 text-[16px] max-w-xs">{value.name}</td>
                <td className="px-4 py-4 text-[16px]">
                  {value.price.toLocaleString("de-DE")}
                </td>
                <td className="px-4 py-4 text-[16px] ">{value.quantity}</td>
                <td className="px-4 py-4 text-[16px] ">
                  <button onClick={() => addToCart(value)}>
                    <FaPlus />{" "}
                  </button>
                  <button
                    className="mx-4"
                    onClick={() => decreaseQuantityInCart(value._id)}
                  >
                    <FaMinus />
                  </button>
                  <button onClick={() => removeFromCart(value._id)}>
                    <FaTrash />
                  </button>
                </td>
                <td className="w-[200px]">
                  {(value.quantity * value.price).toLocaleString("de-DE")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=" flex justify-center h-10 my-3">
        <td className=" text-xl  w-[30%] leading-10 bg-gray-300">Tổng tiền:</td>
        <div className="bg-red-600 text-white w-[70%] justify-items-center">
          <div className="text-xl leading-10 justify-items-center ">
            {total}
          </div>
        </div>
      </div>
      <div className="my-8">
        {cart.length > 0 && (
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded"
            to={"checkout"}
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
