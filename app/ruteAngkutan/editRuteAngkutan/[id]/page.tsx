"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/rute.jpg";

const EditRute = ({ params }) => {
  const router = useRouter();
  const [dataRute, setDataRute] = useState({
    berangkat: "",
    waktuBerangkat: "",
    waktuTiba: "",
    namaStasiunDestinasi: "",
    namaKereta: "",
  });

  const [keretaList, setKeretaList] = useState<string[]>([]);
  const [stasiunList, setStasiunList] = useState<string[]>([]);

  useEffect(() => {
    const fetchKeretaData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataKereta"));
      const keretaData = querySnapshot.docs.map(doc => doc.data().namaKereta as string);
      setKeretaList(keretaData);
    };

    const fetchStasiunData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataStasiun"));
      const stasiunData = querySnapshot.docs.map(doc => doc.data().namaStasiun as string);
      setStasiunList(stasiunData);
    };

    fetchKeretaData();
    fetchStasiunData();
  }, []);

  useEffect(() => {
    if (params.id) {
      const fetchdataRute = async () => {
        const docRef = doc(firestore, "dataRute", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataRute(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchdataRute();
    }
  }, [params.id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataRute", params.id);
      await updateDoc(docRef, dataRute);
      alert("Data berhasil diperbarui");
      router.push("/ruteAngkutan");
    }
  };
  
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataRute", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/ruteAngkutan");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div
      className=" h-[100vh] w-screen-10 bg-cover bg-center "
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#9ed585ba] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[400px] mt-12 m-2">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/ruteAngkutan")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Rute</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kereta
              </label>
              <select
                value={dataRute.namaKereta}
                onChange={(e) =>
                  setDataRute({ ...dataRute, namaKereta: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Kereta</option>
                {keretaList.map((kereta, index) => (
                  <option key={index} value={kereta}>{kereta}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Berangkat Dari Stasiun
              </label>
              <select
                value={dataRute.berangkat}
                onChange={(e) =>
                  setDataRute({ ...dataRute, berangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {stasiunList.map((stasiun, index) => (
                  <option key={index} value={stasiun}>{stasiun}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Waktu Berangkat
              </label>
              <input
                value={dataRute.waktuBerangkat}
                onChange={(e) =>
                  setDataRute({ ...dataRute, waktuBerangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Waktu tiba
              </label>
              <input
                value={dataRute.waktuTiba}
                onChange={(e) =>
                  setDataRute({ ...dataRute, waktuTiba: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Stasiun Destinasi
              </label>
              <select
                value={dataRute.namaStasiunDestinasi}
                onChange={(e) =>
                  setDataRute({ ...dataRute, namaStasiunDestinasi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {stasiunList.map((stasiun, index) => (
                  <option key={index} value={stasiun}>{stasiun}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              className="text-white ml-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
