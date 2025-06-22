"use client"
import { Carousel, Card } from "@/components/ui/Choose-carousel"

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="w-full min-h-screen bg-black py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">Why Choose Us?</h2>
      <Carousel items={cards} />
    </div>
  )
}

const ClientCentricContent = () => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">Your success is our priority.</span> We take the time to understand your
        unique business needs, challenges, and goals. Our dedicated team works closely with you throughout every phase
        of the project, ensuring that our solutions are perfectly aligned with your vision and objectives.
      </p>
    </div>
  )
}

const ProvenTrackRecordContent = () => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">Results speak louder than words.</span> With years of experience and
        hundreds of successful projects delivered, we have established ourselves as a trusted partner for businesses of
        all sizes. Our portfolio showcases innovative solutions that have driven real business growth and
        transformation.
      </p>
    </div>
  )
}

const ScalableSolutionsContent = () => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">Built to grow with your business.</span> Our solutions are designed with
        scalability at their core. Whether you're a startup or an enterprise, our technology stack and architecture
        ensure that your systems can handle increased load, users, and complexity as your business expands.
      </p>
    </div>
  )
}

const OnTimeDeliveryContent = () => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">Deadlines are promises we keep.</span> We understand that time is
        critical in business. Our proven project management methodologies, clear communication channels, and efficient
        development processes ensure that we deliver high-quality solutions within the agreed timeframes, every time.
      </p>
    </div>
  )
}

const CompetitivePricingContent = () => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">Premium quality at fair prices.</span> We believe that exceptional
        solutions shouldn't break the bank. Our transparent pricing model and efficient development processes allow us
        to offer competitive rates without compromising on quality, giving you the best value for your investment.
      </p>
    </div>
  )
}

const data = [
  {
    category: "Our Approach",
    title: "Client-Centric Approach",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <ClientCentricContent />,
  },
  {
    category: "Experience",
    title: "Proven Track Record",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <ProvenTrackRecordContent />,
  },
  {
    category: "Technology",
    title: "Scalable Solutions",
    src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <ScalableSolutionsContent />,
  },
  {
    category: "Reliability",
    title: "On-Time Delivery",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <OnTimeDeliveryContent />,
  },
  {
    category: "Value",
    title: "Competitive Pricing",
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CompetitivePricingContent />,
  },
]
