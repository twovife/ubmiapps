import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button } from '@/shadcn/ui/button';
import { Dialog } from '@headlessui/react';
import Loading from '@/Components/Loading';

export default function DeleteLoan({ id, onClosed }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm();

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const cancelUserDeletion = () => {
    setTimeout(() => {
      setConfirmingUserDeletion(false);
    }, 200);
  };

  const buttonArea = useRef(null);

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('pinjaman.destroy_loan', id), {
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <div ref={buttonArea} onMouseLeave={cancelUserDeletion}>
      <Loading show={processing} />
      <form onSubmit={deleteUser}>
        <div className="flex flex-col overflow-hidden h-9">
          <div
            className={`inline transition-all duration-300
              ${confirmingUserDeletion ? 'translate-y-full' : 'translate-y-0'}
              `}
          >
            <Button type="button" onClick={confirmUserDeletion}>
              Hapus
            </Button>
          </div>
          <div
            className={`inline transition-all duration-300
              ${
                confirmingUserDeletion ? '-translate-y-full' : 'translate-y-0'
              }`}
          >
            <Button
              type="submit"
              variant="destructive"
              onClick={confirmUserDeletion}
            >
              Yakin?
            </Button>
          </div>
        </div>
      </form>

      {/* <Modal show={confirmingUserDeletion} onClose={closeModal}>
          <h2 className="text-lg font-medium text-gray-900">
            Apakah Anda Yakin ? Menghapus Transaksi Tersebut
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Menghapus Transaksi Dapat Mengubah Status Transaksi, Perolehan
            Storting, dan Neraca Kas
          </p>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />

            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="block w-3/4 mt-1"
              isFocused
              placeholder="Password"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="flex justify-end mt-6">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ml-3" disabled={processing}>
              Hapus Transaksi
            </DangerButton>
          </div>

      </Modal> */}
    </div>
  );
}
