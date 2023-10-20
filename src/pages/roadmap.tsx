import React from 'react';

import { Grid } from '@/aero';
import { Content, Nav } from '@/roadmap/components';

const Roadmap: React.FC = () => (
  <>
    <Nav />
    <main className="container pt-2 md:pt-4">
      <Grid container>
        <Grid item columns={4} lg={3} className="hidden md:block">
          <aside className="h-screen w-full flex flex-col gap-4 pr-4">
            <p className="font-bold text-lg min-h-[40px] flex items-end">
              Table of contents
            </p>
            <ul>
              <li>Roadmap</li>
              <li>
                <ul className="pl-3">
                  <li className="line-clamp-1">Features in the pipeline</li>
                </ul>
              </li>
              <li>
                <ul className="pl-3">
                  <li className="line-clamp-1">Feature&apos;s state of art</li>
                  <li>
                    <ul className="pl-3">
                      <li className="line-clamp-1">Visual editor</li>
                      <li className="line-clamp-1">Action templates</li>
                      <li className="line-clamp-1">YAML translator</li>
                      <li className="line-clamp-1">Sharing workflows</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </Grid>
        <Grid item sm={12} md={8} lg={9}>
          <Content />
        </Grid>
      </Grid>
    </main>
  </>
);

export default Roadmap;
