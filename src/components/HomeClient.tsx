import Spline from "@splinetool/react-spline/next";
import Link from "next/link";

export default function HomeClient() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0  justify-center grow flex space-x-10 p-5 mx-5">
        <button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
          Home
        </button>
        <Link
          href="https://www.canva.com/design/DAGQYnOIMzs/cyp9qNShAQqSu8ziErR-xQ/view?utm_content=DAGQYnOIMzs&utm_campaign=designshare&utm_medium=link&utm_source=editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
            Pitch Deck
          </button>
        </Link>
        <Link href="/user">
          <button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
            Launch
          </button>
        </Link>
      </div>

      <main className="overflow-hidden">
        <Spline scene="https://prod.spline.design/kRtJVuaE6pRWgauq/scene.splinecode" />
      </main>
    </div>
  );
}
