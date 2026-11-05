
import { useState } from "react";
import "./App.css";

import DonorRegistration from "./pages/DonorRegistration";
import BloodRequest from "./pages/BloodRequest";
import FindDonors from "./pages/FindDonors";
import Dashboard from "./pages/Dashboard";
import ViewRequests from "./pages/ViewRequests";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const [page, setPage] = useState("home");
  const [authPage, setAuthPage] = useState("login");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("home");
    setAuthPage("login");
  }

  function renderPage() {
    switch (page) {
      case "donor":
        return <DonorRegistration />;

      case "request":
        return <BloodRequest />;

      case "find":
        return <FindDonors />;

      case "viewRequests":
        return <ViewRequests />;

      case "dashboard":
        return <Dashboard />;

      default:
        return (
          <section className="hero">
            <div className="hero-content">
              <span className="hero-tag">
                ❤️ Be a Hero. Donate Blood.
              </span>

              <h1>
                Every Drop of Blood
                <br />
                <span>Can Save a Life</span>
              </h1>

              <p>
                Blood Donor Connect helps people find blood donors
                during emergencies. Register as a donor, find
                available donors, and help save lives.
              </p>

              <div className="hero-buttons">
                <button onClick={() => setPage("donor")}>
                  Become a Donor
                </button>

                <button onClick={() => setPage("find")}>
                  Find Blood Donors
                </button>

                <button onClick={() => setPage("request")}>
                  Request Blood
                </button>
              </div>
            </div>
          </section>
        );
    }
  }

  // Show Login and Signup before authentication
  if (!user) {
    return (
      <div className="app">
        <div className="website-background">
          <div className="auth-header">
            <h2>🩸 Blood Donor Connect</h2>
            <p>Donate Blood. Save Lives.</p>
          </div>

          <div className="auth-buttons">
            <button onClick={() => setAuthPage("login")}>
              Login
            </button>

            <button onClick={() => setAuthPage("signup")}>
              Sign Up
            </button>
          </div>

          {authPage === "login" ? (
            <>
              <Login onLogin={setUser} />

              <p className="auth-switch">
                Don't have an account?{" "}
                <button onClick={() => setAuthPage("signup")}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <Signup onSignup={setUser} />

              <p className="auth-switch">
                Already have an account?{" "}
                <button onClick={() => setAuthPage("login")}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Show homepage after authentication
  return (
    <div className="app">
      <div className="website-background">
        <nav className="navbar">
          <h2>🩸 Blood Donor Connect</h2>

          <div className="nav-links">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("donor")}>Register Donor</button>
            <button onClick={() => setPage("find")}>Find Donors</button>
            <button onClick={() => setPage("request")}>Request Blood</button>
            <button onClick={() => setPage("viewRequests")}>View Requests</button>
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <main>{renderPage()}</main>

        <footer>
          <p>
            © 2026 Blood Donor Connect |
            Donate Blood, Save Lives.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
