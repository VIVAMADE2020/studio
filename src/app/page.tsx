
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { LoanCalculatorSection } from '@/components/sections/loan-calculator-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PartnersSection } from '@/components/sections/partners-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <LoanCalculatorSection />
      <TestimonialsSection />
      <PartnersSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
