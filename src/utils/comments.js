// // Set the hash to 1 on page load or reload
// useEffect(() => {
//   window.location.hash = '#feed=nasa&scene=1';
//   setActiveIndex(1);  // Set activeIndex to 1 on initial load or reload
// }, []);
  
// if (!feed || isNaN(scene) || scene < 1 || scene > 9) {
//   window.history.replaceState(null, null, '#feed=nasa&scene=1');
// } else {
//   console.log(`Setting activeIndex to ${scene}`);
//   window.history.replaceState(null, null, '#feed=nasa&scene=1');
// }

// initialSlide={0} //Set initialSlide = {5} if you want to show swiper in the middle slide by default

// Send message to parent window with activeIndex
// window.parent.postMessage({ activeIndex: index, source: 'swiper' }, '*');
