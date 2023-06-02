import "./App.css";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";
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
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const data = await response.json();
    setWeather(data.isGoodWeather);
    setTemperature(data.temperature);
    setCondition(data.condition);
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  function handleDelete(id) {
    setActivities(
      activities.filter((activity) => {
        return activity.id !== id;
      })
    );
  }

  const activitiesList =
    activities !== null && activities !== undefined ? activities : [];

  const goodWeatherActivitiesList = activitiesList.filter(
    (activity) => activity.goodWeather === weather
  );

  return (
    <>
      <div className="temperature-container">
        <div className="temperature">{temperature}°C</div>
        <div className="condition-pic">{condition}</div>
      </div>
      <Headline isGoodWeather={weather} />
      <ul>
        {goodWeatherActivitiesList.map((activity) => (
          <ListDisplay
            onDelete={handleDelete}
            key={activity.id}
            activity={activity.name}
            id={activity.id}
          />
        ))}
      </ul>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
