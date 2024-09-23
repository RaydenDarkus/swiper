/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MySwiper.module.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

export default function MySwiper() {

  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Fetch the NASA API
  useEffect(() => {
    const initializeHash = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get('feed');
      const scene = parseInt(hashParams.get('scene'), 10);

      console.log(`Initial hash params - feed: ${feed}, scene: ${scene}`);
      window.history.replaceState(null, null, '#feed=nasa&scene=1');
      setActiveIndex(1);
      // if (!feed || isNaN(scene) || scene < 1 || scene > 5) {
      //   window.history.replaceState(null, null, '#feed=nasa&scene=1');
      // } else {
      //   console.log(`Setting activeIndex to ${scene}`);
      //   window.history.replaceState(null, null, '#feed=nasa&scene=1');
      // }
    };
    
    initializeHash();

    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=True&count=5');
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

  useEffect(() => {
    const handleHashChange = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const scene = parseInt(hashParams.get('scene'), 10);
      if (!isNaN(scene) && scene > 0 && scene < 6 && swiperRef.current) {
        swiperRef.current.swiper.slideTo(scene - 1);
      } else {
        swiperRef.current.swiper.slideTo(0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // // Set the hash to 1 on page load or reload
  // useEffect(() => {
  //   window.location.hash = '#feed=nasa&scene=1';
  //   setActiveIndex(1);  // Set activeIndex to 1 on initial load or reload
  // }, []);
  
  // Update the url on changing slide
  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex + 1; // Add 1 since index starts from 0
    setActiveIndex(index);
    window.history.replaceState(null, null, `#feed=nasa&scene=${index}`);
  };

  useEffect(() => {
    console.log(`activeIndex updated: ${activeIndex}`);
  }, [activeIndex]);

  // For videos this will be the configuration as grabbing is not allowed for it
  useEffect(() => {
    const handleIframeInteraction = () => {
      document.querySelectorAll('.swiper-slide iframe').forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
          iframe.style.pointerEvents = 'auto';
        });
        iframe.addEventListener('mouseleave', () => {
          iframe.style.pointerEvents = 'none';
        });
      });
    };

    handleIframeInteraction();
  }, [images]);

  return (
    <div className="styles.swiperContainer">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        rewind = {true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        spaceBetween={50}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className={styles.mySwiper}
        initialSlide={0}
        slidesPerGroup={1}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                {image.media_type === 'video' ? (
                  <iframe src={image.url} title={image.title} allowFullScreen />
                ) : (
                  <img src={image.url} alt={image.title || "Slide Image"} />
                )}
                <p>{image.title}</p>
              </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}