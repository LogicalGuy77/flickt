import Poll from "@/components/Poll";
import Starfield from "@/components/Starfield";
import { FloatingDock } from "@/components/floating-dock";
import PhantomComponent from "@/components/PhantomComponent";

export default function ProposalsPage() {
  return (
    <main className="relative flex flex-col w-full h-screen p-4 bg-black">
      <Starfield />

      <div className="fixed top-0 right-0 h-[20%] m-5">
        <div className="w-[280px] mt-4">
          <div className="ml-auto flex translate-x-14">
            <PhantomComponent />
          </div>
        </div>
      </div>

      <div className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2">
        <FloatingDock
          items={[
            { title: "Home", icon: "🏠", href: "/" },
            {
              title: "Pitch Deck",
              icon: "📊",
              href:
                "https://www.canva.com/design/DAGQYnOIMzs/cyp9qNShAQqSu8ziErR-xQ/view?utm_content=DAGQYnOIMzs&utm_campaign=designshare&utm_medium=link&utm_source=editor",
            },
            { title: "Profile", icon: "🚀", href: "/user/profile" },
            { title: "Proposals", icon: "📒", href: "/user/proposals" },
          ]}
        />
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-[1200px] p-4">
          <Poll />
        </div>
      </div>
    </main>
  );
}
