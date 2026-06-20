import React from 'react'
import HeroSection from '../pages/HeroSection'
import TrustedCompanies from '../pages/TrustedCompanies'
import PopularCategories from '../pages/PopularCategories'
import WhyChooseFreeLincer from '../pages/WhyChooseFreeLincer'
import FeaturedFreelancers from '../pages/FeaturedFreeLinced'
import HowItWorks from '../pages/HowItWork'
import FeaturedProjects from '../pages/FeaturedProjects'
import Testimonials from '../pages/Testimonials'
import FAQ from '../pages/FAQ'
import CTABanner from '../pages/CTABanner'
import Newsletter from '../pages/NewsLetter'

const Home = () => {
  return (
     <div className="">
      <HeroSection/>
      <TrustedCompanies/>
      <PopularCategories/>
      <WhyChooseFreeLincer/>
      <FeaturedFreelancers/>
      <HowItWorks/>
      <FeaturedProjects/>
      <Testimonials/>
      <FAQ/>
      <CTABanner/>
      <Newsletter/>
    </div>
  )
}

export default Home
