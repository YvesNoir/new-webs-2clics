import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/blocks/HeroSection'
import FeaturedProperties from '@/components/blocks/FeaturedProperties'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProperties />
      <Footer />
    </main>
  )
}