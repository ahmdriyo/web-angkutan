"use client";
import React, { useEffect, useState } from "react";
import rute from "../asset/rute.jpg";
import { redirect, useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useSession } from "next-auth/react";
import Loading from "../../components/Loading";

interface Route {
  id: string; 
  namaPenumpang: string,
  alamat: string,
  kontak: string,
}

const Penumpang = () => {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession({
    required: false,
  });
  const handelAdd = () => {
    router.push("/penumpang/addPenumpang");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = collection(firestore, "dataPenumpang");
        const querySnapshot = await getDocs(dataRef);
        const routesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Route[];
        setRoutes(routesData);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.namaPenumpang.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (id: string) => {
    router.push(`/penumpang/editPenumpang/${id}`);
  };

  return (
    <div
  className="h-[100vh] w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${rute.src})` }}
>
  <div className="flex items-center justify-center h-full px-4 md:px-0">
    <div className="max-w-4xl w-full mx-auto">
      <div className="bg-[#9ed585ba] m-2 bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 font-bold text-center md:text-left">Daftar Penumpang</h2>
        <div className="flex flex-col md:flex-row mb-4">
          <input
            type="text"
            placeholder="Pencarian"
            className="flex-1 border p-2 rounded-t-md md:rounded-l-md md:rounded-tr-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-b-md md:rounded-r-md md:rounded-bl-none mt-2 md:mt-0">
            Cari
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Nama Penumpang</th>
                <th className="border p-2">Alamat</th>
                <th className="border p-2">Kontak</th>
                {session?.user?.email === 'admin@gmail.com' && (
                  <th className="border p-2">Aksi</th>
                )}
              </tr>
            </thead>
            {isLoading ? (
              <tbody className="text-center">
                <tr>
                  <td colSpan={session?.user?.email === 'admin@gmail.com' ? 7 : 6}>
                    <Loading />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {filteredRoutes.map((route, index) => (
                  <tr key={route.id}>
                    <td className="border text-center">{index + 1}</td>
                    <td className="border p-2 text-center">{route.namaPenumpang}</td>
                    <td className="border p-2 text-center">{route.alamat}</td>
                    <td className="border p-2 text-center">
                      {route.kontak}
                    </td>
                    {session?.user?.email === 'admin@gmail.com' && (
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handleEdit(route.id)}
                          type="submit"
                          className="bg-amber-600 text-white px-3 m-1 py-2 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {session?.user?.email === 'admin@gmail.com' && (
          <button
            onClick={handelAdd}
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 w-full md:w-auto"
          >
            Tambah
          </button>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Penumpang;
