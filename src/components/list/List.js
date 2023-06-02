export default function ListDisplay({ activity, onDelete, id }) {
  return (
    <>
      <li>
        {activity}
        <button type="button" onClick={() => onDelete(id)}>
          x
        </button>
      </li>
    </>
  );
}
