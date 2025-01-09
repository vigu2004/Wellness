import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import PricingApp from "./components/PricingApp/PricingApp";  // Import PricingApp

const App = () => {
  return (
    <Router>
      <main className="overflow-x-hidden bg-white text-dark">
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <Services />
            <Banner />
            <Subscribe />
            <Banner2 />
            <Footer />
          </>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<PricingApp />} /> {/* Add PricingApp Route */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
