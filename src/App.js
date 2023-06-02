import "./App.css";
import Form from "./components/form/Form";
import { useState } from "react";
import { uid } from "uid";
import ListDisplay from "./components/list/List";
import useLocalStorageState from "use-local-storage-state";
import Headline from "./components/list/Headline";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", []);
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState(null);

  async function fetchData() {
    const response = await fetch(
      "https://example-apis.vercel.app/api/weather/arctic"
    );
    const data = await response.json();
    console.log(data);
    setWeather(data.isGoodWeather);
    setTemperature(data.temperature);
    setCondition(data.condition);
  }
  fetchData();

  function handleAddActivity(inputName, isChecked) {
    const newActivity = {
      id: uid(),
      name: inputName,
      goodWeather: isChecked,
    };

    setActivities((prevActivities) => {
      const updatedActivities = prevActivities ? [...prevActivities] : [];
      updatedActivities.push(newActivity);
      return updatedActivities;
    });
  }

  const activitiesList =
    activities !== null && activities !== undefined ? activities : [];

  const goodWeatherActivitiesList = activitiesList.filter(
    (activity) => activity.goodWeather === weather
  );

  return (
    <>
      <div>{temperature}</div>
      <div>{condition}</div>
      <Headline isGoodWeather={weather} />
      <ul>
        {goodWeatherActivitiesList.map((activity) => (
          <ListDisplay key={activity.id} activity={activity.name} />
        ))}
      </ul>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}
/**if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>; */
export default App;

/*
import "./App.css";
import Form from "./components/form/Form";
import { useState } from "react";
import { uid } from "uid";
import ListDisplay from "./components/list/List";

function App() {
  const [activities, setActivities] = useState([]);

  function handleAddActivity(activity) {
    const newActivity = {
      id: uid(),
      name: activity.name,
      goodWeather: activity.goodWeather,
    };

    setActivities([...activities, newActivity]);
    console.log(activities);
  }

  return (
    <>
      <Form onAddActivity={handleAddActivity} />

      <ul>
        {activities.map((activity) => {
          return <ListDisplay key={activity.id} activity={activity.name} />;
        })}
      </ul>
    </>
  );
}

export default App;

 */
