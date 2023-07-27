import { GetHomeSoundsResponse } from "../api/home/sounds/route";
import { GreetingsMemo } from "./_components/Greetings";
import HomeContainer from "./_components/HomeContainer";
import SlidePlayer from "./_components/SlidePlayer";

const fetchHomeSoundList = async () => {
  const res = (await (
    await fetch("http://localhost:3000/api/home/sounds")
  ).json()) as GetHomeSoundsResponse;
  return res.scenes;
};

export default async function HomePage() {
  // const [homeSoundList, setHomeSoundList] = useState<ScenesListItem[]>([]);
  // const [slideActiveIndex, setSlideActiveIndex] = useState(0);

  // useEffect(() => {
  //   fetchHomeSoundList();
  // }, []);

  // const onSlideChange = useCallback<
  //   NonNullable<SlidePlayerProps["onSlideChange"]>
  // >((swiper) => {
  //   setSlideActiveIndex(swiper.realIndex);
  // }, []);

  const homeSoundList = await fetchHomeSoundList();

  return (
    <HomeContainer soundList={homeSoundList} activeIndex={0}>
      <GreetingsMemo />
      <SlidePlayer
        homeSoundList={homeSoundList}
        // onSlideChange={onSlideChange}
      />
    </HomeContainer>
  );
}
