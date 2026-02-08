import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweetAlert = ({ type, message, keys }) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const alertInstance = MySwal.fire({
      position: 'top-end',
      icon: type,
      title:
        message ||
        (type === 'error'
          ? 'Terjadi Kesalahan Silahkan hub IT.'
          : 'Anda Telah Melakukan Perubahan'),
      showConfirmButton: false,
      timer: 2000,
    });
  }, [type, message, keys]);

  return null;
};
export default SweetAlert;
