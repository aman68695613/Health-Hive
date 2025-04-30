/* eslint-disable react/prop-types */

import { Header } from './Header'
import { Hero } from './Hero'
import { LogoTicker } from './LogoTicker'
import { ProductShowcase } from './ProductShowcase'
// import { Pricing } from './Pricing'
import { Testimonials } from './Testimonials'
import { CallToAction } from './CallToAction'
import { Footer } from './Footer'


const HomePage = () => {
  return (
    <div className="relative">
      <Header   />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage