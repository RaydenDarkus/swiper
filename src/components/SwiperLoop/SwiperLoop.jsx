/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./SwiperLoop.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { handleIframeInteraction } from "../../utils/utils";

export default function SwiperLoop() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      // Check if the parent document has a 'dark' class on the body
      setIsDarkMode(window.parent.document.body.classList.contains('dark'));
    };
    // Initial check
    checkDarkMode();
    // Set up a MutationObserver to watch for changes in the parent document's body class
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(window.parent.document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initializeHash = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get('feed');
      const scene = parseInt(hashParams.get('scene'), 10);

      console.log(`Initial hash params - feed: ${feed}, scene: ${scene}`);
      window.history.replaceState(null, null, '#feed=nasa&scene=1');
    };
    
    initializeHash();
    // api_key = 7BdaDaLN7EHQyb8Db3NDkE1dPSniiIG2oE0wvt64
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
  };

  useEffect(() => {
    console.log(`activeIndex updated: ${activeIndex}`);
  }, [activeIndex]);

  useEffect(() => {
    handleIframeInteraction();
  }, [images]);

  return (
    <div className={`${styles.swiperLoopContainer} ${isDarkMode ? styles.dark : ''}`}>
      <Swiper
        grabCursor={true}
        loop={images.length > 3}
        initialSlide = {0}
        centeredSlides={false}
        slidesPerView={8}
        slidesPerGroup={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        breakpoints={{
          1200: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 7,
          },
          800: {
            slidesPerView: 6,
          },
          650: {
            slidesPerView: 5,
          },
          550: {
            slidesPerView: 4,
          },
          425: {
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