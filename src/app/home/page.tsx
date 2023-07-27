import { GetHomeSoundsResponse } from "../api/home/sounds/route";
import { GreetingsMemo } from "./_components/Greetings";
import HomeContainer from "./_components/HomeContainer";
import SlidePlayer from "./_components/SlidePlayer";

const fetchHomeSoundList = async () => {
  const res = (await (
    await fetch(`http://localhost:${process.env.PORT || 3000}/api/home/sounds`)
  ).json()) as GetHomeSoundsResponse;
  return res.scenes;
};

export default async function HomePage() {
  const homeSoundList = await fetchHomeSoundList();

  return (
    <HomeContainer soundList={homeSoundList}>
      <GreetingsMemo />
      <SlidePlayer homeSoundList={homeSoundList} />
    </HomeContainer>
  );
}
