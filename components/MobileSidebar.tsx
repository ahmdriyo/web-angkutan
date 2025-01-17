'use client'
import React from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import profile from "../app/asset/image.png"

export default function MobileSidebar({ setter }) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <Icon />
            </button>
            <Link href="/" className="mx-auto">
                <p>Logo</p>
            </Link>
            <Link
                className="text-3xl flex text-white"
                href="/loginAdmin"
            >
                <Image
                src={profile}
                alt=""
                className="w-[40px] h-[40px] rounded-[20px]"
                />
            </Link>
        </nav>
    )
}