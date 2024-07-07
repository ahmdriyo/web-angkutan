"use client";
import kereta from "../../asset/angkutan.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
interface Rute {
  tujuan: string;
  jamBerangkat: string;
}
const AddTiket = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_tiket: "",
    namaPenumpang: "",
    tujuan: "",
    jamBerangkat: "",
    nomorKursi: "",
    hargaTiket: "",
  });

  const [penumpangList, setPenumpangList] = useState<string[]>([]);
  const [jadwalList, setJadwalList] = useState<Rute[]>([]);
  useEffect(() => {
    const fetchPenumpangData = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "dataPenumpang")
      );
      const penumpangData = querySnapshot.docs.map(
        (doc) => doc.data().namaPenumpang as string
      );
      setPenumpangList(penumpangData);
    };
    const fetchJadwalData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataJadwal"));
      const jadwalData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          tujuan: data.tujuan as string,
          jamBerangkat: data.jamBerangkat as string
        };
      });
      setJadwalList(jadwalData);
    };
    fetchPenumpangData();
    fetchJadwalData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addData.id_tiket.trim() !== "" &&
      addData.namaPenumpang.trim() !== "" &&
      addData.tujuan.trim() !== "" &&
      addData.jamBerangkat.trim() !== "" &&
      addData.nomorKursi.trim() !== "" &&
      addData.hargaTiket.trim() !== ""
    ) {
      try {
        const q = query(
          collection(firestore, "dataTiket"),
          where("id_tiket", "==", addData.id_tiket)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("ID Jadwal sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataTiket");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/tiket");
        }
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Jadwal.");
    }
  };

  return (
    <div
      className="h-[100vh] w-full bg-cover bg-center "
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => router.push("/tiket")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-1">Input Tiket</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID Tiket
              </label>
              <input
                value={addData.id_tiket}
                onChange={(e) =>
                  setAddData({ ...addData, id_tiket: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Nama Penumpang
              </label>
              <select
                value={addData.namaPenumpang}
                onChange={(e) =>
                  setAddData({ ...addData, namaPenumpang: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Angkutan</option>
                {penumpangList.map((angkutan, index) => (
                  <option key={index} value={angkutan}>
                    {angkutan}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Tujuan
              </label>
              <select
                value={addData.tujuan}
                onChange={(e) =>
                  setAddData({ ...addData, tujuan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Tujuan</option>
                {jadwalList.map((rute, index) => (
                  <option key={index} value={rute.tujuan}>
                    {rute.tujuan}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Jam Berangkat
              </label>
              <select
                value={addData.jamBerangkat}
                onChange={(e) =>
                  setAddData({ ...addData, jamBerangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Jarak</option>
                {jadwalList.map((rute, index) => (
                  <option key={index} value={rute.jamBerangkat}>
                    {rute.jamBerangkat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Nomor Kursi
              </label>
              <input
                value={addData.nomorKursi}
                onChange={(e) =>
                  setAddData({ ...addData, nomorKursi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga Tiket
              </label>
              <input
                value={addData.hargaTiket}
                onChange={(e) =>
                  setAddData({ ...addData, hargaTiket: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTiket;
