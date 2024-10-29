import { useEffect, useState } from "react";
import FormAddComponent from "../components/FormAddComponent";
import TableComponents from "../components/TableComponents";

function DataPages() {
  const [karyawan, setKaryawan] = useState([]);

  const fetchKaryawan = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/karyawan`
      );
      if (!response.ok) throw new Error("Data tidak dapat diambil");
      const data = await response.json();
      setKaryawan(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20 font-montserrat mb-20">
      <h1 className="text-3xl mb-8 font-bold">Data Karyawan</h1>
      <FormAddComponent onSuccess={fetchKaryawan} />
      <TableComponents data={karyawan} onSuccess={fetchKaryawan} />
    </div>
  );
}

export default DataPages;
