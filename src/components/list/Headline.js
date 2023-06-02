import "./Headline.css";

export default function Headline({ isGoodWeather }) {
  return (
    <h1 className="headline">
      {isGoodWeather ? "Hello Summer" : "Hello Rain"}
    </h1>
  );
}
