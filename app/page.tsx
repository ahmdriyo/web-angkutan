"use client";
import React from "react";
import keretahome from "./asset/kereta-home.jpg";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession({
    required: false,
  });
  const user = session?.user as {
    nama?: string;
    email?: string;
    alamat?: string;
    noTelpon?: string;
    peran?: string;
  };
  return (
    <div
      className=" h-[100vh] w-screen-10 bg-cover bg-center mt-[8vh] xl:mt-0 md:mt-0"
      style={{ backgroundImage: `url(${keretahome.src})` }}
    >
      <div className="flex items-center justify-center xl:w-[65%] p-10">
        <div className="text-start text-white">
          <p className="xl:text-4xl font-bold mb-4 text-2xl">
            Selamat datang di Website Trayek Angkutan Umum
          </p>
          <p className="xl:text-xl font-semibold xl:w-[80%] text-white text-sm pb-2 border-b-4 border-yellow-500">
            Jelajahi berbagai Jadwal Angkutan, Rute Angkutan, opsi Tiket, dan
            jenis angkutan yang tersedia dengan mudah dan cepat.
          </p>
          <p className="xl:text-lg text-sm text-white">
            Temukan perjalanan terbaik Anda dan nikmati kemudahan tanpa batas!
          </p>
          <p className="xl:text-lg text-sm text-white">
            Muhammad Yusuf Karimi | 2210010339
          </p>
          <p className="text-yellow-300 font-medium">Login Admin :</p>
          <p className="text-sm font-light text-[#ffffff]">
            Email : admin@gmail.com
          </p>
          <p className="text-sm font-light text-[#ffffff]">
            Password : admin123
          </p>
        </div>
      </div>
    </div>
  );
}
Home.requireAuth = true;
