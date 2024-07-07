'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/jadwal.jpg";
interface Rute {
  asal: string;
  tujuan: string;
  jarak: string;
}
const EditJadwal = ({ params }) => {
  const router = useRouter();
  const [dataJadwal, setDataJadwal] = useState({
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
    if (params.id) {
      const fetchDataJadwal = async () => {
        const docRef = doc(firestore, "dataJadwal", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataJadwal(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchDataJadwal();
    }
  }, [params.id]);
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
    fetchRuteData();
    fetchAngkutanData()
  })
    
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataJadwal", params.id);
      await updateDoc(docRef, dataJadwal);
      alert("Data berhasil diperbarui");
      router.push("/jenisAngkutan");
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataJadwal", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/jenisAngkutan");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div
      className=" h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/jadwal")}
          >
            <FaArrowLeftLong />
            <h1 className=" font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Jadwal</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Angkutan
              </label>
              <select
                value={dataJadwal.namaAngkutan}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, namaAngkutan: e.target.value })
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
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Asal
              </label>
              <select
                value={dataJadwal.asal}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, asal: e.target.value })
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
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tujuan
              </label>
              <select
                value={dataJadwal.tujuan}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, tujuan: e.target.value })
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
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jarak
              </label>
              <select
                value={dataJadwal.jarak}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, jarak: e.target.value })
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
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jam Tiba
              </label>
              <input
                value={dataJadwal.jamBerangkat}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, jamBerangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jam Berangkat
              </label>
              <input
                value={dataJadwal.jamTiba}
                onChange={(e) =>
                  setDataJadwal({ ...dataJadwal, jamTiba: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="text-white ml-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJadwal;
