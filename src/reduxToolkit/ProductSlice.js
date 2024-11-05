import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategoriesProducts,
  fetchDetailProducts,
  fetchProducts,
} from "./Thunk/productThunk";
import { toast } from "react-toastify";

// Get wishlist data from local storage
const getWishlistFromLocalStorage = () => {
  const wishlistData = localStorage.getItem("wishList");
  return wishlistData ? JSON.parse(wishlistData) : []; // Return parsed data or empty array
};

const initialState = {
  isLoading: false,
  productList: null,
  filterProduct: [],
  productDetails: [],
  wishList: getWishlistFromLocalStorage(),
  productCategories: [],
  isError: false,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    product: (state, action) => {
      state.productList.push();
    },
    wishLists: (state, action) => {
      const itemExists = state.wishList.find(
        (item) => item.id === action.payload.id
      );

      if (!itemExists) {
        state.wishList.push(action.payload);
        toast.success("Wishlist is added", {
          position: "top-center",
        });
        localStorage.setItem("wishList", JSON.stringify([...state.wishList]));
      }
    },

    setFilteredProducts(state, action) {
      //  console.log("payload",action.payload)
      state.filterProduct = action.payload; // Set the filtered products
    },

    wishDelete: (state, action) => {
      const updatedWishlist = state.wishList.filter(
        (curElem) => curElem.id !== action.payload
      );

      state.wishList = updatedWishlist;
      toast.error("Item Removed to wishlist.", {
        position: "top-center",
      });
      // Update localStorage with the new wishlist
      localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
    },
  },
  // Get All Product from Api
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    // getproductdetails
    builder
      .addCase(fetchDetailProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailProducts.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDetailProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      });

    // get category
    builder
      .addCase(fetchCategoriesProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoriesProducts.fulfilled, (state, action) => {
        // console.log(action.payload, "category")
        state.productCategories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategoriesProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      });
  },
});

export const { product, wishLists, wishDelete, setFilteredProducts } =
  ProductSlice.actions;

export default ProductSlice.reducer;
