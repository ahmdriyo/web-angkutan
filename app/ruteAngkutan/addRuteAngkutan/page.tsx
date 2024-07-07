"use client";
import rute from "../../asset/rute.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { useState, useEffect } from "react";

// type Stasiun = {
//   id_stasiun: string;
//   namaStasiun: string;
//   nomerPlatform: string;
// };
// type Kereta = {
//   id_kereta: string,
//   namaAngkutan: string,
//   kelas: string,
//   destinasi: string,
// }

const AddRute = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_rute: "",
    namaAngkutan: "",
    asal: "",
    tujuan: "",
    jarak: "",
  });

  const [keretaList, setKeretaList] = useState<string[]>([]);
  const [stasiunList, setStasiunList] = useState<string[]>([]);

  useEffect(() => {
    const fetchKeretaData = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "dataAngkutan")
      );
      const keretaData = querySnapshot.docs.map(
        (doc) => doc.data().namaAngkutan as string
      );
      setKeretaList(keretaData);
    };

    // const fetchStasiunData = async () => {
    //   const querySnapshot = await getDocs(collection(firestore, "dataStasiun"));
    //   const stasiunData = querySnapshot.docs.map(doc => doc.data().namaStasiun as string);
    //   setStasiunList(stasiunData);
    // };

    fetchKeretaData();
    // fetchStasiunData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addData.id_rute.trim() !== "" &&
      addData.namaAngkutan.trim() !== "" &&
      addData.asal.trim() !== "" &&
      addData.tujuan.trim() !== "" &&
      addData.jarak.trim() !== ""
    ) {
      try {
        const q = query(
          collection(firestore, "dataRute"),
          where("id_rute", "==", addData.id_rute)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          alert("ID Rute sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataRute");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/ruteAngkutan");
        }
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Rute.");
    }
  };

  return (
    <div
      className=" h-[100vh] w-screen-10 bg-cover bg-center "
      style={{ backgroundImage: `url(${rute.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => router.push("/ruteAngkutan")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5">Input Rute Angkutan</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID Rute
              </label>
              <input
                value={addData.id_rute}
                onChange={(e) =>
                  setAddData({ ...addData, id_rute: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                {keretaList.map((kereta, index) => (
                  <option key={index} value={kereta}>
                    {kereta}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Asal
              </label>
              <input
                value={addData.asal}
                onChange={(e) =>
                  setAddData({ ...addData, asal: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tujuan
              </label>
              <input
                value={addData.tujuan}
                onChange={(e) =>
                  setAddData({ ...addData, tujuan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jarak
              </label>
              <input
                value={addData.jarak}
                onChange={(e) =>
                  setAddData({ ...addData, jarak: e.target.value })
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

export default AddRute;
