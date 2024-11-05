import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCart } from "react-icons/bs";
import { addToCart } from "../reduxToolkit/CartSlice";
import { MdDelete } from "react-icons/md";
import { wishDelete } from "../reduxToolkit/ProductSlice";

function Wishlist() {
  const { wishList } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleCart = (curElem) => {
    dispatch(addToCart(curElem));
  };

  const handleDelete = (id) => {
    dispatch(wishDelete(id));
  };

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {wishList.length > 0 ? (
            <div className="mb-40">
              <h2 className="text-3xl font-bold mb-6 text-center">MY WISHLIST</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4 text-left">Image</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Cart</th>
                      <th className="p-4 text-left">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishList.map((curElem) => (
                      <tr key={curElem.id} className="border-b last:border-none">
                        <td className="p-4">{curElem.title}</td>
                        <td className="p-4">
                          <img
                            className="w-16 h-16 object-cover rounded-lg"
                            src={curElem.images}
                            alt={curElem.title}
                          />
                        </td>
                        <td className="p-4">${curElem.price}</td>
                        <td className="p-4">
                          <BsCart
                            className="cursor-pointer text-xl text-gray-700 hover:text-gray-900 transition"
                            onClick={() => handleCart(curElem)}
                          />
                        </td>
                        <td className="p-4">
                          <MdDelete
                            className="cursor-pointer text-xl text-red-500 hover:text-red-700 transition"
                            onClick={() => handleDelete(curElem.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mb-48 flex justify-center mt-11 text-2xl text-gray-500">
              Wishlist is Empty
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Wishlist;
