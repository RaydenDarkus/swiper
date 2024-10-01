export const handleIframeInteraction = () => {
    document.querySelectorAll('.swiperSlide iframe').forEach(iframe => {
      iframe.addEventListener('mouseenter', () => {
        iframe.style.pointerEvents = 'auto';
      });
      iframe.addEventListener('mouseleave', () => {
        iframe.style.pointerEvents = 'none';
      });
    });
  };
