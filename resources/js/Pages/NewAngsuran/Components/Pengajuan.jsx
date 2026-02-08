import Loading from '@/Components/Loading';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion';
import React, { useState } from 'react';
import WhiteOff from './WhiteOff';
import PengajuanLama from './PengajuanLama';

const Pengajuan = ({ triggeredId, triggeredPinjaman, instalment }) => {
  const [activePanel, setActivePanel] = useState(null);
  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const pelunasan = instalment.sort((a, b) => a.saldo - b.saldo)[0]?.saldo ?? 0;

  return (
    <Card className="relative w-full mb-3">
      <Loading show={false} />
      <CardHeader>
        <CardTitle>Action</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex gap-3 mb-3">
          <Button
            variant={activePanel == 'item-1' ? 'green' : 'outline'}
            onClick={() => togglePanel('item-1')}
            disabled={true}
          >
            Pengajuan
          </Button>

          <Button
            variant={activePanel == 'item-2' ? 'green' : 'outline'}
            onClick={() => togglePanel('item-2')}
          >
            Pemutihan
          </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          value={activePanel}
          onValueChange={setActivePanel}
        >
          <AccordionItem borderless={true} value="item-1">
            <AccordionContent>
              {activePanel == 'item-1' && (
                <PengajuanLama
                  isActive={activePanel == 'item-1'}
                  triggeredId={triggeredId}
                  triggeredPinjaman={triggeredPinjaman}
                />
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem borderless={true} value="item-2">
            <AccordionContent>
              {activePanel == 'item-2' && (
                <WhiteOff
                  triggeredId={triggeredId}
                  nominalWhiteOff={pelunasan ?? 0}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Pengajuan;
