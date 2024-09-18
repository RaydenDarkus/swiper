/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MySwiper.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function MySwiper() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializeHash = () => {
      console.log("Initializing hash...");
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get('feed');
      const scene = parseInt(hashParams.get('scene'), 10);

      console.log(`Initial hash params - feed: ${feed}, scene: ${scene}`);

      if (!feed || isNaN(scene) || scene < 1 || scene > 5) {
        console.log("Invalid hash params, setting default...");
        window.history.replaceState(null, null, '#feed=nasa&scene=1');
        setActiveIndex(1);
      } else {
        console.log(`Setting activeIndex to ${scene}`);
        setActiveIndex(scene);
      }
    };

    if (!initializedRef.current) {
      initializeHash();
      initializedRef.current = true;
    }

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

  useEffect(() => {
    const handleHashChange = () => {
      console.log("Hash changed...");
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const scene = parseInt(hashParams.get('scene'), 10);
      console.log(`New scene from hash: ${scene}`);
      if (!isNaN(scene) && scene > 0 && scene < 6 && swiperRef.current) {
        console.log(`Sliding to index: ${scene - 1}`);
        swiperRef.current.swiper.slideToLoop(scene - 1);
      } else {
        console.log("Invalid scene, sliding to index 0");
        swiperRef.current.swiper.slideToLoop(0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex + 1;
    console.log(`Slide changed. New index: ${index}`);
    setActiveIndex(index);
    window.history.replaceState(null, null, `#feed=nasa&scene=${index}`);
  };

  useEffect(() => {
    console.log(`activeIndex updated: ${activeIndex}`);
  }, [activeIndex]);

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
    <div>
      <Swiper
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={2}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          650: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className='mySwiper'
        ref={swiperRef}
        initialSlide={activeIndex - 1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {activeIndex === index + 1 ? (
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                {image.media_type === 'video' ? (
                  <iframe src={image.url} title={image.title} allowFullScreen />
                ) : (
                  <img src={image.url} alt={image.title || "Slide Image"} />
                )}
                <p>{image.title}</p>
              </a>
            ) : (
              <>
                {image.media_type === 'video' ? (
                  <iframe src={image.url} title={image.title} allowFullScreen />
                ) : (
                  <img src={image.url} alt={image.title || "Slide Image"} />
                )}
                <p>{image.title}</p>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}