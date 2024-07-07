'use client';
import kereta from "../../asset/kereta.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

const AddAngkutan = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_angkutan: "",
    namaAngkutan: "",
    jenisAngkutan: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( addData.id_angkutan.trim() !== "" && addData.namaAngkutan.trim() !== "" && addData.jenisAngkutan.trim() !== "" ) {
      try {
        const q = query(collection(firestore, "dataAngkutan"), where("id_angkutan", "==", addData.id_angkutan));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          alert("ID Angkutan sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataAngkutan");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/jenisAngkutan");
        }
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Angkutan.");
    }
  };

  return (
    <div
      className="h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/jenisAngkutan')}>
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5">Input Angkutan</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Angkutan</label>
              <input
                value={addData.id_angkutan}
                onChange={(e) =>
                  setAddData({ ...addData, id_angkutan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Angkutan</label>
              <select
                value={addData.jenisAngkutan}
                onChange={(e) =>
                  setAddData({ ...addData, jenisAngkutan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Jenis Angkutan</option>
                <option value="darat">Darat</option>
                <option value="udara">Udara</option>
                <option value="laut">Laut</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Angkutan</label>
              <input
                value={addData.namaAngkutan}
                onChange={(e) =>
                  setAddData({ ...addData, namaAngkutan: e.target.value })
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAngkutan;
