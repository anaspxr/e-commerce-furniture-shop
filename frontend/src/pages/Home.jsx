import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Popular from "../components/Popular";
import { Recommend } from "../components/Recommend";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Popular />
      <div>
        <div className="p-5">
          <h1 className="text-2xl text-orange-950 font-semibold mt-10">
            Suggested for you
          </h1>
          <Recommend />
        </div>
      </div>
    </div>
  );
}
