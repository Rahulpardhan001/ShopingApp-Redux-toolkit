import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  wishDelete, wishLists } from "../reduxToolkit/ProductSlice";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { addToCart, deleteToCart } from "../reduxToolkit/CartSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";
import { IoCartOutline } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
// import  CarouselCustomNavigation from "./carousel";
import { fetchCategoriesProducts, fetchProducts } from "../reduxToolkit/Thunk/productThunk";


function Product() {
  const dispatch = useDispatch();
  const { productList, filterProduct, isLoading, wishList } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  

  function handleDispatch(elem) {
    dispatch(addToCart(elem));
  }

  function handleRemove(id){
    dispatch(deleteToCart(id))
  }

  function Handlewhish(elem){
    dispatch(wishLists(elem))
  }
  function handlewishDel(id){
    dispatch( wishDelete(id));
  }

  // console.log("filteredProducts", filterProduct)
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategoriesProducts())
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className=" pb-44">

      {/* <CarouselCustomNavigation/> */}
        <div className="container mx-auto px-4 pt-10 ">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Products</h2>
        <hr className="pt-2 pb-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {( filterProduct.length > 0 ?  filterProduct : productList)?.map((elem) => (
              <div key={elem.id} className="bg-white shadow-lg rounded-lg  p-5">
                <div className="h-60 flex justify-center ">
                  <Link to={`/detail?id=${elem.id}`}>
                    <img
                      className="object-cover w-full h-full rounded transform transition-transform duration-300 hover:scale-110 "
                      src={elem.images}
                      loading="lazy"
                      alt={elem.title}
                    />
                  </Link>
                </div>
                <div className="mt-4 text-center font-semibold  text-red-700 text-lg ">
                  {elem.title}
                </div>
                <div className="text-center text-gray-700">Price: ${elem.price}</div>
                <div className="flex justify-between items-center mt-3 text-2xl">
               
                {wishList.find((curElem) => curElem.id === elem.id) ? (
                    <span className="text-gray-500 text-red-900 transition duration-200">
                      <FaHeartCircleCheck onClick={() => handlewishDel(elem.id)} />
                    </span>
                  ) : (
                    <span className="text-gray-500 hover:text-red-500 transition duration-200">
                      <FaRegHeart onClick={() => Handlewhish(elem)} />
                    </span>
                  )}
                 
                  {cart.find((cartElem) => cartElem.id === elem.id) ? (
                    <span className="text-green-500">
                      <BsFillCartCheckFill className="text-white bg-green-500 rounded-full p-1" onClick={()=> handleRemove(elem.id)}/>
                    </span>
                  ) : (
                    <span
                      className="text-gray-500 hover:text-green-500 cursor-pointer transition duration-200"
                      onClick={() => handleDispatch(elem)}
                    >
                    
                      <IoCartOutline />
                   
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Pagination */}
        <ProductPagination itemOffset={0} />
      </section>
    </>
  );
}

export default Product;


// Pagination Component

export function ProductPagination() {
  const dispatch = useDispatch();
  const itemOffset = 0;
  const itemPerPage = 20;
  const endOffset = itemOffset + itemPerPage;
  // console.log(`Loading items from 0 to ${endOffset}`);
  const pageCount = Math.ceil(200 / itemPerPage);

  // Invoke when user clicks to request another page.
  const handlePageClick = (event) => {
    let page = event.selected;
    console.log("current page", page);
    dispatch(fetchProducts(page));
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        className="flex gap-2 justify-center my-8"
        // activeClassName="text-white bg-blue-600 px-3 py-1 rounded"
        pageLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        previousLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        nextLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
      />
    </>
  );
}







