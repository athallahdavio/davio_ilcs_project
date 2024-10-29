const express = require("express");
const router = express.Router();
const {
  addKaryawan,
  editKaryawan,
  deleteKaryawan,
  getKaryawan,
  getKaryawanById,
} = require("../controllers/karyawanController");

router.post("/add", addKaryawan);

router.put("/edit/:nik", editKaryawan);

router.delete("/delete/:nik", deleteKaryawan);

router.get("/", getKaryawan);

router.get("/:nik", getKaryawanById);

module.exports = router;
