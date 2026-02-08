import Hamburger from 'hamburger-react';
import React, { useState } from 'react';
import ResponsiveNavLink from './ResponsiveNavLink';
import Dropdown from './Dropdown';
import { CircleUser, Menu, Package2, UserRound } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { Button } from '@/shadcn/ui/button';
import { PersonIcon } from '@radix-ui/react-icons';

const Navbar = ({ toggleSidebar, isOpen, auth, header }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  return (
    <header className="sticky top-0 z-50 flex items-center h-16 gap-4 px-4 bg-white border-b md:px-6">
      <nav className="flex flex-row items-center w-full gap-5 text-sm font-medium lg:gap-6">
        <div className="flex items-center justify-start">
          <Hamburger
            distance={'md'}
            toggled={isOpen}
            toggle={toggleSidebar}
            size={16}
            rounded
            color="#020617"
          />
          <p className="hidden font-semibold lg:block">UBMI APPS</p>
        </div>
        <div className="flex flex-1 w-full gap-6 underline">
          <Link
            href={route('mobile_apps.index')}
            className="transition-colors text-muted-foreground hover:text-foreground"
          >
            Mantri Apps
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center justify-center gap-3 text-sm">
              {auth.user.username}
              <UserRound className="w-4 h-4 animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {auth.user.employee.nama_karyawan}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link className="w-full" href={route('profile.edit')}>
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className="w-full text-left"
                href={route('logout')}
                method="post"
                as="button"
                replace="true"
              >
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      {/* <nav className="sticky top-0 z-50 w-full p-2 px-4 text-white bg-red-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Hamburger
                            toggled={isOpen}
                            toggle={toggleSidebar}
                            size={16}
                            rounded
                            color="#020617"
                        />
                        <p className="font-semibold">UBMI APPS</p>
                    </div>
                    <p className="font-semibold leading-tight text-white text">
                        {header}
                    </p>

                    <div className="flex items-center sm:ml-6">
                        <div className="relative ml-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center text-sm font-medium leading-4 text-white transition duration-150 ease-in-out bg-red-700 border border-transparent rounded-md hover:text-gray-50 focus:outline-hidden"
                                        >
                                            {auth.user.username}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav> */}
    </header>
  );
};

export default Navbar;
