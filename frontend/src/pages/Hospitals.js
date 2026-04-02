import { useParams } from "react-router-dom";
import "../styles/Hospitals.css";
import BackButton from "../components/BackButton";
import img11 from "../assets/images/city.jpg";
import img12 from "../assets/images/west.jpg";
import img13 from "../assets/images/sun.jpg";
function Hospitals() {
  const { city } = useParams();

  const hospitals = [
    {
      name: "City General Hospital",
      description:
        "24/7 emergency services with advanced medical facilities and experienced doctors.",
      image: img11,
      mapLink: "https://maps.app.goo.gl/CRTiS2jjqTfjve2Q6"
    },
    {
      name: "Green Valley Medical Center",
      description:
        "Specialized in cardiology, neurology and modern surgical treatments.",
      image: img12,
      mapLink: "https://maps.app.goo.gl/CRTiS2jjqTfjve2Q6"
    },
    {
      name: "Sunrise Health Clinic",
      description:
        "Affordable healthcare services with modern diagnostic labs.",
      image: img13,
      mapLink: "https://maps.app.goo.gl/CRTiS2jjqTfjve2Q6"
    },
  ];

  return (
    <>
      <BackButton />
      <div className="hospital-container">
        <h1>{city} Hospitals & HealthCare</h1>

        <div className="hospital-grid">
          {hospitals.map((item, index) => (
            <div key={index} className="hospital-card">

              <div className="image-wrapper">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="hospital-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className="hospital-buttons">

                  <a
                    href={item.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="map-btn">View Map</button>
                  </a>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hospitals;