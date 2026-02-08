import { usePage } from "@inertiajs/react";
import { useMemo } from "react";
function useFrontEndPermission() {
  const { auth } = usePage().props;
  const { permissions } = auth;
  const permissionStatus = useMemo(() => {
    const isUnit = permissions.includes("unit");
    const isMantri = permissions.includes("area");
    const isPusat = permissions.includes("pusat");
    const isCreator = permissions.includes("can create");
    const isCanShowKelompok = permissions.includes("can show kelompok");
    return {
      isUnit,
      isMantri,
      isPusat,
      isCreator,
      isCanShowKelompok
    };
  }, [permissions]);
  return permissionStatus;
}
export {
  useFrontEndPermission as u
};
