import HeroSecCategory from "@/components/user/home/hero-categoies";
import HeroSecGenre from "@/components/user/home/hero-genre";
import HeroSecOne from "@/components/user/home/hero-one";
import HeroSecThird from "@/components/user/home/hero-third";
import HeroSecFourth from "@/components/user/home/hero.fourth";

function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <HeroSecOne />
      <HeroSecGenre />
      <HeroSecThird/>
      <HeroSecCategory/>
      <HeroSecFourth/>
    </div>
  );
}

export default HomePage;
