// City Utility Library

// Format city name
export function formatCityName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Search cities
export function searchCities(cities, query) {
  return cities.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Generate image URL
export function getCityImage(imageName) {
  return `http://localhost:5000/uploads/${imageName}`;
}