
// import { useState } from "react";

// function FindDonors() {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [city, setCity] = useState("");
//   const [donors, setDonors] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Search donors
//   async function handleSearch(e) {
//     e.preventDefault();

//     setLoading(true);
//     setSearched(true);
//     setError("");
//     setDonors([]);

//     try {
//       const params = new URLSearchParams({ bloodGroup, city });

//       const response = await fetch(
//         `http://localhost:5000/api/donors/search?${params.toString()}`
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to find donors");
//       }

//       setDonors(data.donors || []);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Delete donor
//   async function deleteDonor(id) {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this donor?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/donors/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to delete donor");
//       }

//       alert("Donor deleted successfully!");

//       setDonors((previousDonors) =>
//         previousDonors.filter((donor) => donor._id !== id)
//       );

//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   return (
//     <div className="form-container">
//       <h1>🔍 Find Blood Donors</h1>

//       <p>Search available donors by blood group and city.</p>

//       <form onSubmit={handleSearch}>
//         <select
//           value={bloodGroup}
//           onChange={(e) => setBloodGroup(e.target.value)}
//           required
//         >
//           <option value="">Select Blood Group</option>

//           {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
//             (group) => (
//               <option key={group} value={group}>
//                 {group}
//               </option>
//             )
//           )}
//         </select>

//         <input
//           type="text"
//           placeholder="Enter City"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Searching..." : "Search Donors"}
//         </button>
//       </form>

//       {searched && (
//         <div>
//           <h3>Search Results</h3>

//           {loading && <p>Searching for donors...</p>}

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {!loading && !error && donors.length > 0 && (
//             <>
//               <p>Found {donors.length} available donor(s).</p>

//               {donors.map((donor) => (
//                 <div className="donor-card" key={donor._id}>
//                   <h3>{donor.name}</h3>

//                   <p>Blood Group: {donor.bloodGroup}</p>
//                   <p>Age: {donor.age}</p>
//                   <p>City: {donor.city}</p>
//                   <p>Availability: Available</p>

//                   <button
//                     onClick={() => deleteDonor(donor._id)}
//                     style={{
//                       background: "#b91c1c",
//                       marginTop: "12px",
//                     }}
//                   >
//                     Delete Donor
//                   </button>
//                 </div>
//               ))}
//             </>
//           )}

//           {!loading && !error && donors.length === 0 && (
//             <p>No matching available donors found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FindDonors;

import { useState } from "react";

function FindDonors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search donors
  async function handleSearch(e) {
    e.preventDefault();

    setLoading(true);
    setSearched(true);
    setError("");
    setDonors([]);

    try {
      const params = new URLSearchParams({ bloodGroup, city });

      const response = await fetch(
        `http://localhost:5000/api/donors/search?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to find donors");
      }

      setDonors(data.donors || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Delete donor
  async function deleteDonor(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/donors/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete donor");
      }

      alert("Donor deleted successfully!");

      setDonors((previousDonors) =>
        previousDonors.filter((donor) => donor._id !== id)
      );

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="form-container">
      <h1>🔍 Find Blood Donors</h1>

      <p>Search available donors by blood group and city.</p>

      <form onSubmit={handleSearch}>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
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
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Donors"}
        </button>
      </form>

      {searched && (
        <div>
          <h3>Search Results</h3>

          {loading && <p>Searching for donors...</p>}

          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          {!loading && !error && donors.length > 0 && (
            <>
              <p>Found {donors.length} available donor(s).</p>

              {donors.map((donor) => (
                <div className="donor-card" key={donor._id}>
                  <h3>👤 {donor.name}</h3>

                  <p>🩸 Blood Group: {donor.bloodGroup}</p>
                  <p>Age: {donor.age}</p>
                  <p>📍 City: {donor.city}</p>
                  <p>📞 Phone: {donor.phone}</p>
                  <p>Availability: Available</p>

                  <a
                    href={`tel:${donor.phone}`}
                    style={{
                      display: "inline-block",
                      background: "#15803d",
                      color: "white",
                      padding: "10px 18px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                  >
                    📞 Contact Donor
                  </a>

                  <button
                    onClick={() => deleteDonor(donor._id)}
                    style={{
                      background: "#b91c1c",
                      marginTop: "12px",
                    }}
                  >
                    Delete Donor
                  </button>
                </div>
              ))}
            </>
          )}

          {!loading && !error && donors.length === 0 && (
            <p>No matching available donors found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FindDonors;
