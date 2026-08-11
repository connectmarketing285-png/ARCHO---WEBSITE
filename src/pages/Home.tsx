import AboutSection from '@/components/home/AboutSection'
import CapabilitiesSection from '@/components/home/CapabilitiesSection'
import ContactSection from '@/components/home/ContactSection'
import Hero from '@/components/home/Hero'
import ServicesSection from '@/components/home/ServicesSection'
import VideoSection from '@/components/home/VideoSection'

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <AboutSection />
      <CapabilitiesSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}
