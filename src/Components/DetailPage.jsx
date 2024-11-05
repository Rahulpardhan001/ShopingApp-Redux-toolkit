import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Loader from "./Loader";
import { addToCart } from "../reduxToolkit/CartSlice";
import { TiTick } from "react-icons/ti";
import { IoAddCircle } from "react-icons/io5";
import { fetchDetailProducts } from "../reduxToolkit/Thunk/productThunk";

function DetailPage() {
  const { productDetails, status, error, isLoading } = useSelector(
    (state) => state.product
  );
  const { cart } = useSelector((state) => state.cart);

  const [queryParams] = useSearchParams();
  const productId = queryParams.get("id");
  const dispatch = useDispatch();

  function handleDispatch(elem) {
    dispatch(addToCart(elem));
  }

  useEffect(() => {
    dispatch(fetchDetailProducts(productId));
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container  p-6">
          <div className="detailPage grid grid-cols-1 md:grid-cols-2 gap-6  shadow-sm mt-6 bg-white">
            {/* Left Section (Image Slider) */}
            <div className="left flex justify-center items-center p-6">
              <AsNavFor productDetails={productDetails} />
            </div>

            {/* Right Section (Product Details) */}
            <div className="right flex flex-col justify-start p-6 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {productDetails.title}
              </h1>
              <p className="text-gray-600">{productDetails.description}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">
                ${productDetails.price}
              </p>

              <div className="flex items-center mt-4">
                {cart.find((cartElem) => cartElem.id === productDetails.id) ? (
                  <span className="flex items-center text-green-600">
                    {/* <TiTick className="text-2xl" /> */}
                    <span className="ml-2">Added to Cart</span>
                  </span>
                ) : (
                  <button
                    className="flex items-center bg-blue-600 p-2 text-white rounded-md hover:bg-blue-400 border  transition duration-200"
                    onClick={() => handleDispatch(productDetails)}
                  >
                    
                    <span className="ml-2">Add To Cart</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;

// Show slider images
export function AsNavFor({ productDetails }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container w-full max-w-sm">
      <Slider
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
        className="rounded-lg"
      >
        {productDetails?.images?.map((image, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              className="w-full h-60 object-cover rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105"
              src={image}
              alt={`Product image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>

      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        className="mt-4"
      >
        {productDetails?.images?.map((image, index) => (
          <div key={index} className="flex justify-center items-center ps-4">
            <img
              className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-200 transform hover:scale-110"
              src={image}
              alt={`Thumbnail image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
