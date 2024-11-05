import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const getCartItemFromLocalStorage = () => {
  const CartData = localStorage.getItem("CartItem");
  return CartData ? JSON.parse(CartData) : []; // Return parsed data or empty array
};


const initialState = {
  cart: getCartItemFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      toast.success("Item is added in Cart", {
        position: "top-center",
      });
        //  toast.success(`Item is added in Cart`)
      state.cart.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("CartItem", JSON.stringify([...state.cart]));
    },
    deleteToCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (curElem) => curElem.id !== action.payload
      );
         toast.error("Item Removed to cart.", {
        position: "top-center",
      });
      state.cart = updatedCart;
      localStorage.setItem("CartItem", JSON.stringify(updatedCart));
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((curElem) =>
        curElem.id === action.payload.id
          ? { ...curElem, quantity: curElem.quantity + 1 }
          : curElem
      );
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((curElem) =>
        curElem.id === action.payload.id && curElem.quantity > 1
          ? { ...curElem, quantity: curElem.quantity - 1 }
          : curElem
      );
    },
  },
});

export const { addToCart, deleteToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
