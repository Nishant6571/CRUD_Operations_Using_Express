const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// --get-data--

app.get("/", (req, res) => {
  try {
    const totalData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.status(200).send(totalData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --add-data-to-students--

app.post("/students", (req, res) => {
  try {
    const totalData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    totalData.students.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(totalData), "utf-8");
    res.status(200).json(totalData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --add-data-to-teachers--

app.post("/teachers", (req, res) => {
  try {
    const totalData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    totalData.teachers.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(totalData), "utf-8");
    res.status(200).json(totalData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --patch--Student--data--

app.patch("/students/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const totaldata = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    let index = -1;
    let count = 0;
    totaldata.students.forEach((student) => {
      if (student.id === id) {
        index = count;
      }
      count++;
    });
    if (index === -1) {
      res.status(404).json({ message: "Student not found with the given ID" });
    } else {
      totaldata.students[index] = req.body;
      fs.writeFileSync("./db.json", JSON.stringify(totaldata), "utf-8");
      res.status(200).json(totaldata);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --Delete--Student--data--

app.delete("/students/:id", (req, res) => {
  try {
    let totalData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let id = +req.params.id;

    let index = -1;
    let count = 0;
    totalData.students.forEach((student) => {
      if (student.id === id) {
        index = count;
      }
      count++;
    });
    if (index === -1) {
      res.status(404).json({ message: "Student not found with the given ID" });
    } else {
      totalData = totalData.students.filter((data) => data.id != id);
      fs.writeFileSync("./db.json", JSON.stringify(totalData));
      res.status(200).json(totalData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
