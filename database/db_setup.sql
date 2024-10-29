-- Membuat Database
CREATE DATABASE IF NOT EXISTS db_ilcs;
USE db_ilcs;

-- Membuat Tabel m_karyawan
CREATE TABLE IF NOT EXISTS m_karyawan (
  nik VARCHAR(8) PRIMARY KEY,
  nama VARCHAR(150),
  alamat TEXT,
  tgllahir DATE,
  divisi VARCHAR(20),
  status VARCHAR(20),
  created_date DATETIME
);

-- Stored Procedure untuk Menambah Karyawan
DELIMITER //

CREATE PROCEDURE AddKaryawan (
  IN p_nama VARCHAR(150),
  IN p_alamat TEXT,
  IN p_tgllahir DATE,
  IN p_divisi VARCHAR(20),
  IN p_status VARCHAR(20)
)
BEGIN
  DECLARE v_nik VARCHAR(8);
  DECLARE v_kode_divisi VARCHAR(2);
  DECLARE v_tahun VARCHAR(2);
  DECLARE v_no_urut VARCHAR(4);

  IF p_divisi = 'IT' THEN
    SET v_kode_divisi = '10';
  ELSEIF p_divisi = 'HRD' THEN
    SET v_kode_divisi = '11';
  ELSEIF p_divisi = 'FINANCE' THEN
    SET v_kode_divisi = '12';
  END IF;

  SET v_tahun = DATE_FORMAT(NOW(), '%y');

  SET v_no_urut = LPAD((SELECT COUNT(*) + 1 FROM m_karyawan WHERE LEFT(nik, 2) = v_kode_divisi), 4, '0');

  SET v_nik = CONCAT(v_kode_divisi, v_tahun, v_no_urut);

  INSERT INTO m_karyawan (nik, nama, alamat, tgllahir, divisi, status, created_date)
  VALUES (v_nik, p_nama, p_alamat, p_tgllahir, p_divisi, p_status, NOW());
END //

-- Stored Procedure untuk Mengedit Karyawan
CREATE PROCEDURE EditKaryawan (
  IN p_nik VARCHAR(8),
  IN p_nama VARCHAR(150),
  IN p_alamat TEXT,
  IN p_tgllahir DATE,
  IN p_divisi VARCHAR(20),
  IN p_status VARCHAR(20)
)
BEGIN
  UPDATE m_karyawan
  SET nama = p_nama, alamat = p_alamat, tgllahir = p_tgllahir, divisi = p_divisi, status = p_status
  WHERE nik = p_nik;
END //

-- Stored Procedure untuk Menghapus Karyawan
CREATE PROCEDURE DeleteKaryawan (
  IN p_nik VARCHAR(8)
)
BEGIN
  DELETE FROM m_karyawan WHERE nik = p_nik;
END //

-- Stored Procedure untuk Menampilkan Data Karyawan
CREATE PROCEDURE GetKaryawan ()
BEGIN
  SELECT * FROM m_karyawan;
END //

-- Stored Procedure untuk Menampilkan Data Karyawan Berdasarkan NIK
CREATE PROCEDURE GetKaryawanByNIK (
  IN p_nik VARCHAR(8)
)
BEGIN
  SELECT * FROM m_karyawan WHERE nik = p_nik;
END //

DELIMITER ;

-- Menambahkan data Adi
CALL AddKaryawan(
  'Adi', 
  'Jl. Yos Sudarso', 
  '1989-01-22', 
  'IT', 
  'Tetap'
);

-- Menambahkan data Susi
CALL AddKaryawan(
  'Susi', 
  'Jl. Cempaka Mas', 
  '1993-09-09', 
  'HRD', 
  'Kontrak'
);

-- Menambahkan data Bagus
CALL AddKaryawan(
  'Bagus', 
  'Jl. Pademangan', 
  '1991-09-10', 
  'FINANCE', 
  'Kontrak'
);
