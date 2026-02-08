import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      {children}
    </div>
  );
}
