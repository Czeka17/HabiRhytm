import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
import { useExperience } from '../../context/ExperienceContext';
import { Progress } from '../../UI/Progress/progress';
function Nav() {
  const { exp, NextLevelExp, level } = useExperience();

  const progress = (exp / NextLevelExp) * 100;
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
            <div>
              <p>level: {level}</p>
              <p>
                {exp}/{NextLevelExp}
              </p>
              <Progress value={progress} style={{ width: `100px` }} />
            </div>
            <img src="https://image.ceneostatic.pl/data/article_picture/3b/57/7fdb-9928-4029-a5f4-6b1556cb59d1_large.jpg" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
