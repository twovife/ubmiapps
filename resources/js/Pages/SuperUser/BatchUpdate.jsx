import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import useServerFilter from '@/Hooks/useServerFilter';
import { NumericFormat } from 'react-number-format';
import OldCustomer from './Components/OldCustomer';
import NewCustomer from './Components/NewCustomer';

const BatchUpdate = ({ max_date, min_date, ...props }) => {
  const { emps, status_angsuran } = useServerFilter(
    null,
    null,
    null,
    props.mantri
  );

  const [loading, setLoading] = useState(false);
  const [erorAxios, setErorAxios] = useState();
  const [nikData, setNikData] = useState();
  const [customerData, setCustomerData] = useState();
  const [nik, setNik] = useState();

  const onSubmitFindNik = (e) => {
    const nik = document.getElementById('nik').value;
    setLoading(true);
    setErorAxios();
    setNikData();
    setNik();
    axios({
      method: 'post',
      url: route('transaction.getnik'),
      data: {
        nik: nik,
      },
    })
      .then(function ({ data }) {
        setNikData(data.data);
        setCustomerData(data.reqistered_customer);
        setNik(nik);
        setLoading(false);
      })
      .catch(function ({ response }) {
        setErorAxios(response.data.message);
        setNikData();
        setNik();
        setLoading(false);
      });
  };
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header="Buku Transaksi"
      loading={loading}
    >
      <Head title="Batch Upload" />
      <div className="relative">
        <div className="flex p-4">
          <div className="flex-2">
            <div className="mb-3">
              <InputLabel htmlFor="nik" value="Input Nik Customer" />
              <div className="flex items-center justify-start gap-3 mt-1">
                <TextInput
                  id="nik"
                  type="text"
                  name="nik"
                  required
                  className="block"
                  autoComplete="nik"
                />
                <PrimaryButton
                  title={'Cek'}
                  as="button"
                  type="button"
                  onClick={onSubmitFindNik}
                />
              </div>
              <InputError message={erorAxios} className="mt-2" />
            </div>
            {nik ? (
              customerData ? (
                <OldCustomer
                  status={status_angsuran}
                  setLoading={setLoading}
                  max_date={max_date}
                  min_date={min_date}
                  emps={emps}
                  nik={nik}
                  url={route('batchupdate.batch_post')}
                  customer_id={customerData?.id}
                />
              ) : (
                <NewCustomer
                  status={status_angsuran}
                  setLoading={setLoading}
                  max_date={max_date}
                  min_date={min_date}
                  emps={emps}
                  nik={nik}
                  url={route('batchupdate.batch_post')}
                />
              )
            ) : (
              ''
            )}
            <div className="mb-3"></div>
          </div>
          <div className="flex-3">
            <div className="mb-3">
              <div className="text-lg font-semibold">
                History Pinjaman Customer
              </div>
              <div className="p-4 mb-3 overflow-hidden rounded shadow-sm">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="sticky top-0 text-xs text-gray-900 uppercase bg-gray-200 whitespace-nowrap">
                    <tr>
                      <th className="px-3 py-2">No</th>
                      <th className="px-3 py-2">Tanggal Drop</th>
                      <th className="px-3 py-2">Unit</th>
                      <th className="px-3 py-2">Kelompok</th>
                      <th className="px-3 py-2">Mantri</th>
                      <th className="px-3 py-2">Nama Customer</th>
                      <th className="px-3 py-2">Drop</th>
                      <th className="px-3 py-2">Lunas</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nikData ? (
                      nikData.map((element, key) => {
                        return (
                          <tr key={key}>
                            <td className="px-3 py-2">{key + 1}</td>
                            <td className="px-3 py-2">
                              {dayjs(element.tanggal_drop).format('DD-MM-YYYY')}
                            </td>
                            <td className="px-3 py-2">{element.unit}</td>
                            <td className="px-3 py-2">{element.kelompok}</td>
                            <td className="px-3 py-2">{element.mantri_name}</td>
                            <td className="px-3 py-2">
                              {element.customer_name}
                            </td>
                            <td className="px-3 py-2">
                              <NumericFormat
                                value={element.drop}
                                displayType={'text'}
                                thousandSeparator={','}
                                prefix={'Rp. '}
                              />
                            </td>
                            <td className="px-3 py-2">{element.lunas}</td>
                            <td className="px-3 py-2">
                              {element.status == 'normal' ||
                              element.status == 'cm' ? (
                                <Link
                                  as="a"
                                  href={route(
                                    'pinjaman.normal.show',
                                    element.id
                                  )}
                                  className="px-5 py-1 font-semibold text-white uppercase bg-green-400 rounded-lg"
                                >
                                  {element.status}
                                </Link>
                              ) : element.status == 'mb' ? (
                                <Link
                                  as="a"
                                  href={route(
                                    'pinjaman.normal.show',
                                    element.id
                                  )}
                                  className="px-5 py-1 font-semibold text-white uppercase bg-yellow-400 rounded-lg"
                                >
                                  {element.status}
                                </Link>
                              ) : (
                                <Link
                                  as="a"
                                  href={route(
                                    'pinjaman.normal.show',
                                    element.id
                                  )}
                                  className="px-5 py-1 font-semibold text-white uppercase bg-red-400 rounded-lg"
                                >
                                  {element.status}
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={3}>Data tidak ditemukan</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default BatchUpdate;
