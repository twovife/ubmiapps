import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import BargeStatus from '@/Components/shadcn/BargeStatus';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import { Input } from '@/shadcn/ui/input';
import { useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState, useRef } from 'react';
import CurrencyInput from 'react-currency-input-field';

const Action = ({ show = false, onClosed, triggeredData, type }) => {
  const { data, setData, post, reset, errors, processing } = useForm({
    id: '',
    kelompok: '',
    date: '',
    kasbon: '',
    transport: '',
    type: '1',
    tunai: '',
  });
  const [loading, setLoading] = useState(false);
  const focusInputAngka = useRef(null);

  useEffect(() => {
    if (focusInputAngka.current) {
      focusInputAngka.current.focus();
    }
  }, [focusInputAngka.current]);

  useEffect(() => {
    if (triggeredData) {
      setData({
        id: triggeredData.id,
        kelompok: triggeredData.kelompok,
        date: triggeredData.tanggal,
        kasbon: triggeredData.kasbon,
        transport: triggeredData.transport,
        type: type,
        tunai: triggeredData.tunai,
      });
    }
  }, [triggeredData]);

  const onInputChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  const onHandleKasbonChange = (value) => {
    const newKasbon = value;
    setData((prevData) => ({
      ...prevData,
      kasbon: newKasbon,
      tunai: calculateTunai(newKasbon, prevData.transport),
    }));
  };

  const onHandleTransportChange = (value) => {
    const newTransport = value;
    setData((prevData) => ({
      ...prevData,
      transport: newTransport,
      tunai: calculateTunai(prevData.kasbon, newTransport),
    }));
  };

  const calculateTunai = (kasbon, transport) => {
    // Nilai tunai = triggeredData.tunai - kasbon - transport
    const x =
      triggeredData.tunai - triggeredData.kasbon + triggeredData.transport;



    return parseFloat(x) + parseFloat(kasbon) - parseFloat(transport);
  };

  const closedModal = () => {
    onClosed();
    reset();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    post(route('kasir.rekap.rekap_post'), {
      onSuccess: () => {
        reset();
        onClosed();
      },
    });
  };

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : closedModal())}>
      <Loading show={loading || processing} />
      <DialogContent className="w-[90vw] h-[90vh] lg:h-auto lg:max-w-xl overflow-auto scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin">
        {/* {erorAxios && <div>terjadi kesalahan saat memuat data</div>} */}
        {loading ? (
          <div>Data Sedang Dimuat</div>
        ) : (
          <DialogHeader>
            <DialogTitle>
              {type == 1 ? 'Input Kasbon & Transport' : 'Cek Tunai Mantri'}
            </DialogTitle>

            <DialogDescription>
              <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    readOnly
                    name="date"
                    type="date"
                    required
                    onChange={onInputChange}
                    value={data.date}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="kasbon">Kasbon</Label>

                  <CurrencyInput
                    className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    name="kasbon"
                    allowDecimals={false}
                    ref={focusInputAngka}
                    prefix="Rp. "
                    min={1}
                    required
                    onValueChange={onHandleKasbonChange}
                    value={data.kasbon}
                    placeholder={'Inputkan angka tanpa sparator'}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="transport">Transport</Label>
                  <CurrencyInput
                    className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    name="transport"
                    allowDecimals={false}
                    prefix="Rp. "
                    min={1}
                    required
                    onValueChange={onHandleTransportChange}
                    value={data.transport}
                    placeholder={'Inputkan angka tanpa sparator'}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="tunai">Tunai</Label>
                  <CurrencyInput
                    className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    name="tunai"
                    allowDecimals={false}
                    readOnly
                    prefix="Rp. "
                    min={1}
                    value={data.tunai}
                    placeholder={'Inputkan angka tanpa sparator'}
                  />
                </div>
                {triggeredData?.status_approve_kepala && (
                  <BadgeStatus className="mb-3" value="acc">
                    Kepala Sudah Aprov
                  </BadgeStatus>
                )}
                {triggeredData?.status_approve_kepala && type == 2 && (
                  <>
                    <div className="flex items-center justify-start flex-1 gap-3 mb-1 whitespace-nowrap">
                      <Checkbox
                        placeholder="Select Permission"
                        id="daily_kepala_approval"
                        required
                      />
                      <InputLabel htmlFor="daily_kepala_approval">
                        Konfirmasi Jika Sudah Benar Semua
                      </InputLabel>
                    </div>
                    <div className="mb-3 text-right">
                      <Button type="submit">Submit</Button>
                    </div>
                  </>
                )}
                {type == 1 && (
                  <div className="mb-3 text-right">
                    <Button type="submit">Submit</Button>
                  </div>
                )}
              </form>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Action;
