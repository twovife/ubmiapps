import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import SweetAlert from '@/Components/SweetAlert';
import Loading from '@/Components/Loading';

export default function Authenticated({ header, children, loading = false }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // const [showingNavigationDropdown, setShowingNavigationDropdown] =
  //     useState(false);
  const { errors, flash, auth } = usePage().props;

  return (
    <div className="relative">
      {Object.keys(errors).length > 0 && (
        <SweetAlert type="error" message={errors[0]} keys={flash} />
      )}
      {flash.message && (
        <SweetAlert type="success" message={flash.message} keys={flash} />
      )}
      <Loading show={loading} />
      <Navbar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        auth={auth}
        header={header}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`px-4 py-6 transition-all ease-in-out  duration-300 h-auto bg-white min-h-[calc(100vh-4rem)]  ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <main>{children}</main>
      </div>
    </div>
  );
}
