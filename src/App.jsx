import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";

// Client Pages
import ClientDashboard from "./pages/ClientDashboard";
import PostJobs from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import ClientContracts from "./pages/ClientContracts";
import ProposalDetails from "./pages/ProposalDetails";
import FreelancersList from "./pages/FreelancersList";
import FreelancerDetails from "./pages/FreelancerDetails";

// Freelancer Pages
import BrowseJobs from "./pages/BrowseJobs";
import MyProposals from "./pages/MyProposals";
import MyContracts from "./pages/MyContracts";
import SavedJobs from "./pages/SavedJobs";

// Shared Pages
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";

// Freelancer Components
import CreateProfile from "./freelancer/CreateProfile";
import FreelancerProfile from "./freelancer/FreelancerProfile";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CLIENT Protected Routes */}
        <Route
          path="/clientDashboard"
          element={
            <ProtectedRoute role="CLIENT">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/PostJob"
          element={
            <ProtectedRoute role="CLIENT">
              <PostJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MyJobs"
          element={
            <ProtectedRoute role="CLIENT">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-contracts"
          element={
            <ProtectedRoute role="CLIENT">
              <ClientContracts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proposal/:proposalId"
          element={
            <ProtectedRoute role="CLIENT">
              <ProposalDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancers"
          element={
            <ProtectedRoute role="CLIENT">
              <FreelancersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancer-detail/:freelancerId"
          element={
            <ProtectedRoute role="CLIENT">
              <FreelancerDetails />
            </ProtectedRoute>
          }
        />

        {/* FREELANCER Protected Routes */}
        <Route
          path="/browse-jobs"
          element={
            <ProtectedRoute role="FREELANCER">
              <BrowseJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job/:jobId"
          element={
            <ProtectedRoute role="FREELANCER">
              <BrowseJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-proposals"
          element={
            <ProtectedRoute role="FREELANCER">
              <MyProposals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-contracts-freelancer"
          element={
            <ProtectedRoute role="FREELANCER">
              <MyContracts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute role="FREELANCER">
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-profile"
          element={
            <ProtectedRoute role="FREELANCER">
              <CreateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancerProfile"
          element={
            <ProtectedRoute role="FREELANCER">
              <FreelancerProfile />
            </ProtectedRoute>
          }
        />

        {/* SHARED Protected Routes (Both Client and Freelancer) */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
