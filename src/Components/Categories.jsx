import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

function Categories() {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Shop by Category
      </h2>
      <hr className="pt-2 pb-2" />
      <PauseOnHover />
    </div>
  );
}

export default Categories;
// Category Slider
export function PauseOnHover() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3, // Show more categories like Amazon
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // For large screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // For mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const { productCategories } = useSelector((state) => state.product);

  return (
    <div className="container px-12">
      <Slider className="" {...settings}>
        {productCategories.slice(2, 5).map((curElem) => (
          <div className="card " key={curElem.id}>
            <div className="first-content flex mx-auto justify-center">
            <img className="w-full" src={curElem.image} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

{
  /* <div key={curElem.id} className="">
            <div className=" h-52 w-52 shadow-xl duration-200 ease-in-out cursor-pointer rounded-lg overflow-hidden border  ">
                          <img
                  className="  object-cover rounded"
                  src={curElem.image}
                  alt={curElem.name}
                />
             
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium text-gray-700">{curElem.name}</h3>
              </div>
            </div>
          </div> */
}
