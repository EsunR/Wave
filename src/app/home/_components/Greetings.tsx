function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    return "夜深了";
  } else if (hour >= 6 && hour < 12) {
    return "早安";
  } else if (hour >= 12 && hour < 14) {
    return "午间休憩";
  } else if (hour >= 14 && hour < 18) {
    return "下午好";
  } else if (hour >= 18 && hour < 24) {
    return "一天辛苦了";
  }
}

export default function Greetings() {
  return (
    <div className="text-white absolute top-0 left-0 p-4 z-10">
      <i className="opacity-70">Hi Dear</i>
      <div className="text-3xl font-bold">{getTimeGreeting()}</div>
    </div>
  );
}
