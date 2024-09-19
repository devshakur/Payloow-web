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
    <body className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </body>
  );
}

export default App;
