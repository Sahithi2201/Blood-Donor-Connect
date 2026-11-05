
import { useState } from "react";

function DonorRegistration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/donors/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            age: Number(age),
            gender,
            email,
            phone,
            bloodGroup,
            city
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Donor registered successfully!");

      setName("");
      setAge("");
      setGender("");
      setEmail("");
      setPhone("");
      setBloodGroup("");
      setCity("");

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h1>Donor Registration</h1>
      <p>Register yourself and help save lives!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="18"
          required
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={phone}
          maxLength="10"
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          pattern="[6-9][0-9]{9}"
          title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9"
          required
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Now"}
        </button>

        {message && (
          <p style={{
            color: message.includes("successfully") ? "green" : "red"
          }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default DonorRegistration;
