import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

const RemoveLoan = ({ triggeredId, onClosed }) => {
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

    destroy(route('pinjaman.destroy_loan', triggeredId), {
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
            <Button
              variant="destructiveoutline2"
              type="button"
              onClick={confirmUserDeletion}
            >
              Hapus
            </Button>
          </div>
          <div
            className={`inline transition-all duration-300
            ${confirmingUserDeletion ? '-translate-y-full' : 'translate-y-0'}`}
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
    </div>
  );
};

export default RemoveLoan;
