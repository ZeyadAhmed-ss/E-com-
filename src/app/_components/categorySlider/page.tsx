"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ICategory } from "../../../app/interface/category.interface";

interface Props {
  datalist: ICategory[];
}

export default function CategoriesSlider({ datalist }: Props) {
  return (
    <div className="w-full py-10 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
        Shop by Categories
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={8}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
          1440: { slidesPerView: 8 },
        }}
        className="w-full"
      >
        {datalist.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg overflow-hidden shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-gray-700 text-center">
                {category.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
