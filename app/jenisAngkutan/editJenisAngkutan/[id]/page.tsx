'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/kereta.jpg";

const EditAngkutan = ({ params }) => {
  const router = useRouter();
  const [dataAngkutan, setDataAngkutan] = useState({
    namaAngkutan: "",
    jenisAngkutan: "",
  });

  useEffect(() => {
    if (params.id) {
      const fetchDataAngkutan = async () => {
        const docRef = doc(firestore, "dataAngkutan", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataAngkutan(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchDataAngkutan();
    }
  }, [params.id]);


  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataAngkutan", params.id);
      await updateDoc(docRef, dataAngkutan);
      alert("Data berhasil diperbarui");
      router.push("/jenisAngkutan");
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataAngkutan", params.id);
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
      className="  h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filterbackdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/jenisAngkutan")}
          >
            <FaArrowLeftLong />
            <h1 className=" font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Angkutan</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Angkutan
              </label>
              <input
                value={dataAngkutan.namaAngkutan}
                onChange={(e) =>
                  setDataAngkutan({ ...dataAngkutan, namaAngkutan: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Angkutan</label>
              <select
                value={dataAngkutan.jenisAngkutan}
                onChange={(e) =>
                  setDataAngkutan({ ...dataAngkutan, jenisAngkutan: e.target.value })
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

export default EditAngkutan;
