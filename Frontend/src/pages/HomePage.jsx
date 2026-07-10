import Hero from '../components/Hero';
import Products from '../components/Products';
import AboutSection from '../components/AboutSection';
import ProcessAnimation from '../components/ProcessAnimation';
import IndustriesWeEmpower from '../components/IndustriesWeEmpower';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <AboutSection />
      {/* <ProcessAnimation /> */}
      <IndustriesWeEmpower />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
