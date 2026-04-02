import { useEffect, useState } from "react";
import API from "../../api/api";
import "../styles/Managehot.css";

function ManageItems({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL;

  // ✅ FETCH
  const fetchItems = async () => {
    try {
      const res = await API.get(`/${endpoint}`);
      setItems(res.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ✅ ADD ITEM
  const addItem = async () => {
    if (!name.trim()) {
      alert(`${title} name required`);
      return;
    }

    if (!image) {
      alert("Image required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description);
      formData.append("mapLink", mapLink);
      formData.append("image", image);

      await API.post(`/${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // reset
      setName("");
      setDescription("");
      setMapLink("");
      setImage(null);
      setPreview("");

      fetchItems();
    } catch (error) {
      console.log("Upload error:", error);
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/${endpoint}/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
      alert("Delete failed");
    }
  };

  // ✅ IMAGE HANDLE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image allowed");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="manage-container">

      <h2>{title}</h2>

      {/* FORM */}
      <div className="form-box">

        <input
          placeholder={`${title} Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="file" onChange={handleImageChange} />

        {preview && <img src={preview} className="preview-img" alt="preview" />}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Google Map Link"
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
        />

        <button onClick={addItem} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

      {/* LIST */}
      <div className="hotel-grid">
        {items.length === 0 ? (
          <p>No {title} found</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="hotel-card">

              <h4>{item.name}</h4>

              {/* ✅ FIXED IMAGE */}
              <img
                src={
                  item.image
                    ? `${BASE_URL}/uploads/${item.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={item.name}
              />

              <p>{item.description}</p>

              {item.mapLink && (
                <a href={item.mapLink} target="_blank" rel="noreferrer">
                  View Map
                </a>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ManageItems;