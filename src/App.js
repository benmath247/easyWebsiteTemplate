import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Testimonials from './pages/testimonials/Testimonials';
import Blog from './pages/blog/Blog';
import TestimonialDetails from './pages/testimonials/TestimonialDetails';
import testimonials from './pages/testimonials/TestimonialsList.json'
import blogs from './pages/blog/blogsList.json'
import BlogDetails from './pages/blog/BlogDetails';
import FAQ from './pages/FAQ';


const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog blogs={blogs} preview={false} />} />
        <Route path="/blog/:blogId" element={<BlogDetails blogs={blogs} />} />
        <Route path="/testimonials" element={<Testimonials testimonials={testimonials} />} />
        <Route path="/testimonials/:slug" element={<TestimonialDetails testimonials={testimonials} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
