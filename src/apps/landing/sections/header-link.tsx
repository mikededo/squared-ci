import Link from 'next/link';
import React from 'react';

import { Button, Meta, VCol } from '@/aero';

export const HeaderLink: React.FC = () => (
  <div className="grid md:grid-cols-6">
    <div className="hidden md:block border-b border-dashed border-gray-300" />
    <VCol
      className="py-4 md:border-x border-b border-dashed border-gray-300 col-span-4"
      align="center"
      variant="lg"
    >
      <Meta className="text-center text-slate-600">
        Free to use, no subscription nor registration required!
      </Meta>
      <Button>
        <Link href="/editor">Start using it!</Link>
      </Button>
    </VCol>
    <div className="hidden md:block border-b border-dashed border-gray-300" />
  </div>
);
