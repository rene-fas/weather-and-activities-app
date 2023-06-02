import "./App.css";
import Form from "./components/form/Form";
import { useState } from "react";
import { uid } from "uid";
import ListDisplay from "./components/list/List";
import useLocalStorageState from "use-local-storage-state";

const testArray = [{ id: uid(), name: "test", goodWeather: "test" }];

function App() {
  const [activities, setActivities] = useLocalStorageState(testArray);

  function handleAddActivity(activity) {
    setActivities([
      ...activities,
      {
        id: uid(),
        name: activity.name,
        goodWeather: activity.goodWeather,
      },
    ]);
    console.log("activities:" + activities);
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
