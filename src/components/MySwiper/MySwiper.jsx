/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MySwiper.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

export default function MySwiper() {

  const [images, setImages] = useState([]);
  const swiperRef = useRef(null);

  // Fetch the NASA API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=7BdaDaLN7EHQyb8Db3NDkE1dPSniiIG2oE0wvt64&hd=True&count=5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images: ' + error);
      }
    };

    fetchImages();
  }, []);

  // Update the screen slide from the url
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#feed=nasa&scene=(\d+)/);
      if (match && swiperRef.current) {
        const sceneNumber = parseInt(match[1], 10);
        swiperRef.current.swiper.slideTo(sceneNumber - 1);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  // Set the hash to 1 on page load or reload
  window.onload = function() {
    window.location.hash = '#feed=nasa&scene=1';
  };
  

  // Update the url on changing slide
  const handleSlideChange = (swiper) => {
    const index = swiper.activeIndex + 1; // Add 1 since index starts from 0
    window.location.hash = `#feed=nasa&scene=${index}`;
  };

  return (
    <div>
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
        onSlideChange={handleSlideChange}
        className='mySwiper'
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.title || "Slide Image"} />
            <p>{image.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
