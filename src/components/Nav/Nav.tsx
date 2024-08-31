import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
function Nav() {
  return (
    <nav>
      <ul className={classes.navList}>
        <li>
          <NavLink to="/" className={classes.link}>
            Habits
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/summary">
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/challanges">
            Challanges
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/rewards">
            Rewards
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/profile">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
