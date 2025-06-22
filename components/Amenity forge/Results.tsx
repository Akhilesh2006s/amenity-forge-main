"use client"
import { ContainerScroll } from "@/components/ui/scroll-animation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-black min-h-screen">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Snapshot of success <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white">Proven results</span>
            </h1>
          </>
        }
      >
        <div className="w-full h-full">
          <Tabs defaultValue="dashboard" className="w-full h-full">
            <TabsList className="inline-flex h-6 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-2 mx-auto">
              <TabsTrigger value="dashboard" className="text-[10px] px-1.5 py-0.5 h-5">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-[10px] px-1.5 py-0.5 h-5">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-[10px] px-1.5 py-0.5 h-5">
                Projects
              </TabsTrigger>
              <TabsTrigger value="team" className="text-[10px] px-1.5 py-0.5 h-5">
                Team
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-[10px] px-1.5 py-0.5 h-5">
                Settings
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-[10px] px-1.5 py-0.5 h-5">
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Dashboard Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Analytics Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Projects Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="team" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Team Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Settings Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>

            <TabsContent value="reports" className="h-full mt-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Reports Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ContainerScroll>
    </div>
  )
}
