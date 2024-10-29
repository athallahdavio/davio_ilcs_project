import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
import FormEditComponent from "./FormEditComponent";
import { useToast } from "@/hooks/use-toast";

function TableComponents({ data, onSuccess }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditClick = (data) => {
    setSelectedEmployee(data);
    setIsDialogOpen(true);
  };

  const handleDelete = async (nik) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/karyawan/delete/${nik}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Deleted",
          description: "Employee data deleted successfully.",
        });
        onSuccess();
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: "Failed to delete employee: " + data.error,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred: " + error.message,
      });
    }
  };

  return (
    <div className="w-2/3 border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIK</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Divisi</TableHead>
            <TableHead>Status Karyawan</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((karyawan) => (
            <TableRow key={karyawan.nik}>
              <TableCell>{karyawan.nik}</TableCell>
              <TableCell>{karyawan.nama}</TableCell>
              <TableCell>{karyawan.alamat}</TableCell>
              <TableCell>
                {new Date(karyawan.tgllahir).toLocaleDateString()}
              </TableCell>
              <TableCell>{karyawan.divisi}</TableCell>
              <TableCell>{karyawan.status}</TableCell>
              <TableCell className="flex flex-row gap-2 justify-center">
                <Button
                  className="w-20"
                  onClick={() => handleEditClick(karyawan)}
                >
                  Edit
                </Button>
                <Button
                  className="w-20"
                  onClick={() => handleDelete(karyawan.nik)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedEmployee && (
        <FormEditComponent
          data={selectedEmployee}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={() => {
            setSelectedEmployee(null);
            setIsDialogOpen(false);
            onSuccess();
          }}
        />
      )}
    </div>
  );
}
TableComponents.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nik: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      alamat: PropTypes.string.isRequired,
      tgllahir: PropTypes.string.isRequired,
      divisi: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default TableComponents;
