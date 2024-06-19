import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Testimonials from './pages/testimonials/Testimonials';
import Blog from './pages/Blog';
import TestimonialDetails from './pages/testimonials/TestimonialDetails';
import testimonials from './pages/testimonials/TestimonialsList.json'



const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/testimonials" element={<Testimonials testimonials={testimonials} />} />
        <Route path="/testimonials/:testimonialId" element={<TestimonialDetails testimonials={testimonials} />} />
      </Routes>
    </Router>
  );
};

export default App;
