
import { useState } from "react";

function BloodRequest() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    city: "",
    phone: "",
    urgency: "Normal",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://blood-donor-connect-lynp.onrender.com/api/blood-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requesterName: formData.patientName,
            bloodGroup: formData.bloodGroup,
            units: Number(formData.units),
            hospital: formData.hospital,
            city: formData.city,
            phone: formData.phone,
            urgency: formData.urgency,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit request");
      }

      setMessage("Blood request submitted successfully!");

      setFormData({
        patientName: "",
        bloodGroup: "",
        units: "",
        hospital: "",
        city: "",
        phone: "",
        urgency: "Normal",
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h1>🩸 Request Blood</h1>
      <p>Submit your blood requirement details.</p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
            (group) => (
              <option key={group} value={group}>
                {group}
              </option>
            )
          )}
        </select>

        <input
          type="number"
          name="units"
          placeholder="Required Units"
          min="1"
          value={formData.units}
          onChange={handleChange}
          required
        />

        <input
          name="hospital"
          placeholder="Hospital Name"
          value={formData.hospital}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Emergency">Emergency</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Blood Request"}
        </button>
      </form>
    </div>
  );
}

export default BloodRequest;
