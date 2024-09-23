/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./SwiperLoop.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function MySwiper() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);

  useEffect(() => {
    const initializeHash = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get('feed');
      const scene = parseInt(hashParams.get('scene'), 10);

      console.log(`Initial hash params - feed: ${feed}, scene: ${scene}`);
      window.history.replaceState(null, null, '#feed=nasa&scene=1');
      // if (!feed || isNaN(scene) || scene < 1 || scene > 11) {
      //   window.history.replaceState(null, null, '#feed=nasa&scene=1');
      // } else {
      //   console.log(`Setting activeIndex to ${scene}`);
      //   window.history.replaceState(null, null, '#feed=nasa&scene=1');
      // }
    };
    
    initializeHash();

    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=True&count=11');
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
      if (!isNaN(scene) && scene > 0 && scene < 12 && swiperRef.current) {
        swiperRef.current.swiper.slideToLoop(scene - 1);
      } else {
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
    setActiveIndex(index);
    window.history.replaceState(null, null, `#feed=nasa&scene=${index}`);
  // Send message to parent window with activeIndex
    window.parent.postMessage({ activeIndex: index, source: 'swiper' }, '*');
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
        loop={images.length > 3}
        initialSlide = {0}
        centeredSlides={true}
        slidesPerView={6}
        slidesPerGroup={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 6,
          },
          600: {
            slidesPerView: 4,
          },
          480: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 2,
          }
        }}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className={styles.swiperLoop}
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