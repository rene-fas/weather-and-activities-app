export default function form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    onAddActivity(data);
    event.target.reset();
    //event.target.focus("name"); //check later
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Add new activity</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name"></input>
        <label htmlFor="goodWeather">Good weather activity</label>
        <input type="checkbox" name="goodWeather"></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
