/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MySwiper.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { allowedOrigins, handleIframeInteraction } from "../../utils/utils";

export default function MiniCoverflowSwiperFeed({ images }) {
  const swiperRef = useRef(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handlePostMessage = (event) => {
      if (allowedOrigins.includes(event.origin)) {
        const { action, scene } = event.data;
        if (action === "changeSlide" && !isNaN(scene)) {
          const swiper = swiperRef.current.swiper;
          const image = images[scene - 1];
          if (image) {
            window.parent.postMessage(
              {
                url: image.url,
                title: image.title,
                explanation: image.explanation,
                source: "feedmain",
              },
              "*"
            );
          }
          if (scene > 0 && scene <= 18 && swiperRef.current) swiper.slideToLoop(scene - 1);
          else swiper.slideToLoop(0);
        }
      }
    };
    window.addEventListener("message", handlePostMessage);
    return () => window.removeEventListener("message", handlePostMessage);
  }, [images]);

  const handleSlideClick = (index, url, title, explanation, mediaType) => {
    const newIndex = index + 1;
    console.log("Slide clicked, real index:", newIndex); // Debug log
    if (swiperRef.current.swiper) swiperRef.current.swiper.slideToLoop(index);
    window.parent.postMessage({ index: newIndex, url, title, explanation, mediaType, source: "feedmain" }, "*");
  };

  useEffect(() => {
    handleIframeInteraction();
  }, [images]);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        effect={"slide"}
        grabCursor={true}
        onTransitionStart={() => setTransitioning(true)}
        onTransitionEnd={() => {
          setTransitioning(false);
        }}
        loop={images.length > 3}
        centeredSlides={true}
        slidesPerView={"auto"}
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className={styles.mySwiper}
        slidesPerGroup={1}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={`${styles.swiperSlide} ${transitioning ? styles.fade : ""}`}
            onClick={() => handleSlideClick(index, image.url, image.title, image.explanation, image.media_type)}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              {image.media_type === "video" ? (
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
