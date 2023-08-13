import React from 'react';

import { Grid, VCol } from '@/aero';

const Link = ({ text, href }: { text: string; href: string }) => (
  <p className="text-mutedforeground">
    <a className="hover:underline" href={href}>
      {text}
    </a>
  </p>
);

export const Footer: React.FC = () => (
  <footer className="bg-muted mt-4 md:mt-12 px-12 py-8">
    <Grid
      container
      size={12}
      className="w-full max-w-5xl mx-auto mb-12 md:mb-16"
      rowGap="lg"
    >
      <Grid item columns={12} sm={6} md={4}>
        <VCol variant="sm">
          <h4 className="text-mutedforeground font-semibold text-lg mb-2">
            Links
          </h4>
          <Link text="Github @mikededo" href="https://github.com/mikededo" />
          <Link
            text="Github repository"
            href="https://github.com/mikededo/squared-ci"
          />
        </VCol>
      </Grid>
      <Grid item columns={12} sm={6} md={4}>
        <VCol variant="sm">
          <h4 className="text-mutedforeground font-semibold text-lg mb-2">
            Special thanks
          </h4>
          <Link text="Vercel" href="https://vercel.com" />
          <Link text="TailwindCSS" href="https://tailwindcss.com" />
          <Link text="Shadcn" href="https://github.com/shadcn" />
        </VCol>
      </Grid>
    </Grid>
    <p className="text-mutedforeground text-center w-full">
      Miquel de Domingo @mikededo {new Date().getFullYear()}
    </p>
  </footer>
);
