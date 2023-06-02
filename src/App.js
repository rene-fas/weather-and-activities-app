import "./App.css";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";
import { uid } from "uid";
import ListDisplay from "./components/list/List";
import useLocalStorageState from "use-local-storage-state";
import Headline from "./components/list/Headline";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", []);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchData() {
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const data = await response.json();
    setWeatherData({
      isGoodWeather: data.isGoodWeather,
      temperature: data.temperature,
      condition: data.condition,
    });
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
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  }

  const activitiesList =
    activities !== null && activities !== undefined ? activities : [];

  const goodWeatherActivitiesList = activitiesList.filter(
    (activity) => activity.goodWeather === weatherData?.isGoodWeather
  );

  return (
    <>
      {weatherData && (
        <>
          <div>{weatherData.temperature}</div>
          <div>{weatherData.condition}</div>
          <Headline isGoodWeather={weatherData.isGoodWeather} />
        </>
      )}

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
