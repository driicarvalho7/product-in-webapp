import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/Auth/Auth";
import CampaignSelection from "../pages/Campaigns/CampaignSelection";
import CampaignCreate from "../pages/Campaigns/CampaignCreate";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route
          path="/campaign-selection"
          element={<PrivateRoute component={CampaignSelection} />}
        />
        <Route
          path="/campaign-create"
          element={<PrivateRoute component={CampaignCreate} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
