import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts } from '../reduxToolkit/ProductSlice';
import { RxCross2 } from "react-icons/rx";
// import { fetchProducts } from '../reduxToolkit/Thunk/productThunk';
import { toast } from "react-toastify";

function HeroSection() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);  

  const clearInput =()=>{
    setInput("");
  }

  const handleSearchSubmit=(e)=>{
    e.preventDefault();
    if (input.length > 0) {
      const search = productList.filter((curElem) => {
        return (
          curElem.title.toLowerCase().includes(input.toLowerCase()) 
          );
      });
      if(search.length>0){
        toast.success("Product Found Successful.", {
          position: "top-center",
        })
        dispatch(setFilteredProducts(search));
      }else{
        toast.error("Item not found!", {
          position: "top-center",
        });
      }
    
    }else{
        dispatch(setFilteredProducts(productList))
    }
  }
   
  

  return (
    <section className="bg-[url('../src/assets/im/herobg.jpg')] h-[70vh] py-16 bg-cover bg-center">
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center  pb-4 text-center h-80">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold mb-5 text-orange-300">
          Amazing Products
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 text-white">
          Discover the best products
        </p>
        <form onSubmit={handleSearchSubmit} className="flex relative mt-7 rounded-l-md w-full max-w-md">
          <input
            type="search"
            placeholder="Search for amazing products..."
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            className="w-full border-none rounded-2xl p-2 ps-5 focus:outline-none focus:ring-blue-500"
          />
        
          {input.length > 0 ? (
            <RxCross2
              className="absolute end-6 top-4 cursor-pointer"
              onClick={clearInput}
            />
          ) : (
            <i className="fa-solid fa-magnifying-glass absolute end-6  top-4"></i>
          )}
        </form>
      </div>
    </div>
  </section>
  
  );
}

export default HeroSection;
