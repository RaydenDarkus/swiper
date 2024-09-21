/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MySwiper from './components/MySwiper/MySwiper';
import SwiperLoop from './components/SwiperLoop/SwiperLoop';

export default function App() {
  return (
    <Router basename="/swiper">
      <Routes>
        <Route path="/" element={<MySwiper/>}/>
        <Route path="/loop" element={<SwiperLoop/>}/>
      </Routes>
    </Router>
  );
}

