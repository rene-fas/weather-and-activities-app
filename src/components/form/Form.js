import "./Form.css";

export default function form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const inputName = data.name;
    const isChecked = event.target.goodWeather.checked;
    onAddActivity(inputName, isChecked);
    event.target.reset();
    event.target.name.focus();
  }

  return (
    <>
      <div>
        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className="form-headline">Add new activity</h1>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name"></input>
          <label htmlFor="goodWeather">Good weather activity</label>
          <input
            className="form-checkbox"
            type="checkbox"
            name="goodWeather"
          ></input>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
