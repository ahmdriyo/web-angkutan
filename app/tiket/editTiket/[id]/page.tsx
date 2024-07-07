'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/angkutan.jpg";
interface Rute {
  tujuan: string;
  jamBerangkat: string;
}
const EditTiket = ({ params }) => {
  const router = useRouter();
  const [dataTiket, setDataTiket] = useState({
    namaPenumpang: "",
    tujuan: "",
    jamBerangkat: "",
    nomorKursi: "",
    hargaTiket: "",
  });
  useEffect(() => {
    if (params.id) {
      const fetchdataTiket = async () => {
        const docRef = doc(firestore, "dataTiket", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataTiket(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchdataTiket();
    }
  }, [params.id]);
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
    
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataTiket", params.id);
      await updateDoc(docRef, dataTiket);
      alert("Data berhasil diperbarui");
      router.push("/tiket");
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataTiket", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/tiket");
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
            onClick={() => router.push("/tiket")}
          >
            <FaArrowLeftLong />
            <h1 className=" font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Tiket</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Penumpang
              </label>
              <select
                value={dataTiket.namaPenumpang}
                onChange={(e) =>
                  setDataTiket({ ...dataTiket, namaPenumpang: e.target.value })
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
                value={dataTiket.tujuan}
                onChange={(e) =>
                  setDataTiket({ ...dataTiket, tujuan: e.target.value })
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
                value={dataTiket.jamBerangkat}
                onChange={(e) =>
                  setDataTiket({ ...dataTiket, jamBerangkat: e.target.value })
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
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nomor Kursi
              </label>
              <input
                value={dataTiket.nomorKursi}
                onChange={(e) =>
                  setDataTiket({ ...dataTiket, nomorKursi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga Tiket
              </label>
              <input
                value={dataTiket.hargaTiket}
                onChange={(e) =>
                  setDataTiket({ ...dataTiket, hargaTiket: e.target.value })
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

export default EditTiket;
