import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import axios from 'axios';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@/shadcn/ui/button';
import Loading from '@/Components/Loading';
import ButtonAngsuran from './ButtonAngsuran';

const SyncAngsuran = ({ show = show, onClosed, triggeredId }) => {
  const [syncData, setSyncData] = useState(null);

  const [saldoBefores, setSaldoBefores] = useState(0);
  const { data, setData, post, processing, errors, reset } = useForm({
    saldobefore: 0,
    month: '',
    id: '',
    instalment: [],
  });

  const modalIsClosed = () => {
    onClosed();
    reset();
    setSyncData(null);
    setIndexButton(null);
  };
  const month = usePage().props.server_filter?.month;

  const day = usePage().props.server_filter.hari;

  useEffect(() => {
    if (show && triggeredId) {
      axios
        .post(route('pinjaman.get_synch_angsuran', triggeredId), {
          month,
          day,
        })
        .then((res) => {
          setSyncData(res.data?.data);
          setData((prevData) => ({
            ...prevData,
            saldobefore: res.data?.data?.saldoSebelumnya,
            id: res.data?.data?.id,
            month: res.data?.data?.month,
            instalment: res.data?.data?.angsuran,
          }));
        });
    }
  }, [show, triggeredId]);

  const handleInputChange = (value, name, index = null) => {
    if (index !== null) {
      const updatedInstalments = [...data.instalment];
      updatedInstalments[index] = {
        ...updatedInstalments[index],
        nominal: value,
      };
      setData('instalment', updatedInstalments);
    } else {
      // Kalau input biasa (saldobefore & id)
      setData(name, value);
    }
  };

  useEffect(() => {
    if (syncData?.instalments) {
      const saldo = data?.saldobefore;

      const sumInstalment = data?.instalment?.reduce(
        (acc, item) => acc + (parseFloat(item.nominal) || 0),
        0
      );

      setSaldoBefores(saldo - sumInstalment);
    }
  }, [syncData, data]);

  const [nominalPembayaran, setNominalPembayaran] = useState([
    10000, 30000, 50000, 52000, 60000, 65000, 100000, 104000, 130000, 195000,
    260000, 390000,
  ]);

  const [indexButton, setIndexButton] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    post(route('pinjaman.synch_angsuran', triggeredId), {
      preserveScroll: true,
      onSuccess: () => {
        modalIsClosed();
      },
    });
  };

  const handleButtonAngsuran = (value, index) => {
    const updatedInstalments = [...data.instalment];
    updatedInstalments[index] = {
      ...updatedInstalments[index],
      nominal: value,
    };
    setData('instalment', updatedInstalments);
  };

  const handleButtonAngsuranOnScroll = (e, index) => {
    const value = data.instalment[index]?.nominal ?? 0;
    const updatedInstalments = [...data.instalment];
    updatedInstalments[index] = {
      ...updatedInstalments[index],
      nominal: parseFloat(value) + (e.deltaY < 0 ? -1000 : 1000),
    };
    setData('instalment', updatedInstalments);
  };

  const scrollthis = (e) => {
    const saldb = parseFloat(data.saldobefore) ?? 0;

    setData('saldobefore', saldb + (e.deltaY < 0 ? -1000 : 1000));
  };

  return (
    <Dialog open={show} onOpenChange={(open) => (open ? '' : modalIsClosed())}>
      <Loading show={processing} />
      <DialogContent
        className={`p-1 lg:p-6 lg:min-w-[50vw] min-w-[80vw] max-w-[90vw] w-auto`}
      >
        <DialogHeader>
          <DialogTitle>Angsuran</DialogTitle>
        </DialogHeader>
        <div className="h-[80vh] overflow-auto">
          {syncData ? (
            <div className="lg:grid-cols-2 grid w-full gap-3">
              <form onSubmit={submitForm}>
                <p>Perbaiki Angsuran</p>
                <div className="mb-1">
                  ANGSURAN PER{' '}
                  <span className="text-green-500 font-semibold">
                    {dayjs(syncData?.month).format('MMMM YYYY')}
                  </span>
                </div>
                <div className="mb-3">
                  <InputLabel
                    value={`Saldo  ${dayjs(syncData?.month).format(
                      'MMMM YYYY'
                    )}`}
                  />
                  <CurrencyInput
                    className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    name="saldobefore"
                    defaultValue={0}
                    allowDecimals={false}
                    prefix="Rp. "
                    min={1}
                    required
                    onWheel={scrollthis}
                    onValueChange={(value, name) =>
                      handleInputChange(value, name)
                    }
                    value={data.saldobefore}
                    placeholder={'Inputkan angka tanpa sparator'}
                  />
                </div>
                {data?.instalment &&
                  data?.instalment.map((item, index) => (
                    <div
                      key={index}
                      className={`mb-1 relative ${
                        indexButton == index && 'bg-green-50'
                      }`}
                    >
                      <InputLabel
                        value={`Angsuran ${dayjs(item?.transaction_date).format(
                          'DD-MM-YYYY'
                        )}`}
                      />
                      <CurrencyInput
                        className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-xs h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                        name="request_nominal"
                        defaultValue={0}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={1}
                        required
                        onWheel={(e) => handleButtonAngsuranOnScroll(e, index)}
                        onFocus={(e) => setIndexButton(index)}
                        onValueChange={(value, name) =>
                          handleInputChange(value, name, index)
                        }
                        value={data.instalment[index]?.nominal}
                        placeholder={'Inputkan angka tanpa sparator'}
                      />
                      {indexButton == index && (
                        <ButtonAngsuran
                          nominalPembayaran={nominalPembayaran}
                          pelunasan={saldoBefores}
                          onClickButton={handleButtonAngsuran}
                          index={index}
                        />
                      )}
                    </div>
                  ))}
                <div>
                  <Button variant="green" type="submit">
                    Submit
                  </Button>
                </div>
                <div className="text-green-500 font-semibold text-lg">
                  {saldoBefores.toLocaleString()}
                </div>
              </form>
              <div>
                <p>Detail Angsuran</p>
                <div className="mb-1">
                  {syncData && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Nominal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {syncData &&
                          syncData?.instalments.map((item, key) => (
                            <TableRow key={key}>
                              <TableCell>
                                {dayjs(item?.transaction_date).format(
                                  'DD/MM/YYYY'
                                )}
                              </TableCell>
                              <TableCell>
                                {item.nominal?.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>MENUNGGU DATA</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SyncAngsuran;
