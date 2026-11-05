
import { useEffect, useState } from "react";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch all requests
  async function fetchRequests() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://blood-donor-connect-lynp.onrender.com/api/blood-requests"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests(data.requests || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Update request status
  async function updateStatus(id, status) {
    try {
      const response = await fetch(
        `https://blood-donor-connect-lynp.onrender.com/api/blood-requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      alert("Request status updated successfully!");
      fetchRequests();

    } catch (err) {
      alert(err.message);
    }
  }

  // Delete request
  async function deleteRequest(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blood request?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://blood-donor-connect-lynp.onrender.com/api/blood-requests/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      alert("Blood request deleted successfully!");

      setRequests((previousRequests) =>
        previousRequests.filter(
          (request) => request._id !== id
        )
      );

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="form-container">
      <h1>🩸 Blood Requests</h1>

      <p>View and manage submitted blood requests.</p>

      <button onClick={fetchRequests}>
        Refresh Requests
      </button>

      {loading && <p>Loading requests...</p>}

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {!loading && !error && requests.length === 0 && (
        <p>No blood requests available.</p>
      )}

      {!loading && requests.map((request) => (
        <div className="donor-card" key={request._id}>
          <h3>{request.requesterName}</h3>

          <p>Blood Group: {request.bloodGroup}</p>
          <p>Required Units: {request.units}</p>
          <p>Hospital: {request.hospital}</p>
          <p>City: {request.city}</p>
          <p>Urgency: {request.urgency}</p>

          <p>
            Current Status:{" "}
            <strong>{request.status}</strong>
          </p>

          <label>Update Status:</label>

          <select
            value={request.status}
            onChange={(e) =>
              updateStatus(request._id, e.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Donor Contacted">
              Donor Contacted
            </option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={() => deleteRequest(request._id)}
            style={{
              background: "#b91c1c",
              marginTop: "12px",
            }}
          >
            Delete Request
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewRequests;
