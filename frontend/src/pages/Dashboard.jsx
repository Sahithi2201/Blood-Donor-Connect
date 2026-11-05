
import { useEffect, useState } from "react";

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError("");

      const [donorResponse, requestResponse] = await Promise.all([
        fetch("http://localhost:5000/api/donors"),
        fetch("http://localhost:5000/api/blood-requests")
      ]);

      const donorData = await donorResponse.json();
      const requestData = await requestResponse.json();

      if (!donorResponse.ok || !requestResponse.ok) {
        throw new Error("Unable to load dashboard data");
      }

      setDonors(donorData.donors || []);
      setRequests(requestData.requests || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const availableDonors = donors.filter(
    (donor) => donor.available === true
  );

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchDashboardData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Dashboard Heading */}
      <div className="dashboard-header">
        <div>
          <h1>Blood Donor Dashboard</h1>
          <p>Overview of donors and blood requests</p>
        </div>

        <button onClick={fetchDashboardData}>
          Refresh Data
        </button>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Donors</h3>
          <h1>{donors.length}</h1>
          <p>Registered donors</p>
        </div>

        <div className="stat-card">
          <h3>Available Donors</h3>
          <h1>{availableDonors.length}</h1>
          <p>Currently available</p>
        </div>

        <div className="stat-card">
          <h3>Total Requests</h3>
          <h1>{requests.length}</h1>
          <p>Blood requests received</p>
        </div>

        <div className="stat-card">
          <h3>Pending Requests</h3>
          <h1>{pendingRequests.length}</h1>
          <p>Waiting for response</p>
        </div>

      </div>

      {/* Blood Group Statistics */}
      <div className="dashboard-card">
        <h2>Blood Group Statistics</h2>

        <div className="blood-group-grid">
          {bloodGroups.map((group) => {
            const count = donors.filter(
              (donor) => donor.bloodGroup === group
            ).length;

            return (
              <div className="blood-group-item" key={group}>
                <h3>{group}</h3>
                <p>{count} Donors</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Blood Requests */}
      <div className="dashboard-card">
        <h2>Recent Blood Requests</h2>

        {requests.length === 0 ? (
          <p>No blood requests available.</p>
        ) : (
          [...requests]
            .sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
            .slice(0, 5)
            .map((request) => (
              <div className="dashboard-request" key={request._id}>
                <h3>{request.requesterName}</h3>

                <p>
                  Blood Group: <strong>{request.bloodGroup}</strong>
                </p>

                <p>Hospital: {request.hospital}</p>
                <p>City: {request.city}</p>
                <p>Units Required: {request.units}</p>
                <p>Urgency: {request.urgency}</p>

                <p>
                  Status: <strong>{request.status}</strong>
                </p>
              </div>
            ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;
