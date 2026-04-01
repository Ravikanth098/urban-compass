import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import "../styles/cities.css";
import BackButton from "../components/BackButton";

// Optional (you can keep or remove)
import { formatCityName } from "../utils/cityLibrary";

function Cities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);

  // Fetch cities on load
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await API.get("/cities");
      setCities(res.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  return (
    <>
      <BackButton />

      <div className="cities-page">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Return Back
        </button>

        <h2>
          Discover your preferred city by selecting from the choices below.
        </h2>

        <div className="city-grid">
          {cities.length === 0 ? (
            <p>No cities found</p>
          ) : (
            cities.map((city) => (
              <motion.div
                key={city.id}
                whileHover={{ scale: 1.05 }}
                className="city-card"
                onClick={() => navigate(`/dashboard/${city.name}`)}
              >
                {/* ✅ FIXED IMAGE */}
                <img
                  src={
                    city.image
                      ? city.image
                      : "https://via.placeholder.com/300"
                  }
                  alt={city.name}
                />

                {/* Overlay */}
                <div className="overlay">
                  {formatCityName
                    ? formatCityName(city.name)
                    : city.name}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Cities;