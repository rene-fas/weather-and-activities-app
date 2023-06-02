export default function Headline({ isGoodWeather }) {
  return <h1>{isGoodWeather ? "Hello Summer" : "Hello Rain"}</h1>;
}
