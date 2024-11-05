import { createAsyncThunk } from "@reduxjs/toolkit";
import handleRequest from "../../Services/axiosInstance";


export const  fetchCategoriesProducts  = createAsyncThunk("product/fetchCategoriesProducts",async()=>{
   
    try {
        const response = handleRequest("GET","/categories")
       
        // console.log(response, "cat")
        return response ;
    } catch (error) {
        console.log(error)
    }
})

export const fetchDetailProducts = createAsyncThunk(
    "product/fetchDetailProducts",
    async (id) => {
      try {
        const response = await handleRequest("GET", `products/${id}`);
        // console.log(response, "detail is come ");
        return response; 
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  export const fetchProducts = createAsyncThunk(
    "product",
    async (offset = 0, { rejectWithValue }) => {
      console.log("offset", offset);
      try {
        const response = handleRequest(
          "GET",
          `/products?offset=${offset}&limit=20`
        );
        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  );
