import { ScenesListItem } from "@/types/sounds";
import Greetings from "./_components/Greetings";
import HomeContainer from "./_components/HomeContainer";
import SlidePlayer from "./_components/SlidePlayer";

export default async function HomePage() {
  const homeSoundList = ((await import("@/assets/data/scenes.json")) as any)
    .default as ScenesListItem[];

  return (
    <HomeContainer soundList={homeSoundList}>
      <Greetings />
      <SlidePlayer homeSoundList={homeSoundList} />
    </HomeContainer>
  );
}
