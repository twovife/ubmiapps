import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shadcn/ui/sheet';
import { Button } from '@/shadcn/ui/button';
import {
  HandCoinsIcon,
  Handshake,
  Home,
  Layers,
  UserRound,
  UserRoundPlus,
  UserRoundPlusIcon,
  UserX,
  Wrench,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SidebarMobile = ({ isOpen, setIsOpen }) => {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? '' : setIsOpen(false))}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu Aplikasi</SheetTitle>
          <SheetDescription>
            <fieldset className="grid gap-6 p-4 border rounded-lg">
              <legend className="px-1 -ml-1 text-sm font-medium">Mantri</legend>
              <div className="flex flex-wrap items-center justify-around gap-6">
                <div className="text-center">
                  <Button size="icon2xl" variant="outline" asChild>
                    <Link href={route('mobile_apps.index')}>
                      <Home className="h-7 w-7" />
                    </Link>
                  </Button>
                  <div>Home</div>
                </div>

                <div className="text-center">
                  <Button size="icon2xl" variant="outline" asChild>
                    <Link href={route('mobile_apps.create')}>
                      <MagnifyingGlassIcon className="h-7 w-7" />
                    </Link>
                  </Button>
                  <div>Pengajuan</div>
                </div>

                <div className="text-center">
                  <Button size="icon2xl" variant="outline" asChild>
                    <Link href={route('mobile_apps.transaksi')}>
                      <Layers className="h-7 w-7" />
                    </Link>
                    {/* MANTRI DROP PAGE */}
                  </Button>
                  <div>Drop</div>
                </div>

                <div className="text-center">
                  <Button size="icon2xl" variant="outline" asChild>
                    <Link href={route('mobile_apps.angsuran')}>
                      <HandCoinsIcon className="h-7 w-7" />
                    </Link>
                  </Button>
                  <div>Angsuran</div>
                </div>
                <div className="text-center">
                  <Button size="icon2xl" variant="outline" asChild>
                    <Link href={route('mobile_apps.macet')}>
                      <UserX className="h-7 w-7" />
                    </Link>
                  </Button>
                  <div>Macet</div>
                </div>
              </div>
            </fieldset>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
