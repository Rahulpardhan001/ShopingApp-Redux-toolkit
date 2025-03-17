import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import {
  decrementQuantity,
  deleteToCart,
  incrementQuantity,
} from "../reduxToolkit/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleDelete = (id) => {
    dispatch(deleteToCart(id));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Shopping Cart</h1>

      {cart && cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr className="text-sm sm:text-base border-b">
                <th className="py-4 px-2 text-left">Product</th>
                <th className="py-4 text-center">Image</th>
                <th className="py-4 text-center">Price</th>
                <th className="py-4 text-center">Quantity</th>
                <th className="py-4 text-center">Subtotal</th>
                <th className="py-4 text-center">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((curElem) => (
                <tr
                  className="border-b hover:bg-gray-50 transition-colors"
                  key={curElem.id}
                >
                  <td className="py-3 px-2 text-left">{curElem.title}</td>
                  <td className="py-3 flex justify-center">
                    <img
                      className="w-16 h-16 object-cover rounded-md"
                      src={curElem.images}
                      alt={curElem.title}
                    />
                  </td>
                  <td className="py-3 text-center">
                    ${curElem.price.toFixed(2)}
                  </td>
                  {/* quantity increment or decrement button */}
                  <td className="">
                   <div className="flex justify-center gap-1">
                   <button
                      onClick={() => handleDecrement(curElem)}
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      <LuMinusCircle className="text-2xl" />
                    </button>
                    <span className="text-lg">{curElem.quantity}</span>
                    <button
                      onClick={() => handleIncrement(curElem)}
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      <LuPlusCircle className="text-2xl" />
                    </button>
                   </div>

                  </td>
                  <td className="py-3 text-center">
                    ${(curElem.price * curElem.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => handleDelete(curElem.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <MdDeleteOutline className="text-2xl mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <CartTotal />
          </div>
        </div>
      ) : (
        <div className="text-center pb-40 py-5 text-xl text-red-600">
          Your Cart Is Empty
        </div>
      )}
    </div>
  );
}

export default Cart;

// Cart Total component
export function CartTotal() {
  const { cart } = useSelector((state) => state.cart);

  const calculateSubtotal = () => {
    return cart.reduce(
      (acc, curElem) => acc + curElem.price * curElem.quantity,
      0
    );
  };

  const shippingFee = 0;
  const subtotal = calculateSubtotal();
  const orderTotal = subtotal + shippingFee;

  return (
    <div className="w-full max-w-sm p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between py-2 text-base">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-2 text-base">
        <span>Shipping Fee:</span>
        <span>${shippingFee.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between py-2 font-bold text-lg">
        <span>Order Total:</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}
