
// import {configureStore} from '@reduxjs/toolkit'
// import productReducer  from '../reduxToolkit/ProductSlice'
// import cartReducer from "../reduxToolkit/CartSlice"

// export const store = configureStore({
//     cart:cartReducer,
//     product:productReducer,
  
// })


import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reduxToolkit/ProductSlice';
import cartReducer from '../reduxToolkit/CartSlice';
// import  detailProducts  from '../reduxToolkit/DetailSlice';

export const store = configureStore({
  reducer: { // You need to wrap the reducers inside a `reducer` key
    cart: cartReducer,   // Assigning the cart reducer
    product: productReducer, // Assigning the product reducer
   
  },
});
