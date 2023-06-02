export default function form() {
  return (
    <>
      <form>
        <h1>Add new activity</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name"></input>
        <label htmlFor="activity">Good weather activity</label>
        <input type="checkbox" name="activity"></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
