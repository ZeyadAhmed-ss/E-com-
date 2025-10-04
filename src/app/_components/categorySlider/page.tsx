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
    <section className="relative w-full py-16 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* العنوان */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-14 pb-2 text-center bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
        Shop by Categories
      </h2>

      {/* السلايدر */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={24}
        slidesPerView={2}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 16 },
          480: { slidesPerView: 3, spaceBetween: 18 },
          640: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 5, spaceBetween: 22 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
          1280: { slidesPerView: 7, spaceBetween: 26 },
          1536: { slidesPerView: 8, spaceBetween: 28 },
        }}
        className="px-6 sm:px-8 md:px-12 lg:px-20"
      >
        {datalist.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="group flex flex-col items-center justify-center cursor-pointer">
              {/* الكارت */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              {/* الاسم */}
              <h3 className="mt-4 text-sm sm:text-base md:text-lg font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-300 text-center drop-shadow-md">
                {category.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
