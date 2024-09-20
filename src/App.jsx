/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MySwiper from './components/MySwiper/MySwiper';
import SwiperLoop from './components/SwiperLoop/SwiperLoop';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/swiper" element={<MySwiper/>}/>
        <Route path="/swiper/loop" element={<SwiperLoop/>}/>
      </Routes>
    </Router>
  );
}

