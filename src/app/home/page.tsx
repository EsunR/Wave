import { headers } from "next/dist/client/components/headers";
import { GreetingsMemo } from "./_components/Greetings";
import HomeContainer from "./_components/HomeContainer";
import SlidePlayer from "./_components/SlidePlayer";
import { getHomeSounds } from "@/api";

export default async function HomePage() {
  headers();
  const homeSoundList = (await getHomeSounds())?.scenes ?? [];

  return (
    <HomeContainer soundList={homeSoundList}>
      <GreetingsMemo />
      <SlidePlayer homeSoundList={homeSoundList} />
    </HomeContainer>
  );
}
