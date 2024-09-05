import { Link } from 'react-router-dom';
function MinigamesList() {
  return (
    <div className="max-w-[1200px] my-0 mx-auto">
      <ul className="flex items-center justify-center flex-wrap gap-4">
        <li
          className="w-[40%] p-2 h-[200px]"
          style={{ backgroundColor: `var(--accent-color)` }}
        >
          <Link to="/minigames/garden">Garden</Link>
        </li>
        <li
          className="w-[40%] p-2 h-[200px]"
          style={{ backgroundColor: `var(--accent-color)` }}
        >
          Game
        </li>
        <li
          className="w-[40%] p-2 h-[200px]"
          style={{ backgroundColor: `var(--accent-color)` }}
        >
          Game
        </li>
        <li
          className="w-[40%] p-2 h-[200px]"
          style={{ backgroundColor: `var(--accent-color)` }}
        >
          Game
        </li>
        <li
          className="w-[40%] p-2 h-[200px]"
          style={{ backgroundColor: `var(--accent-color)` }}
        >
          Game
        </li>
      </ul>
    </div>
  );
}
export default MinigamesList;
