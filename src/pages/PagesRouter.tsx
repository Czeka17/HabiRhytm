import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HabitsPage from './HabitsPage/HabitsPage';
import SummaryPage from './SummaryPage/SummaryPage';
import RewardsPage from './RewardsPage/RewardsPage';
import Nav from '../components/Nav/Nav';
import FillHabitsPage from './FillHabitsPage/FillHabitsPage';
import ChallangesPage from './ChallangesPage/ChallangesPage';
function PagesRouter(){
    return  <Router>
        <Nav/>
    <Routes>
      <Route path="/" element={<HabitsPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/fill" element={<FillHabitsPage />} />
      <Route path="/challanges" element={<ChallangesPage />} />
    </Routes>
  </Router>
}
export default PagesRouter;