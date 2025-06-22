import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import CreateRoom from "../pages/CreateRoom";
import VotingRoom from "../pages/VotingRoom";
import TalliesPage from "../pages/LiveTalliesPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/vote/:roomCode" element={<VotingRoom />} />
        <Route path="/tallies/:roomCode" element={<TalliesPage />} />
      </Routes>
    </Router>
  );
}
