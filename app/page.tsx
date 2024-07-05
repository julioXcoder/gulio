import Hero from "./hero";
import Navbar from "./navbar";
import Slider from "./slider";
import Features from "./features";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Slider />
      <Footer />
    </>
  );
}
