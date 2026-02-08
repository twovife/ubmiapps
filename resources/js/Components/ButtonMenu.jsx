import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";

const ButtonMenu = ({ title, active, url }) => {
    return (
        <div className="relative">
            <Link
                as="a"
                href={url}
                className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium transition duration-300 ease-in-out border border-transparent rounded-md focus:outline-hidden ${
                    active
                        ? // ? `bg-gray-100 text-gray-900  hover:text-gray-900 hover:bg-gray-100`
                          // : `text-gray-600 bg-white  hover:text-gray-900 hover:bg-gray-100`
                          `hover:bg-red-200 bg-red-600 text-white`
                        : `hover:bg-gray-100 bg-white text-slate-900`
                }`}
            >
                {title}
            </Link>
        </div>
    );
};

export default ButtonMenu;
