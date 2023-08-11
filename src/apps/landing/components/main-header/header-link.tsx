import Link from 'next/link';
import React from 'react';

import { Button, Grid, Meta, VCol } from '@/aero';
import { BorderedBox } from '@/landing/components';

export const HeaderLink: React.FC = () => (
  <Grid item container columns={12} size={12}>
    <BorderedBox bottom columns={1} md={2} right />
    <BorderedBox bottom columns={10} md={8}>
      <VCol className="py-4 px-2" align="center" variant="lg">
        <Meta className="text-center">
          Free to use, no subscription nor registration required!
        </Meta>
        <Link href="/editor">
          <Button>Start using it!</Button>
        </Link>
      </VCol>
    </BorderedBox>
    <BorderedBox bottom columns={1} md={2} left />
  </Grid>
);
