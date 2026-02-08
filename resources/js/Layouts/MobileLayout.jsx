import Loading from '@/Components/Loading';
import SweetAlert from '@/Components/SweetAlert';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { Button } from '@/shadcn/ui/button';
import { HandCoinsIcon, Handshake, Menu, UserRound } from 'lucide-react';
import SidebarMobile from '@/Components/shadcn/SidebarMobile';

const MobileLayout = ({ header, children, loading = false }) => {
  const { auth } = usePage().props;
  const { errors, flash } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="relative z-10 antialiased">
      {Object.keys(errors).length > 0 && (
        <SweetAlert type="error" message={errors[0]} keys={flash} />
      )}
      {flash.message && (
        <SweetAlert type="success" message={flash.message} keys={flash} />
      )}

      <Loading show={loading} />
      <div className="relative mx-auto">
        <div className="sticky top-0 z-50 flex items-center h-10 gap-4 bg-transparent">
          <nav className="flex flex-row items-center justify-between w-full h-full gap-5 px-2 text-sm lg:px-4 font-mediumlg:gap-6 backdrop-blur-sm">
            <div className="flex items-center justify-start">
              <Button variant="icon" onClick={toggleSidebar}>
                <Menu className="w-4 h-4" />
              </Button>
              <p className="hidden font-semibold lg:block">UBMI APPS</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="xs"
                  className="flex items-center justify-center gap-3 text-xs"
                >
                  {auth.user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {auth.user.employee.nama_karyawan}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={route('profile.edit')}>Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
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
            <SidebarMobile setIsOpen={setIsOpen} isOpen={isOpen} />
          </nav>
        </div>
        <div className="px-2 lg:px-4">{children}</div>
      </div>
    </div>
  );
};

export default MobileLayout;
