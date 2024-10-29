require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const karyawanRoutes = require('./routes/karyawanRoute');

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

app.use('/api/karyawan', karyawanRoutes);

app.listen(process.env.DB_PORT, () => {
  console.log(`Server running on port ${process.env.DB_PORT}`);
});