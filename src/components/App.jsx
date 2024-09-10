import React from "react";
import {
  About,
  CTA,
  Footer,
  Hero,
  Navbar,
  Services,
  Testimonials,
} from "./LandingPage";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
