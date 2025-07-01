import { CardSpotlight } from "@/components/card-spotlight"

const services = [
  {
    title: "AI & Automation Solutions",
    description:
      "Leverage AI to automate workflows, customer support, and predictive analytics for efficiency and growth.",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailor-made software that aligns with your business needs using modern frameworks and robust architecture.",
  },
  {
    title: "Web & Mobile App Development",
    description:
      "Build high-performance websites and mobile applications across platforms with seamless user experience.",
  },
  {
    title: "UI/UX Design",
    description:
      "Craft intuitive and engaging interfaces focused on usability, accessibility, and delightful interactions.",
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your online presence with SEO, PPC, content marketing, and social media strategies that convert.",
  },
  {
    title: "Cloud Deployment & DevOps",
    description: "Deploy scalable cloud infrastructure with CI/CD pipelines and DevOps practices for faster delivery.",
  },
  {
    title: "Video Editing",
    description:
      "Professional video production, cutting, and enhancements for marketing, training, and content creation.",
  },
  {
    title: "Quality Assessments",
    description: "Comprehensive QA services including manual and automated testing for bug-free product delivery.",
  },
  {
    title: "Blockchain",
    description: "Build secure and transparent decentralized apps with blockchain integration and smart contracts.",
  },
  {
    title: "PowerPoint / Pitch deck",
    description: "Stunning presentations and pitch decks that communicate your ideas with clarity and impact.",
  },
  {
    title: "Data Analytics",
    description: "Turn raw data into insights using dashboards, business intelligence tools, and predictive models.",
  },
  {
    title: "Customer Support",
    description:
      "Scalable customer service with chat, email, and voice support to maintain satisfaction and retention.",
  },
  {
    title: "Audio/ Video Support",
    description: "Manage AV setup, troubleshooting, and remote assistance for smooth virtual and in-person events.",
  },
  {
    title: "Freelance/Employment Support",
    description: "Match skilled professionals with opportunities, and support hiring through digital platforms.",
  },
  {
    title: "Start-up Executions",
    description: "End-to-end execution for startups—from idea validation to product launch and scaling.",
  },
]

export default function ServicesGrid() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Comprehensive solutions to transform your business with cutting-edge technology and expert execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <CardSpotlight key={index} className="h-64 w-full" color="#1e40af">
              <div className="relative z-20 h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-neutral-200 text-sm leading-relaxed flex-1">{service.description}</p>
                
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  )
}

const ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

