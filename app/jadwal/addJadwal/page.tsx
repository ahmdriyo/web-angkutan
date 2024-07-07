"use client";
import kereta from "../../asset/jadwal.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
interface Rute {
  asal: string;
  tujuan: string;
  jarak: string;
}
const AddJadwal = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_jadwal: "",
    namaAngkutan: "",
    asal: "",
    tujuan: "",
    jarak: "",
    jamBerangkat: "",
    jamTiba: "",
  });
  const [angkutanList, setAngkutanList] = useState<string[]>([]);
  const [ruteList, setRuteList] = useState<Rute[]>([]);
  useEffect(() => {
    const fetchAngkutanData = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "dataAngkutan")
      );
      const angkutanData = querySnapshot.docs.map(
        (doc) => doc.data().namaAngkutan as string
      );
      setAngkutanList(angkutanData);
    };
    const fetchRuteData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataRute"));
      const ruteData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          asal: data.asal as string,
          tujuan: data.tujuan as string,
          jarak: data.jarak as string
        };
      });
      setRuteList(ruteData);
    };
    fetchAngkutanData();
    fetchRuteData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addData.id_jadwal.trim() !== "" &&
      addData.namaAngkutan.trim() !== "" &&
      addData.asal.trim() !== "" &&
      addData.tujuan.trim() !== "" &&
      addData.jarak.trim() !== "" &&
      addData.jamBerangkat.trim() !== "" &&
      addData.jamTiba.trim() !== ""
    ) {
      try {
        const q = query(
          collection(firestore, "dataJadwal"),
          where("id_jadwal", "==", addData.id_jadwal)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("ID Jadwal sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataJadwal");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/jadwal");
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
            onClick={() => router.push("/jadwal")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-1">Input Jadwal</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID Jadwal
              </label>
              <input
                value={addData.id_jadwal}
                onChange={(e) =>
                  setAddData({ ...addData, id_jadwal: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Angkutan
              </label>
              <select
                value={addData.namaAngkutan}
                onChange={(e) =>
                  setAddData({ ...addData, namaAngkutan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Angkutan</option>
                {angkutanList.map((angkutan, index) => (
                  <option key={index} value={angkutan}>
                    {angkutan}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Asal
              </label>
              <select
                value={addData.asal}
                onChange={(e) =>
                  setAddData({ ...addData, asal: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Asal</option>
                {ruteList.map((rute, index) => (
                  <option key={index} value={rute.asal}>
                    {rute.asal}
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
                {ruteList.map((rute, index) => (
                  <option key={index} value={rute.tujuan}>
                    {rute.tujuan}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Jarak
              </label>
              <select
                value={addData.jarak}
                onChange={(e) =>
                  setAddData({ ...addData, jarak: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Jarak</option>
                {ruteList.map((rute, index) => (
                  <option key={index} value={rute.jarak}>
                    {rute.jarak}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Jam Berangkat
              </label>
              <input
                value={addData.jamBerangkat}
                onChange={(e) =>
                  setAddData({ ...addData, jamBerangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jam Tiba
              </label>
              <input
                value={addData.jamTiba}
                onChange={(e) =>
                  setAddData({ ...addData, jamTiba: e.target.value })
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

export default AddJadwal;
