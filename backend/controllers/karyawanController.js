const db = require("../config/db");

const addKaryawan = async (req, res) => {
  const { nama, alamat, tgllahir, divisi, status } = req.body;
  try {
    const [result] = await db.query("CALL addKaryawan(?, ?, ?, ?, ?)", [
      nama,
      alamat,
      tgllahir,
      divisi,
      status,
    ]);
    res.status(201).json({ message: "Karyawan berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editKaryawan = async (req, res) => {
  const { nik } = req.params;
  const { nama, alamat, tgllahir, divisi, status } = req.body;
  try {
    await db.query("CALL editKaryawan(?, ?, ?, ?, ?, ?)", [
      nik,
      nama,
      alamat,
      tgllahir,
      divisi,
      status,
    ]);
    res.status(200).json({ message: "Karyawan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteKaryawan = async (req, res) => {
  const { nik } = req.params;
  try {
    await db.query("CALL deleteKaryawan(?)", [nik]);
    res.status(200).json({ message: "Karyawan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKaryawan = async (req, res) => {
  try {
    const [result] = await db.query("CALL getKaryawan()");
    const rows = result[0];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKaryawanById = async (req, res) => {
  const { nik } = req.params;
  try {
    const [result] = await db.query("CALL getKaryawanByNIK(?)", [nik]);
    const rows = result[0];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addKaryawan,
  editKaryawan,
  deleteKaryawan,
  getKaryawan,
  getKaryawanById,
};
