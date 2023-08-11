import React from 'react';

import { Grid, VCol } from '@/aero';

const Link = ({ text, href }: { text: string; href: string }) => (
  <p className="text-primary-foreground">
    <a className="hover:underline" href={href}>
      {text}
    </a>
  </p>
);

export const Footer: React.FC = () => (
  <footer className="bg-primary mt-4 md:mt-12 px-12 py-8">
    <Grid container size={12} className="w-full mb-12 md:mb-16">
      <Grid item columns={1} />
      <Grid item columns={5} md={4}>
        <VCol variant="sm">
          <h4 className="text-primary-foreground font-semibold text-lg mb-2">
            Links
          </h4>
          <Link text="Github @mikededo" href="https://github.com/mikededo" />
          <Link
            text="Github repository"
            href="https://github.com/mikededo/squared-ci"
          />
        </VCol>
      </Grid>
      <Grid item columns={5} md={4}>
        <VCol variant="sm">
          <h4 className="text-primary-foreground font-semibold text-lg mb-2">
            Special thanks
          </h4>
          <Link text="Vercel" href="https://vercel.com" />
          <Link text="TailwindCSS" href="https://tailwindcss.com" />
          <Link text="Shadcn" href="https://github.com/shadcn" />
        </VCol>
      </Grid>
    </Grid>
    <p className="text-primary-foreground text-center w-full">
      Miquel de Domingo @mikededo {new Date().getFullYear()}
    </p>
  </footer>
);
