"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SlHome } from "react-icons/sl";
import { FaRoute, FaBusAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { TbBus } from "react-icons/tb";
import { IoIosMan } from "react-icons/io";
import { IoLogIn, IoTicket } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { IoLogOut } from "react-icons/io5";
import profile from "../app/asset/image.png"
import Image from "next/image";
export default function Sidebar({ show, setter }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: false,
  });
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";
  type MenuItemProps = {
    icon: React.ReactNode;
    name: string;
    route: string;
    onClick?: () => void; // onClick bersifat opsional
  };
  const MenuItem: React.FC<MenuItemProps>  = ({ icon, name, route,onClick }) => {
    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10  text-[#686f6d] hover:text-white `}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div onClick={onClick}>{name}</div>
      </Link>
    );
  };
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex justify-center items-center">
          <Link href="/" className="flex justify-center flex-col items-center">
            <Image
            src={profile}
            alt=""
            className="w-[150px] h-[150px] rounded-[100px]"
            />
            <h2 className="text-white mt-5">Muhammad Yusuf Karimi</h2>
          </Link>
        </div>
        <div className="flex flex-col">
          <MenuItem name="Home" route="/" icon={<SlHome />} />
          <MenuItem name="Rute Angkutan" route="/ruteAngkutan" icon={<FaRoute />}/>
          <MenuItem name="Jenis Angkutan" route="/jenisAngkutan" icon={<FaBusAlt />} />
          <MenuItem name="Jadwal" route="/jadwal" icon={<TbBus />} />
          <MenuItem name="Penumpang" route="/penumpang" icon={<IoIosMan />} />
          <MenuItem name="Tiket" route="/tiket" icon={<IoTicket />} />
          {session ? (
            <MenuItem onClick={() => signOut()} name="Logout" route="/" icon={<IoLogOut />} />
          ) : (
            <MenuItem name="Login" route="/loginAdmin" icon={<IoLogIn />} />
          )}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
