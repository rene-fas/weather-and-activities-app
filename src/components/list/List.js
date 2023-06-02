import "./List.css";

export default function ListDisplay({ activity, onDelete, id }) {
  return (
    <>
      <div classList="list-container">
        <li classList="list">
          {activity}
          <button type="button" onClick={() => onDelete(id)}>
            x
          </button>
        </li>
      </div>
    </>
  );
}
