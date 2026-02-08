import Authenticated from '@/Layouts/AuthenticatedLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion';

import React, { useEffect, useState } from 'react';

const MonitoringStaff = ({ datas, ...props }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(datas);
  }, [datas]);

  return (
    <Authenticated>
      <div>List Input</div>
      <div className="w-full overflow-auto h-[80vh]">
        <Accordion type="single" collapsible>
          {data &&
            data.map((item, key) => (
              <AccordionItem value={item.branch} key={key}>
                <AccordionTrigger>{item.branch}</AccordionTrigger>
                <AccordionContent className="px-6">
                  {item.days &&
                    item.days.map((warehouse, _key) => (
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value={item.branch + warehouse.day}
                          key={_key}
                        >
                          <AccordionTrigger className="text-blue-500">
                            {warehouse.day}
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Kelompok</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {warehouse.data &&
                                  warehouse.data.map((hayshack, __key) => (
                                    <>
                                      <TableRow>
                                        <TableCell>
                                          {hayshack.kelompok}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          {/* table lagi */}
                                          <Table>
                                            <TableHeader>
                                              <TableRow>
                                                <TableHead>Bulan</TableHead>
                                                <TableHead>Count</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {hayshack.data &&
                                                hayshack.data.map(
                                                  (nidle, key) => (
                                                    <>
                                                      <TableRow>
                                                        <TableCell>
                                                          {nidle.month}
                                                        </TableCell>
                                                        <TableCell>
                                                          {nidle.count}
                                                        </TableCell>
                                                      </TableRow>
                                                    </>
                                                  )
                                                )}
                                            </TableBody>
                                          </Table>
                                        </TableCell>

                                        {/* end table lagi */}
                                      </TableRow>
                                    </>
                                  ))}
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </Authenticated>
  );
};

export default MonitoringStaff;
