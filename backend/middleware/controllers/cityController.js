import db from "../config/db.js";
export const getCities = (req, res) => {

  db.query("SELECT * FROM cities", (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

};
export const addCity = (req, res) => {

  const { name, overview, culture, festivals } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO cities (name, overview, culture, festivals, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, overview, culture, festivals, image], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "City added successfully",
      image: image
    });

  });

};