import React from "react";
import "../styles/Services.css";
import hospital from "../assets/images/hospital.avif";
import tourist from "../assets/images/tourist.jpg";
import mall from "../assets/images/shoppingmalls.jpg";
import history from "../assets/images/ireland.avif";
import hotel from "../assets/images/hotelicon.png";
function Services() {

  const services = [
    {
      title: "HOSPITALS",
      image: hospital,
      description:
        "Navigate the city's healthcare landscape with our curated guide to top hospitals, ensuring quick access to quality medical care."
    },
    {
      title: "TOURIST PLACES",
      image: tourist,
      description:
        "Explore must-visit tourist places and iconic landmarks for an unforgettable experience."
    },
    {
      title: "SHOPPING MALLS",
      image: mall,
      description:
        "Discover the best shopping malls offering a wide range of retail and entertainment options."
    },
    {
      title: "HISTORY & CULTURE",
      image: history,
      description:
        "Immerse yourself in the city's rich history and culture through famous heritage locations."
    },
    {
      title: "HOTEL BOOKING",
      image: hotel,
      description:
        "Book from a variety of accommodations and enjoy your stay with exclusive offers."
    }
  ];

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p className="services-subtitle">
        Explore our wide range of smart city services.
      </p>

      <div className="services-grid">
        {services.map((item, index) => (
          <div key={index} className="service-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;