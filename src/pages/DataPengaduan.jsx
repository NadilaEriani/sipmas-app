import { MdOutlineDeleteOutline } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { pengaduanAPI } from "../services/adminApi";

export default function DataPengaduan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await pengaduanAPI.fetchAll();
      setPengaduanList(data);
    } catch (error) {
      console.error("❌ Gagal mengambil data pengaduan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus pengaduan ini?");
    if (!konfirmasi) return;

    try {
      await pengaduanAPI.deletePengaduan(id);
      fetchData(); // refresh data setelah hapus
    } catch (error) {
      console.error("❌ Gagal menghapus pengaduan:", error);
      alert("Pengaduan gagal dihapus.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Daftar Pengaduan Mahasiswa
      </h1>

      {loading ? (
        <p className="text-gray-600">Sedang memuat data...</p>
      ) : pengaduanList.length === 0 ? (
        <p className="text-gray-600">Belum ada pengaduan.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Subjek</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengaduanList.map((item, index) => (
                <tr
                  key={item.idPengaduan}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-semibold">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(item.created_at).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(item.idPengaduan)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdOutlineDeleteOutline className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
