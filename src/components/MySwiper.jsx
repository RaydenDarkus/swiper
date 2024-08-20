/** @format */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./MySwiper.css";

// import required modules
import {
  EffectFade,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

export default function App() {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow, Navigation, Pagination]}
      spaceBetween={30}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      className='mySwiper'
    >
      <SwiperSlide>
        <img src='https://swiperjs.com/demos/images/nature-1.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
      </SwiperSlide>
    </Swiper>
  );
}
