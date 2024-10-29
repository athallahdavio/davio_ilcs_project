import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

function FormEditComponent({ data, isOpen, onClose, onSuccess }) {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tgllahir, setTgllahir] = useState("");
  const [divisi, setDivisi] = useState("");
  const [status, setStatus] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setNama(data.nama);
      setAlamat(data.alamat);
      const adjustedDate = new Date(data.tgllahir);
      adjustedDate.setDate(adjustedDate.getDate() + 1);
      setTgllahir(adjustedDate.toISOString().split("T")[0]);
      setDivisi(data.divisi);
      setStatus(data.status);
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/karyawan/edit/${data.nik}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama,
            alamat,
            tgllahir,
            divisi,
            status,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Data karyawan berhasil diperbarui",
        });
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        toast({
          title: "Gagal",
          description: "Gagal memperbarui karyawan: " + errorData.error,
        });
      }
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Kesalahan: " + error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Karyawan</DialogTitle>
          <DialogDescription>
            Ubah data karyawan di form di bawah ini
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              id="nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Input
              type="text"
              id="alamat"
              name="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tgllahir">Tanggal Lahir</Label>
            <Input
              type="date"
              id="tgllahir"
              name="tgllahir"
              value={tgllahir}
              onChange={(e) => setTgllahir(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="divisi">Divisi</Label>
            <Select
              id="divisi"
              name="divisi"
              value={divisi}
              onValueChange={setDivisi}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup label="Divisi">
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HRD">HRD</SelectItem>
                  <SelectItem value="FINANCE">FINANCE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status Karyawan</Label>
            <Select
              id="status"
              name="status"
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup label="Status Karyawan">
                  <SelectItem value="Tetap">Tetap</SelectItem>
                  <SelectItem value="Kontrak">Kontrak</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

FormEditComponent.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default FormEditComponent;
