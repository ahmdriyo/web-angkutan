"use client";
import React, { useEffect, useState } from "react";
import kereta from "../asset/angkutan.jpg";
import { redirect, useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useSession } from "next-auth/react";
import Loading from "../../components/Loading";

interface Route {
  id: string;
  id_tiket: string;
  namaPenumpang: string;
  tujuan: string;
  jamBerangkat: string;
  nomorKursi: string;
  hargaTiket: string;
}
const Tiket = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession({
    required: false,
  });
  const handelAdd = () => {
    router.push("/tiket/addTiket");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = collection(firestore, "dataTiket");
        const querySnapshot = await getDocs(dataRef);
        const routesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Route[];
        setRoutes(routesData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/tiket/editTiket/${id}`);
  };

  const filteredRoutes = routes.filter((route) =>
    route.namaPenumpang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className=" h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full px-4 md:px-0">
        <div className="max-w-4xl w-full mx-auto mt-10">
          <div className="bg-[#9ed585ba] m-2 bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4 font-bold">Daftar Tiket</h2>
            <div className="flex flex-col md:flex-row mb-4">
              <input
                type="text"
                placeholder="Pencarian"
                className="flex-1 border p-1 rounded-t-md md:rounded-l-md md:rounded-tr-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-red-500 hover:bg-red-600  text-white p-2 rounded-r-md">
                Cari
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border p-2">No.</th>
                    <th className="border p-2">ID Tiket</th>
                    <th className="border p-2">Nama Penumpang</th>
                    <th className="border p-2">Tujuan</th>
                    <th className="border p-2">Jam Berangkat</th>
                    <th className="border p-2">Nomor Kursi</th>
                    <th className="border p-2">Harga Tiket</th>
                    {session?.user?.email === "admin@gmail.com" && (
                      <th className="border p-2">Aksi</th>
                    )}
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody className="justify-center items-center">
                    <tr>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {filteredRoutes.map((route, index) => (
                      <tr key={route.id}>
                        <td className="border p-2 text-center">{index + 1}</td>
                        <td className="border p-2 text-center">
                          {route.id_tiket}
                        </td>
                        <td className="border p-2 text-center">
                          {route.namaPenumpang}
                        </td>
                        <td className="border p-2 text-center">{route.tujuan}</td>
                        <td className="border p-2 text-center">
                          {route.jamBerangkat}
                        </td>
                        <td className="border p-2 text-center">
                          {route.nomorKursi}
                        </td>
                        <td className="border p-2 text-center">
                          Rp.{route.hargaTiket}
                        </td>
                        {session?.user?.email === "admin@gmail.com" && (
                          <td className="border p-2">
                            <button
                              onClick={() => handleEdit(route.id)}
                              type="button"
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

            {session?.user?.email === "admin@gmail.com" && (
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

export default Tiket;
