"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/rute.jpg";

const EditRute = ({ params }) => {
  const router = useRouter();
  const [dataPenumpang, setDataPenumpang] = useState({
    namaPenumpang: "",
    alamat: "",
    kontak: "",
  });


  useEffect(() => {
    if (params.id) {
      const fetchdataPenumpang = async () => {
        const docRef = doc(firestore, "dataPenumpang", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataPenumpang(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchdataPenumpang();
    }
  }, [params.id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataPenumpang", params.id);
      await updateDoc(docRef, dataPenumpang);
      alert("Data berhasil diperbarui");
      router.push("/penumpang");
    }
  };
  
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataPenumpang", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/penumpang");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div
      className="h-[100vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/penumpang")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Penumpang</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Penumpang
              </label>
              <input
                value={dataPenumpang.namaPenumpang}
                onChange={(e) =>
                  setDataPenumpang({ ...dataPenumpang, namaPenumpang: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Alamat
              </label>
              <input
                value={dataPenumpang.alamat}
                onChange={(e) =>
                  setDataPenumpang({ ...dataPenumpang, alamat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kontak
              </label>
              <input
                value={dataPenumpang.kontak}
                onChange={(e) =>
                  setDataPenumpang({ ...dataPenumpang, kontak: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              className="text-white ml-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRute;
