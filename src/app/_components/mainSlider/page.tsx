"use client";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Image from "next/image";


import Img1 from "../../../../public/clark-street-mercantile-qnKhZJPKFD8-unsplash.jpg";
import Img2 from "../../../../public/mnz-ToLMORRb97Q-unsplash.jpg";
import Img3 from "../../../../public/nordwood-themes-Nv4QHkTVEaI-unsplash.jpg";

export default function MainSlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        effect="fade"
        speed={1500}
        className="w-full h-[55vh]"
      >
        {[Img1, Img2, Img3].map((img, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

