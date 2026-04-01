import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function ManageCities() {
  const [cities, setCities] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // ✅ URL string

  const navigate = useNavigate();

  // ✅ AUTH CHECK
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");

    if (!isAuth) {
      navigate("/admin");
    } else {
      fetchCities();
    }
  }, []);

  // ✅ FETCH
  const fetchCities = async () => {
    try {
      const res = await API.get("/cities");
      setCities(res.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Failed to load cities");
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  // ✅ ADD CITY (UPDATED)
  const addCity = async () => {
    if (!name.trim() || !image.trim()) {
      alert("Enter name and image URL");
      return;
    }

    try {
      const newCity = {
        name: name.trim(),
        image: image.trim(),
      };

      await API.post("/cities", newCity);

      setName("");
      setImage("");

      fetchCities();
    } catch (error) {
      console.log("Add error:", error);
      alert("Failed to add city");
    }
  };

  // ✅ DELETE (FIXED)
  const deleteCity = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/cities/${id}`); // ✅ FIXED
      setCities((prev) => prev.filter((city) => city.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin - Manage Cities</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* FORM */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          width: "350px",
          marginBottom: "30px",
        }}
      >
        <input
          placeholder="City Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        {/* ✅ IMAGE URL INPUT */}
        <input
          type="text"
          placeholder="Enter Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br /><br />

        {/* ✅ PREVIEW */}
        {image && (
          <img src={image} alt="preview" width="200" />
        )}

        <br /><br />

        <button onClick={addCity}>Add City</button>
      </div>

      {/* LIST */}
      <h3>City List</h3>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cities.length === 0 ? (
          <p>No cities found</p>
        ) : (
          cities.map((city) => (
            <div
              key={city.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "250px",
                textAlign: "center",
              }}
            >
              <h4>{city.name}</h4>

              {/* ✅ DIRECT IMAGE URL */}
              <img
                src={
                  city.image
                    ? city.image
                    : "https://via.placeholder.com/200"
                }
                alt={city.name}
                width="200"
              />

              <br /><br />

              <button onClick={() => deleteCity(city.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageCities;